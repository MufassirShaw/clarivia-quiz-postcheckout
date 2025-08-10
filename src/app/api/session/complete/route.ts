import { NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { clearLead, getLead } from "@/utils/lead"

export async function POST() {
  try {
    // Get session_id from cookie
    const { sessionId } = await getLead()

    // Validate session exists
    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Session not found. Please start a new session.",
        },
        {
          status: 401,
        }
      )
    }

    const api_url = `${apiConfig.baseUrl}/sessions/${sessionId}/complete`

    const body = {
      med: [apiConfig.productId],
      couponCode: null,
      session_id: sessionId,
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
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong.",
        },
        {
          status: response.status,
        }
      )
    }

    const responseData = await response.text()

    // Create response and clear the session cookie
    const nextResponse = NextResponse.json(
      { data: responseData },
      {
        status: response.status,
      }
    )

    // Clear the session cookie
    await clearLead()

    return nextResponse
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
  })
}
