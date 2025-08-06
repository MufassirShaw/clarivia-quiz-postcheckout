import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"

export async function PUT(
  request: NextRequest,
  { params }: { params: { leadId: string } }
) {
  try {
    const data = await request.json()

    // Validate lead_id
    const leadId = parseInt(params.leadId)
    if (isNaN(leadId) || leadId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "lead_id is required and must be a valid integer.",
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

    // Remove lead_id from data if it exists (since it's in the URL)
    const { lead_id, ...updateData } = data

    const api_url = `${apiConfig.baseUrl}/leads/${leadId}`

    const response = await fetch(api_url, {
      method: "PUT",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
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
