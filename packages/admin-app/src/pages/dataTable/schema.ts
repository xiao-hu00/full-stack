import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  invoice: z.string(),
  paymentStatus: z.string(),
  totalAmount: z.string(),
  paymentMethod: z.string(),
})

export type Task = z.infer<typeof taskSchema>