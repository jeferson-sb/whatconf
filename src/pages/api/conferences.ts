import { type NextApiRequest, type NextApiResponse } from 'next'

import { prisma } from '../../server/db/client'

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  const events = await prisma.event.findMany()
  res.status(200).json(events)
}

export default events
