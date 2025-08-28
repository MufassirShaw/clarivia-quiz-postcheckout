import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./basicInfo.module.css"
import { ILead } from "@/type/lead"
import { useState } from "react"

const today = new Date()

const formDate = (date: string) => {
  if (!date) {
    return ""
  }
  const [day, month, year] = date.split("/")
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
}

// Birthday formatting function
const formatBirthday = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "")

  // Limit to 8 digits (DDMMYYYY)
  const limitedDigits = digits.slice(0, 8)

  // Format based on length
  if (limitedDigits.length <= 2) {
    return limitedDigits
  } else if (limitedDigits.length <= 4) {
    return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2)}`
  } else {
    return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(
      2,
      4
    )}/${limitedDigits.slice(4)}`
  }
}

// Birthday validation logic
const birthdaySchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
  .refine((value) => {
    const [day, month, year] = value.split("/").map((num) => parseInt(num))
    const birthDate = new Date(`${month}/${day}/${year}`)

    return !isNaN(birthDate.getTime()) // valid date
  }, "Please enter a valid date")
  .refine((value) => {
    const [day, month, year] = value.split("/").map((num) => parseInt(num))
    const birthDate = new Date(year, month - 1, day)
    return birthDate <= today
  }, "Birth date cannot be in the future")
  .refine((value) => {
    const [day, month, year] = value.split("/").map((num) => parseInt(num))
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
const schema = z.object({
  birthday: birthdaySchema,
  email: z.email("Enter a valid email address"),
})

type FormData = z.infer<typeof schema>

export const BasicInfo = ({
  onAnswer,
}: {
  onAnswer: (info: Partial<ILead>) => Promise<void>
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange", // validates as user types
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const birthdayValue = watch("birthday")

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthday(e.target.value)
    setValue("birthday", formatted, { shouldValidate: true, shouldTouch: true })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    const [d, m, year] = data.birthday.split("/").map((num) => parseInt(num))

    const month = String(m).padStart(2, "0")
    const day = String(d).padStart(2, "0")

    await onAnswer({
      email: data.email,
      birthday: `${month}/${day}/${year}`, //MM/DD/YYYY dosable format
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formFields}>
      {/* Birthday Field */}
      <div className={styles.formField}>
        <label htmlFor="birthday" className={styles.fieldLabel}>
          Birth Date
        </label>
        <input
          {...register("birthday")}
          onChange={handleBirthdayChange}
          value={birthdayValue || ""}
          className={`${styles.input} ${
            !!errors.birthday?.message && styles.invalidInput
          } ${
            !errors.birthday?.message &&
            touchedFields.birthday &&
            styles.validInput
          }`}
          placeholder="DD/MM/YYYY"
          id="birthday"
        />
        {errors.birthday && (
          <p className={styles.errorMessage}>{errors.birthday.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.fieldLabel}>
          Email
        </label>
        <input
          {...register("email")}
          className={`${styles.input} ${
            !!errors.email?.message && styles.invalidInput
          } ${
            !errors.email?.message && touchedFields.email && styles.validInput
          }`}
          placeholder="name@example.com"
          id="email"
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>

      <div className="button-container">
        <button
          className="primary-button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </div>
    </form>
  )
}
