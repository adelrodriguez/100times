import { relations } from "drizzle-orm"
import { accounts, sessions, users } from "./core"
import { assets, checkIns, tasks, userTasks } from "./main"

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions, { relationName: "user" }),
  impersonationSessions: many(sessions, {
    relationName: "impersonator",
  }),
  ownedTasks: many(tasks),
  tasks: many(userTasks),
  checkIns: many(checkIns),
}))

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
    relationName: "user",
  }),

  impersonatedBy: one(users, {
    fields: [sessions.impersonatedBy],
    references: [users.id],
    relationName: "impersonator",
  }),
}))

export const taskRelations = relations(tasks, ({ one, many }) => ({
  owner: one(users, {
    fields: [tasks.ownerId],
    references: [users.id],
  }),
  checkIns: many(checkIns),
  userTasks: many(userTasks),
}))

export const checkInRelations = relations(checkIns, ({ one }) => ({
  task: one(tasks, {
    fields: [checkIns.taskId],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [checkIns.userId],
    references: [users.id],
  }),
  asset: one(assets, {
    fields: [checkIns.assetId],
    references: [assets.id],
  }),
}))

export const assetRelations = relations(assets, ({ one }) => ({
  checkIns: one(checkIns),
}))

export const userTaskRelations = relations(userTasks, ({ one }) => ({
  user: one(users, {
    fields: [userTasks.userId],
    references: [users.id],
  }),
  task: one(tasks, {
    fields: [userTasks.taskId],
    references: [tasks.id],
  }),
}))
