import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { literals } from "convex-helpers/validators"

export default defineSchema({
  ...authTables,
  tasks: defineTable({
    title: v.string(),
    icon: v.string(),
    description: v.optional(v.string()),
    type: literals("individual", "group"),
    completed: v.number(),
    completedAt: v.optional(v.number()),
    lastProgressAt: v.optional(v.number()),
    archivedAt: v.optional(v.number()),
    ownerId: v.id("users"),
  })
    .index("by_archived", ["archivedAt"])
    .index("by_completed", ["completedAt"])
    .index("by_owner", ["ownerId"]),

  checkIns: defineTable({
    taskId: v.id("tasks"),
    userId: v.id("users"),
    notes: v.optional(v.string()),
    asset: v.optional(v.id("_storage")),
    sequence: v.number(), // Default: 1
  })
    .index("by_task", ["taskId"])
    .index("by_user", ["userId"])
    .index("by_user_task", ["userId", "taskId"])
    .index("by_user_task_sequence", ["userId", "taskId", "sequence"])
    .index("by_asset", ["asset"]),

  userTasks: defineTable({
    userId: v.id("users"),
    taskId: v.id("tasks"),
  })
    .index("by_user", ["userId"])
    .index("by_task", ["taskId"])
    .index("by_user_task", ["userId", "taskId"]),
})
