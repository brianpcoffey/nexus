import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Page from '@/components/Layout/Page'
import ListUserPosts from '@/components/Profile/ListUserPosts'
import ListUserOrganizations from '@/components/Profile/ListUserOrganizations'
import ListUserOpportunities from '@/components/Events/ListUserOpportunities'
import SetRoleForm from '@/components/Profile/SetRoleForm'
import styles from '@/styles/profile.module.css'
import Tabs from '@/components/Layout/Tabs'

export default function Profile() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
      toast.error('Please sign in.')
      // User is not authenticated
    },
  })

  return (
    <Page title="Profile" tip={null}>
      {session && session.user.role && session.user.role.includes('none') && (
        <SetRoleForm userId={session.user.id} />
      )}

      {status === 'loading' && <h1>Loading</h1>}
      {session && (
        <>
          <h1>Hello {session.user.name}</h1>
          <h3>Have an awesome day.</h3>

          <Tabs
            tabs={[
              {
                label: 'Organizations',
                id: 'organizations',
                component: <ListUserOrganizations />,
              },
              {
                label: 'Reviews',
                id: 'reviews',
                component: <ListUserPosts />,
              },
              {
                label: 'Opportunities',
                id: 'opportunities',
                component: <ListUserOpportunities />,
              }
            ]}
            layoutId="profile"
          />
        </>
      )}
    </Page>
  )
}
