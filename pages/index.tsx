import Head from 'next/head'
import clientPromise from '@/lib/mongodb'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import styles from '@/styles/index.module.css'

export default function Home({ isConnected }) {
  const { data: session } = useSession()

  return (
    <Layout>
      <Head>
        <title>Nexus</title>
        {/* Change this icon when we have a logo */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1>Nexus @ UCR</h1>
        <h3 className={styles.subtitle}>Where Information Gathers</h3>
        {session && (
          <>
            {isConnected ? (
              <h3>Hi, {session.user.name}! Let's learn something new today.</h3>
            ) : (
              <h3>
                You are <strong>not</strong> connected to MongoDB. Check the{' '}
                <code>README.md</code> for instructions.
              </h3>
            )}
          </>
        )}
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let isConnected
  try {
    const client = await clientPromise
    isConnected = true
  } catch (e) {
    console.log(e)
    isConnected = false
  }

  return {
    props: { isConnected },
  }
}
