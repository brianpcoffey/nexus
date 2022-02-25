import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import Link from 'next/link'
import styles from './card.module.css'

export default function EventCard({
  eventId,
  organizationName,
  eventName,
  eventDetails,
  startDate,
  endDate,
  eventTags,
}) {
  // To remove all markdown tags from the details sections
  const strippedEventDetails = eventDetails.replace(/(<([^>]+)>)/gi, ' ')
  const [startMonth, startDay, startYear, startHour] = [
    formatInTimeZone(new Date(startDate), 'America/Los_Angeles', 'MMM'),
    formatInTimeZone(new Date(startDate), 'America/Los_Angeles', 'd'),
    formatInTimeZone(new Date(startDate), 'America/Los_Angeles', 'yyyy'),
    formatInTimeZone(new Date(startDate), 'America/Los_Angeles', 'hh:mm aaa'),
  ]
  const [endMonth, endDay, endYear, endHour] = [
    formatInTimeZone(new Date(endDate), 'America/Los_Angeles', 'MMM'),
    formatInTimeZone(new Date(endDate), 'America/Los_Angeles', 'd'),
    formatInTimeZone(new Date(endDate), 'America/Los_Angeles', 'yyyy'),
    formatInTimeZone(new Date(endDate), 'America/Los_Angeles', 'hh:mm aaa'),
  ]
  return (
    <Link href={`/organizations/${organizationName}/${eventId}`} passHref>
      <div id={eventId} className={styles.card}>
        {new Date(endDate) < new Date() && (
          <span className={styles.expired}>Expired</span>
        )}
        <h3 className={styles.title}>{eventName}</h3>
        <p className={styles.author}>
          <strong>By {organizationName}</strong>
        </p>
        <time className={styles.date}>
          {/* Always display start month day and time */}
          {startMonth} {startDay} {/* Display year if year != current year */}
          {startYear != format(new Date(), 'yyyy') && <>{startYear}</>} @{' '}
          {startHour} -{' '}
          {/* Display end month and day if start month != end month */}
          {(startMonth != endMonth || startDay != endDay) && (
            <>
              {endMonth} {endDay}{' '}
              {/* Display end year if end year != current year */}
              {endYear != format(new Date(), 'yyyy') && <>{startYear}</>} @{' '}
              {endHour}
            </>
          )}{' '}
          {/* Display end time if start month === end month and start day === end day */}
          {startMonth === endMonth && startDay === endDay && <>{endHour}</>}
        </time>
        <p className="clamp-2">{strippedEventDetails}</p>

        {eventTags && (
          <div className={styles.tagwrapper}>
            {eventTags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
