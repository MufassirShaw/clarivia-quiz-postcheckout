export const apiConfig = {
  baseUrl: process.env.BASE_URL!,
  apiKey: process.env.API_KEY!,
  tenantId: parseInt(process.env.TENANT_ID!),
} as const

// Validate required environment variables
if (!apiConfig.baseUrl || !apiConfig.apiKey || !apiConfig.tenantId) {
  throw new Error(
    "Missing required environment variables: BASE_URL, API_KEY, or TENANT_ID"
  )
}
