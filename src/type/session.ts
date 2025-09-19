import { ILead } from "./lead"

export interface ICreateSessionResponse {
  session_id: string
  user_id: number
  order: {
    orderId: number
    userId: number
    tenant_id: number
    session_id: string
    startData: {
      checkoutFirst: boolean
      flowType: string
      externalOrderId: string
    }
    selectedProduct: unknown
    createdAt: string
    updatedAt: string
  }
  missing_lead_fields: string[]
  validation_message: string
  lead_data: Partial<ILead>
}
