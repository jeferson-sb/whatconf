import { z } from 'zod'

type CreateFormState = {
  title: string
  description: string
  link: string
  location: string
  startDate: string
  endDate: string
  category: string
  virtual: boolean
}

const creationValidationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z
    .string()
    .max(300, { message: 'Maximum of 300 characters' })
    .optional(),
  link: z
    .string({ required_error: 'Link is required' })
    .url({ message: 'Invalid URL' }),
  location: z.string().min(1, { message: 'Location is required' }),
  virtual: z.boolean().default(false),
  category: z.string(),
  startDate: z.string().min(1, { message: 'Please provide a start date' }),
  endDate: z.string().min(1, { message: 'Please provide an end date' }),
})

export { type CreateFormState, creationValidationSchema }
