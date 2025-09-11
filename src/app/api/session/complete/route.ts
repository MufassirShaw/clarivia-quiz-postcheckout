import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { clearLead, getLead } from "@/utils/lead"
import * as Sentry from "@sentry/nextjs"

export async function POST(request: NextRequest) {
  try {
    // Get sessionid from cookie
    const { sessionId } = await getLead()
    const { med, rtkcid } = (await request.json()) as {
      med: string
      rtkcid: string
    }
    // Validate session exists
    if (!sessionId) {
      const err = new Error("Session not found. Please start a new session.")
      Sentry.captureException(err)
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 401 }
      )
    }

    const api_url = `${apiConfig.baseUrl}/sessions/${sessionId}/complete`
    const body = {
      med: [med],
      couponCode: null,
      session_id: sessionId,
      utm_rt_cid: rtkcid,
    }
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const err = new Error(`External API error: ${response.statusText}`)
      Sentry.captureException(err, {
        extra: {
          status: response.status,
          url: api_url,
          body,
          response,
        },
      })
      return NextResponse.json(
        { success: false, message: "Something went wrong." },
        { status: response.status }
      )
    }

    const data = (await response.json()) as {
      completed: boolean
      checkout_url: string
      message: string
    }

    const { completed, checkout_url, message } = data

    if (!completed) {
      const err = new Error(message || "Session completion failed.")
      Sentry.captureException(err, { extra: { sessionId, data } })
      return NextResponse.json(
        { success: false, message: message || "Something went wrong" },
        { status: 502 }
      )
    }

    console.log({
      body,
      url: data.checkout_url,
    })

    // Clear the session cookie
    await clearLead()

    return NextResponse.json({ url: checkout_url }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
