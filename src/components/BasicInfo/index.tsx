import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./basicInfo.module.css"
import { ILead } from "@/type/lead"
import { useState } from "react"
import { formatBirthday } from "@/utils/datefns"
import { BasicInfoFormType, basicInfoSchema } from "./schema"

interface IBasicInfoProps {
  onAnswer: (info: Partial<ILead>) => Promise<void>
  defaultValues?: BasicInfoFormType
}

export const BasicInfo = ({ onAnswer, defaultValues }: IBasicInfoProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<BasicInfoFormType>({
    resolver: zodResolver(basicInfoSchema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      birthday: formatBirthday(defaultValues?.birthday ?? ""),
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const birthdayValue = watch("birthday")

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthday(e.target.value)
    setValue("birthday", formatted, { shouldValidate: true, shouldTouch: true })
  }

  const onSubmit = async (data: BasicInfoFormType) => {
    setIsSubmitting(true)
    const [m, d, year] = data.birthday.split("/").map((num) => parseInt(num))

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
          placeholder="MM/DD/YYYY"
          id="birthday"
          disabled={!!defaultValues?.birthday}
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
          disabled={!!defaultValues?.email}
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
