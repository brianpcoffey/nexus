import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import EventForm from '@/components/Events/EventForm'
import ListEventsPerOrg from '@/components/Events/ListEventsPerOrg'
import clientPromise from '@/lib/mongodb'
import styles from '@/styles/organizations.module.css'
import formstyles from '@/styles/form.module.css'
import AddAdminForm from '@/components/Organizations/AddAdminForm'
import AddMemberForm from '@/components/Organizations/AddMemberForm'
import RemoveMemberForm from '@/components/Organizations/RemoveMemberForm'
import DangerousActions from '@/components/Organizations/DangerousActions'
import { motion, AnimatePresence } from 'framer-motion'

const list = {
  closed: {
    opacity: 0,
    height: '0',
    transition: {
      duration: 0.15,
      delayChildren: 0.15,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.25,
      delayChildren: 0.15,
    },
  },
}

const listItems = {
  closed: {
    opacity: 0,
    y: -5,
  },
  open: {
    opacity: 1,
    y: 0,
  },
}

const Organization = ({ organization, superMembers, members }) => {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const orgId = organization.map((organization) => organization._id).toString()
  const [displayActions, setDisplayActions] = useState(false)
  const [displayMembers, setDisplayMembers] = useState(false)
  const isCreator =
    session &&
    session.user.creatorOfOrg &&
    session.user.creatorOfOrg.includes(orgId)

  const isAdmin =
    isCreator ||
    (session &&
      session.user.adminOfOrg &&
      session.user.adminOfOrg.includes(orgId))

  const isMember =
    session &&
    session.user.memberOfOrg &&
    session.user.memberOfOrg.includes(orgId)

  const isNotMember = !isAdmin && !isMember

  return (
    <Layout>
      {organization.map((organization) => (
        <>
          <Head>
            <title>Nexus | {organization.organizationName}</title>
            {/* Change this icon when we have a logo */}
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h1>{organization.organizationName}</h1>
          <h4>{organization.organizationTagline}</h4>
          <p>{organization.organizationDescription}</p>
          {session && isNotMember && (
            <AddMemberForm
              memberId={session.user.id}
              organizationId={organization._id}
              organizationName={organization.organizationName}
            />
          )}
          {session && isMember && (
            <RemoveMemberForm
              memberId={session.user.id}
              organizationId={organization._id}
              organizationName={organization.organizationName}
            />
          )}
          <h2>Admins</h2>
          <ul className={styles.memberslist}>
            {superMembers.map((superMember) => (
              <li key={superMember.adminId}>
                <strong>{superMember.admin} </strong> / {superMember.email}
              </li>
            ))}
          </ul>
          {session && isAdmin && (
            <>
              <AddAdminForm organizationId={organization._id} />
              <EventForm
                creator={session.user.name}
                email={session.user.email}
                organizationName={organization.organizationName}
                organizationId={organization._id}
              />
              <div className={formstyles.revealheader}>
                <h2>Members</h2>
                <button
                  className={
                    displayMembers
                      ? `${formstyles.reveal} ${formstyles.rotated}`
                      : `${formstyles.reveal} `
                  }
                  onClick={() => setDisplayMembers(!displayMembers)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <AnimatePresence exitBeforeEnter>
                {displayMembers && (
                  <motion.ul
                    animate={displayMembers ? 'open' : 'closed'}
                    variants={list}
                    exit="closed"
                    initial="closed"
                    className={styles.memberslist}
                  >
                    {members.length === 0 && (
                      <p>No one has joined your organization yet 😭.</p>
                    )}
                    {members.map((member) => (
                      <motion.li variants={listItems} key={member.memberId}>
                        <strong>{member.member}</strong> / {member.email}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          )}
          {session && isCreator && (
            <>
              <div className={formstyles.revealheader}>
                <h2>Dangerous Actions</h2>
                <button
                  className={
                    displayActions
                      ? `${formstyles.reveal} ${formstyles.rotated}`
                      : `${formstyles.reveal} `
                  }
                  onClick={() => setDisplayActions(!displayActions)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <AnimatePresence exitBeforeEnter>
                {displayActions && (
                  <motion.div
                    animate={displayActions ? 'open' : 'closed'}
                    variants={list}
                    exit="closed"
                    initial="closed"
                  >
                    <motion.div variants={listItems}>
                      <p>
                        Only the organization owner can view and perform these
                        actions. Please read through each warning before
                        proceeding. It&#39;s very tedious to manually change the
                        database 😅.
                      </p>
                      <DangerousActions
                        organizationId={organization._id}
                        organizationName={organization.organizationName}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          <h2>Events</h2>
          <ListEventsPerOrg organizationId={organization._id} />
        </>
      ))}
    </Layout>
  )
}

// We are using getServerSideProps instead of an endpoint fetched
// with SWR. This allows us to prefetch our data with what is returned
// from the database (a list of all of our courses) mainly because
// this data does not change often so we don't have to revalidate it
// But the dynamic pages that are following it are updated frequently
export async function getServerSideProps(context) {
  const { id } = context.query
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  const organization = await db
    .collection('organizations')
    .find({ organizationName: id })
    .toArray()
  const superMembers = await db
    .collection('organizations')
    .aggregate([
      { $match: { organizationName: id } },
      { $unwind: '$superMembersList' },
      {
        $project: {
          adminId: '$superMembersList.adminId',
          admin: '$superMembersList.admin',
          email: '$superMembersList.email',
        },
      },
    ])
    .sort({ email: 1 })
    .toArray()

  const members = await db
    .collection('organizations')
    .aggregate([
      { $match: { organizationName: id } },
      { $unwind: '$membersList' },
      {
        $project: {
          memberId: '$membersList.memberId',
          member: '$membersList.member',
          email: '$membersList.email',
        },
      },
    ])
    .sort({ email: 1 })
    .toArray()

  const exists = await db
    .collection('organizations')
    .countDocuments({ organizationName: id })
  if (exists < 1) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      organization: JSON.parse(JSON.stringify(organization)),
      superMembers: JSON.parse(JSON.stringify(superMembers)),
      members: JSON.parse(JSON.stringify(members)),
    },
  }
}

export default Organization
