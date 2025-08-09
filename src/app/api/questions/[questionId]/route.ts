import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"
import { getLead } from "@/utils/lead"

interface IParams {
  questionId: string
}

export async function POST(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const answer = await request.json()

    // Get session_id from cookie
    const { sessionId } = await getLead()

    // Validate required fields
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

    if (!answer) {
      return NextResponse.json(
        {
          success: false,
          message: "answer is required.",
        },
        {
          status: 400,
        }
      )
    }

    // Extract data
    const api_url = `${apiConfig.baseUrl}/questions/sessions/${sessionId}/questions/${params.questionId}`

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    })

    const responseData = await response.text()

    return NextResponse.json(
      { data: responseData },
      {
        status: response.status,
      }
    )
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
