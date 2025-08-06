import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { getSession } from "@/utils/session"

export async function POST(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const data = await request.json()

    // Get session_id from cookie
    const sessionId = await getSession()

    // Validate required fields
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

    if (!data.answer_data) {
      return NextResponse.json(
        {
          success: false,
          message: "answer_data is required.",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
          },
        }
      )
    }

    // Extract data
    const answer_data = data.answer_data
    const api_url = `${apiConfig.baseUrl}/questions/sessions/${sessionId}/questions/${params.questionId}`

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer_data),
    })

    const responseData = await response.text()

    return NextResponse.json(
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
