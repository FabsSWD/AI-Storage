import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must use YYYY-MM-DD format.' })
})
