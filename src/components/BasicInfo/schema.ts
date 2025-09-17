import { z } from "zod"
const today = new Date()

// Birthday validation logic
const birthdaySchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in MM/DD/YYYY format")
  .refine((value) => {
    const birthDate = new Date(value)
    return !isNaN(birthDate.getTime())
  }, "Please enter a valid date")
  .refine((value) => {
    const [month, day, year] = value.split("/").map((num) => parseInt(num))
    const birthDate = new Date(year, month - 1, day)
    return birthDate <= today
  }, "Birth date cannot be in the future")
  .refine((value) => {
    const [month, day, year] = value.split("/").map((num) => parseInt(num))
    const age =
      today.getFullYear() -
      year -
      (today < new Date(today.getFullYear(), month - 1, day) ? 1 : 0)
    return age >= 18
  }, "You must be at least 18 years old")
  .refine((value) => {
    const year = parseInt(value.split("/")[2])
    return today.getFullYear() - year <= 120
  }, "Please enter a valid birth year")

// Validation schema
export const basicInfoSchema = z.object({
  birthday: birthdaySchema,
  email: z.email("Enter a valid email address"),
})

export type BasicInfoFormType = z.infer<typeof basicInfoSchema>
