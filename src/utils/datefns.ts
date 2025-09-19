export const formatBirthday = (value: string) => {
  // Remove all non-digits
  if (!value) {
    return ""
  }
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

export const formatPhoneNumber = (value: string) => {
  if (!value) {
    return ""
  }
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
