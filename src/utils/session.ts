import { cookies } from "next/headers"
const SESSION_ID_KEY = "session_id"

export const setSession = async (sessionId: string) => {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_ID_KEY, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export const getSession = async () => {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_ID_KEY)?.value
}
