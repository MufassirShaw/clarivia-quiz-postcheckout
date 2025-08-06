import { NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { getSession } from "@/utils/session"

export async function POST() {
  try {
    // Get session_id from cookie
    const sessionId = await getSession()

    // Validate session exists
    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Session not found. Please start a new session.",
        },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
          },
        }
      )
    }

    const api_url = `${apiConfig.baseUrl}/sessions/${sessionId}/complete`

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
    })

    const responseData = await response.text()

    // Create response and clear the session cookie
    const nextResponse = NextResponse.json(
      { data: responseData },
      {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
        },
      }
    )

    // Clear the session cookie
    nextResponse.cookies.delete("session_id")

    return nextResponse
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
        },
      }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
    },
  })
}
