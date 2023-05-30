import {z} from 'zod'

export const RecipeSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  prepTime: z.number().positive(),
})
