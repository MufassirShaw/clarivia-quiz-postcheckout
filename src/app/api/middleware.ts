import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // --- CORS setup ---
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, X-API-KEY"
  )
  response.headers.set("Access-Control-Allow-Origin", "*")

  // If it's a preflight OPTIONS request, return immediately
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: response.headers })
  }

  return response
}

// Run only for API routes
export const config = {
  matcher: "/api/:path*",
}
