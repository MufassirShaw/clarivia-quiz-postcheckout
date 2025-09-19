import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { setLead } from "@/utils/lead"
import { ILead } from "@/type/lead"
import * as Sentry from "@sentry/nextjs"
import { ICreateSessionResponse } from "@/type/session"

const sessionUrl = `${apiConfig.baseUrl}/sessions/`

export async function POST(request: NextRequest) {
  const { orderId } = (await request.json()) as { orderId: string }

  try {
    const payload = {
      checkoutFirst: true,
      external_order_id: String(orderId),
      flowType: "checkout_first",
    }

    const res = await fetch(sessionUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log({ payload, res })

    if (!res.ok) {
      const err = new Error(`Failed to create lead: ${res.statusText}`)
      Sentry.captureException(err, {
        extra: { status: res.status, payload, url: sessionUrl },
      })
      return NextResponse.json(
        {
          error: "Failed to create session",
          reason: res.statusText,
          status: res.status,
        },
        { status: 502 }
      )
    }

    const data = (await res.json()) as ICreateSessionResponse
    const lead = {
      ...data.lead_data,
      sessionId: data.session_id,
    }
    await setLead(lead as ILead)
    return NextResponse.json(
      {
        data: {
          ...data,
          lead_data: lead,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing request:", error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
