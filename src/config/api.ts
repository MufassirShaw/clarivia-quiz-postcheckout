export const apiConfig = {
  baseUrl: process.env.BASE_URL!,
  apiKey: process.env.API_KEY!,
  tenantId: parseInt(process.env.TENANT_ID!),
  productId: process.env.PRODUCT_ID!,
  isProduction: process.env.NEXT_PUBLIC_QUIZ_ENV === "production",
} as const
