import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

export type FormSchemaType = z.infer<typeof formSchema>
