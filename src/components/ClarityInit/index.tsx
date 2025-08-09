"use client"
import { analyticsConfig } from "@/config/analytics"
import Clarity from "@microsoft/clarity"
import { useEffect } from "react"

const isDev = process.env.NODE_ENV === "development"
export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && !isDev) {
      Clarity.init(analyticsConfig.clarityId)
    }
  }, [])

  return null
}
