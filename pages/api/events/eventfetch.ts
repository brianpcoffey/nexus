import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function fetchAllEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isConnected = await clientPromise
  const db = isConnected.db(process.env.MONGODB_DB)

  const events = await db
    .collection('events')
    .find({
      eventEndDate: { $gte: new Date() },
    })
    .sort({ eventStartDate: 1 })
    .toArray()
  return res.status(200).json({ events })
}
