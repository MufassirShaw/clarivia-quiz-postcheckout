import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/config/api"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Append tenant_id to the data
    const requestData = {
      ...data,
      tenant_id: apiConfig.tenantId,
    }

    const api_url = `${apiConfig.baseUrl}/leads/`

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "X-API-KEY": apiConfig.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
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
