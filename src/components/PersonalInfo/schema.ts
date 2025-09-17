import { z } from "zod"

export const personalFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .nonempty("First name is required"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .nonempty("Last name is required"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone must be in format (123) 456-7890")
    .nonempty("Phone number is required"),
})

export type PersonalFormType = z.infer<typeof personalFormSchema>
