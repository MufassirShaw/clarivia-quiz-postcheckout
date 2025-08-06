import { NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { setSession } from "@/utils/session"

export async function POST() {
  try {
    const api_url = `${apiConfig.baseUrl}/sessions/`

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
    })

    const responseData = await response.text()
    const parsedData = JSON.parse(responseData)

    // Create response with session cookie
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

    if (!parsedData.session_id) {
      throw new Error("Session ID not found in response")
    }

    await setSession(parsedData.session_id)

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
