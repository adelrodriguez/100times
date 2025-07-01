import { getAuthUserId } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"
import {
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions"
import { typedV } from "convex-helpers/validators"
import { mutation, query } from "./_generated/server"
import schema from "./schema"

export const vv = typedV(schema)

export const protectedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new ConvexError("Unauthorized")
    }

    return { userId }
  })
)

export const protectedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new ConvexError("Unauthorized")
    }

    return { userId }
  })
)
