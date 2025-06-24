import * as z from "zod/v4"

// Create custom zod types here and import them to other packages under the `z` namespace.
export function env() {
  return z.enum(["development", "production", "test"])
}

export function brand<T extends string>(brand: T) {
  return z.string().brand(brand)
}

export * from "zod/v4"
