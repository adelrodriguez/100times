import { type UserId, users } from "./core"
import { constructId, createTable, integer, text, timestamps, unique } from "./helpers"

export const assets = createTable("assets", {
  ...constructId("AssetId", "ast"),
  ...timestamps,

  userId: text()
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .$type<UserId>(),

  service: text({ enum: ["uploadthing"] }).notNull(),
  bucket: text({ enum: ["uploadthing"] }).notNull(),
  externalId: text(),

  name: text(),
  mimeType: text().notNull(),
  filename: text().notNull(),
  size: integer().notNull(),
  url: text().notNull(),
})
export type Asset = typeof assets.$inferSelect
export type NewAsset = typeof assets.$inferInsert
export type AssetId = Asset["id"]
export type AssetService = Asset["service"]
export type AssetBucket = Asset["bucket"]

export const tasks = createTable("tasks", {
  ...constructId("TaskId", "tsk"),
  ...timestamps,

  title: text().notNull(),
  icon: text().notNull().default("🎯"),
  description: text(),

  type: text({ enum: ["individual", "group"] })
    .notNull()
    .default("individual"),

  completedAt: integer({ mode: "timestamp_ms" }),
  archivedAt: integer({ mode: "timestamp_ms" }),

  ownerId: text()
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .$type<UserId>(),
})
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export type TaskId = Task["id"]

export const checkIns = createTable(
  "check_ins",
  {
    ...constructId("CheckInId", "chk"),
    ...timestamps,

    taskId: text()
      .notNull()
      .references(() => tasks.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .$type<TaskId>(),
    userId: text()
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .$type<UserId>(),

    notes: text(),
    assetId: text()
      .references(() => assets.id, {
        onDelete: "set null",
        onUpdate: "cascade",
      })
      .$type<AssetId>(),

    sequence: integer().notNull().default(1),
  },
  table => [unique().on(table.userId, table.taskId, table.sequence)],
)
export type CheckIn = typeof checkIns.$inferSelect
export type NewCheckIn = typeof checkIns.$inferInsert
export type CheckInId = CheckIn["id"]

export const userTasks = createTable(
  "user_tasks",
  {
    userId: text()
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .$type<UserId>(),

    taskId: text()
      .notNull()
      .references(() => tasks.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .$type<TaskId>(),
  },
  table => [unique().on(table.userId, table.taskId)],
)
