import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'
import { zonedTimeToUtc } from 'date-fns-tz'
const mongodb = require('mongodb')
const cloudinary = require('cloudinary').v2

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL)

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
})

export default async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const isConnected = await clientPromise
  const db = isConnected.db(process.env.MONGODB_DB)
  if (session) {
    const {
      newEventData: {
        eventCreator,
        email,
        organizationName,
        organizationId,
        _eventName,
        _eventDetails,
        _eventStartDate,
        _eventEndDate,
        _eventImage,
        _eventTags,
      },
    } = req.body
    // Since we only need secure_url and public_id, set as null
    // so if there is no event image submitted, it won't throw an
    // "undefined error"

    let cloudinaryRes = { secure_url: null, public_id: null }
    if (_eventImage) {
      cloudinaryRes = await cloudinary.uploader.upload(_eventImage)
    }
    await db.collection('events').insertOne({
      eventCreator: eventCreator,
      email: email,
      organizationId: new mongodb.ObjectId(organizationId),
      organizationName: organizationName,
      eventName: _eventName,
      eventDetails: _eventDetails,
      eventStartDate: zonedTimeToUtc(_eventStartDate, 'America/Los_Angeles'),
      eventEndDate: zonedTimeToUtc(_eventEndDate, 'America/Los_Angeles'),
      eventTags: _eventTags,
      eventImageURL: cloudinaryRes.secure_url,
      imagePublicId: cloudinaryRes.public_id,
      createdAt: new Date(),
      comments: [],
    })
    res.status(200).json({ message: 'Successfully posted event.' })
  } else {
    res.status(401).json({
      error: 'Not signed in.',
    })
  }
}
