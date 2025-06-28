import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  ...authTables,
  tasks: defineTable({
    title: v.string(),
    icon: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("individual"), v.literal("group")),
    completedAt: v.optional(v.number()),
    archivedAt: v.optional(v.number()),
    ownerId: v.id("users"),
  })
    .index("by_owner", ["ownerId"])
    .index("by_type", ["type"])
    .index("by_completed", ["completedAt"])
    .index("by_archived", ["archivedAt"]),

  checkIns: defineTable({
    taskId: v.id("tasks"), // References tasks.id
    userId: v.string(), // References users.id
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
    userId: v.string(), // References users.id
    taskId: v.string(), // References tasks.id
  })
    .index("by_user", ["userId"])
    .index("by_task", ["taskId"])
    .index("by_user_task", ["userId", "taskId"]),
})
