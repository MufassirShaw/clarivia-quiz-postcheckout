import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./personalInfo.module.css"
import { ILead } from "@/type/lead"
import { useState, useRef, useEffect } from "react"

// Validation schema
const schema = z.object({
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

type FormData = z.infer<typeof schema>

const ErrorMessage = ({ message }: { message?: string }) => (
  <p
    className={`${styles.errorMessage} ${
      !!message && styles.errorMessageShown
    }`}
  >
    {message}
  </p>
)

// Phone number formatting function
const formatPhoneNumber = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "")

  // Limit to 10 digits
  const limitedDigits = digits.slice(0, 10)

  // Format based on length
  if (limitedDigits.length <= 3) {
    return limitedDigits.length > 0 ? `(${limitedDigits}` : ""
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`
  } else {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
      3,
      6
    )}-${limitedDigits.slice(6)}`
  }
}

export const PersonalInfo = ({
  onAnswer,
  initState,
}: {
  onAnswer: (info: Partial<ILead>) => Promise<void>
  initState: Partial<ILead>
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      ...initState,
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLButtonElement>(null)

  const phoneValue = watch("phone")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue("phone", formatted, { shouldValidate: true, shouldTouch: true })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    await onAnswer({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone.replace(/\D/g, ""),
    })
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formFields}>
      {/* First Name Field */}
      <div className={styles.formField}>
        <label htmlFor="firstName" className={styles.fieldLabel}>
          First Name
        </label>
        <input
          {...register("firstName")}
          className={`${styles.input} ${
            !!errors.firstName?.message && styles.invalidInput
          } ${
            !errors.firstName?.message &&
            touchedFields.firstName &&
            styles.validInput
          }`}
          placeholder="John"
          id="firstName"
        />
        <ErrorMessage message={errors.firstName?.message} />
      </div>

      {/* Last Name Field */}
      <div className={styles.formField}>
        <label htmlFor="lastName" className={styles.fieldLabel}>
          Last Name
        </label>
        <input
          {...register("lastName")}
          className={`${styles.input} ${
            !!errors.lastName?.message && styles.invalidInput
          } ${
            !errors.lastName?.message &&
            touchedFields.lastName &&
            styles.validInput
          }`}
          placeholder="Smith"
          id="lastName"
        />
        <ErrorMessage message={errors.lastName?.message} />
      </div>

      <div className={styles.formField}>
        <label htmlFor="phone" className={styles.fieldLabel}>
          Phone Number
        </label>
        <input
          {...register("phone")}
          onChange={handlePhoneChange}
          value={phoneValue || ""}
          className={`${styles.input} ${
            !!errors.phone?.message && styles.invalidInput
          } ${
            !errors.phone?.message && touchedFields.phone && styles.validInput
          }`}
          placeholder="(555) 123-4567"
          id="phone"
        />
        <ErrorMessage message={errors.phone?.message} />
      </div>

      <div className="button-container">
        <button
          className="primary-button"
          type="submit"
          disabled={!isValid || isSubmitting}
          ref={containerRef}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </div>
    </form>
  )
}
