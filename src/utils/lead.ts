import { cookies } from "next/headers"
import { ILead } from "@/type/lead"

const LEAD_KEY = "lead_id"
const SESSION_ID_KEY = "session_id"

export const setLead = async (
  lead: Pick<ILead, "sessionId" | "session_id" | "id">
) => {
  const cookieStore = await cookies()
  const leadId = lead.id
  const sessionId = lead.sessionId || lead.session_id
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }
  cookieStore.set(LEAD_KEY, String(leadId), options)
  cookieStore.set(SESSION_ID_KEY, sessionId, options)
}

export const getLead = async () => {
  const cookieStore = await cookies()
  return {
    leadId: cookieStore.get(LEAD_KEY)?.value,
    sessionId: cookieStore.get(SESSION_ID_KEY)?.value,
  }
}

export const clearLead = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(LEAD_KEY)
  cookieStore.delete(SESSION_ID_KEY)
}
