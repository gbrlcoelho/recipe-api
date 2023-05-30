import z from 'zod'

export const UserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(255)
    .refine((password) => {
      const hasLowercase = /[a-z]/.test(password)
      const hasUppercase = /[A-Z]/.test(password)
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)
      return hasLowercase && hasUppercase && hasSpecialChar
    }, 'Password must have at least one lowercase letter, one uppercase letter, and one special character.'),
})
