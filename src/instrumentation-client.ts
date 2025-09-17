import * as Sentry from "@sentry/nextjs"
import { sentryConfig } from "./config/error-tracking"

Sentry.init({
  dsn: sentryConfig.dsn,
  enableLogs: true,
  debug: false,
  environment: process.env.NODE_ENV === "development" ? "dev" : "prod",
})
