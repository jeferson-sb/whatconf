import { type NextApiRequest, type NextApiResponse } from 'next'
import { getMessaging as getMessagingAdmin } from 'firebase-admin/messaging'

import { type Conference } from '@/domain/Conference'

interface SubscribeRequest extends NextApiRequest {
  body: {
    fcmToken: string
    event: Conference.EventData
  }
}

interface ResponseData {
  success: boolean
  message: string
}

const subscribe = async (
  req: SubscribeRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const { fcmToken, event } = req.body
    const response = await getMessagingAdmin().subscribeToTopic(
      fcmToken,
      event.title
    )

    return res.status(201).json({
      success: true,
      message: `You're now subscribed to ${event.title} and should receive notifications when the event starts!`,
      tokenSent: fcmToken,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Failed to subscribe: ${error?.message}`,
    })
  }
}

export default subscribe
