import { z } from "zod"

export const roomCreateSchema = z.object({
  name: z.string().min(1).max(20),
  isPrivate: z.boolean().default(false)
})

export const roomJoinSchema = z.object({
  name: z.string().min(1).max(20),
  code: z.string().length(6).optional()
})

export const moveInputSchema = z.object({
  dx: z.number().min(-1).max(1),
  dy: z.number().min(-1).max(1),
  sprint: z.boolean(),
  crouch: z.boolean(),
  sequence: z.number(),
  timestamp: z.number()
})
