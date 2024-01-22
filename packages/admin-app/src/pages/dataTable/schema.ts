import { z } from "zod"


// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  header: z.string(),
  accessorKey: z.string(),
  sort: z.boolean().optional(),
  size: z.number().optional(),
})

export type Task = z.infer<typeof taskSchema>