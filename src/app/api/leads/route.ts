import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { getLead, setLead } from "@/utils/lead"
import { ILead } from "@/type/lead"
import * as Sentry from "@sentry/nextjs"

const leadApiUrl = `${apiConfig.baseUrl}/leads/`

export async function POST() {
  try {
    const payload = {
      tenant_id: apiConfig.tenantId,
    }

    const res = await fetch(leadApiUrl, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = new Error(`Failed to create lead: ${res.statusText}`)
      Sentry.captureException(err, {
        extra: { status: res.status, payload, url: leadApiUrl },
      })
      return NextResponse.json(
        { error: "Failed to create lead", reason: res.statusText },
        { status: 502 }
      )
    }

    const data = (await res.json()) as ILead

    await setLead(data)
    return NextResponse.json({ data }, { status: res.status })
  } catch (error) {
    console.error("Error processing request:", error)
    Sentry.captureException(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await request.json()) as Partial<ILead>

    const { leadId } = await getLead()
    if (!leadId) {
      const err = new Error("lead_id is required and must be a valid integer.")
      Sentry.captureException(err)
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      )
    }

    const api_url = `${apiConfig.baseUrl}/leads/${leadId}`

    const response = await fetch(api_url, {
      method: "PUT",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const err = new Error(`Failed to update lead: ${response.statusText}`)
      Sentry.captureException(err, {
        extra: { status: response.status, url: api_url, body: data },
      })
    }

    const responseData = await response.json()

    console.log({ leadData: response })

    return NextResponse.json(
      { data: responseData },
      { status: response.status }
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
