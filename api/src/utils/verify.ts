import z from 'zod'

export const passwordSchema = z.string().min(5).max(64)
export const idSchema = z.string().uuid()
export const dateSchema = z.string().refine((date) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = date.match(regex)

  if (match === null) {
    return false
  }

  const [, day, month, year] = match.map(Number)
  const parsedDate = new Date(year, month - 1, day)

  return (
    parsedDate.getDate() === day &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getFullYear() === year
  )
})

export const verifyPassword = (password: string) => passwordSchema.safeParse(password)
export const verifyId = (id: string) => idSchema.safeParse(id)
export const verifyDate = (date: string) => dateSchema.safeParse(date)

export const createUserSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  type: z.number(),
  group: z.string().optional(),
  image: z.string().optional(),
  children: z.array(z.string()).optional()
})

export const verifyCreateUser = (user: any) => createUserSchema.safeParse(user)
