import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import ThemeChanger from '@/components/Theme'
import { useWindowSize } from 'hooks/useWindowSize'
import styles from '@/styles/header.module.css'
import Organization from '../pages/organization/[id]'

interface Size {
  width: number | undefined
  height: number | undefined
}

export default function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const size: Size = useWindowSize()

  return (
    <>
      {size.width > 868 ? (
        <nav className={styles.navigation}>
          <ThemeChanger />
          <ul className={styles.linkwrapper}>
            <Link href="/">Home</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/organizations">Organizations</Link>
            {session ? (
              <>
                <Link href="/profile">Profile</Link>
                <li>
                  <button
                    className={styles.secondary}
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}`,
                      })
                    }
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className={styles.primary}
                  onClick={() =>
                    signIn('google', {
                      callbackUrl: `${window.location.origin}/profile`,
                    })
                  }
                >
                  Sign in
                </button>
              </li>
            )}
          </ul>
        </nav>
      ) : (
        <nav className={styles.mobilenavigation}>
          <div className={styles.hamburger} onClick={() => setOpen(!open)}>
            <span
              className={
                open ? `${styles.inner} ${styles.onclick}` : `${styles.inner}`
              }
            ></span>
            <span
              className={
                open ? `${styles.inner} ${styles.onclick2}` : `${styles.inner}`
              }
            ></span>
          </div>
          <ul className={open ? `${styles.open}` : `${styles.notopen}`}>
            <Link href="/" passHref>
              <a onClick={() => setOpen(!open)}>Home</a>
            </Link>
            <Link href="/reviews" passHref>
              <a onClick={() => setOpen(!open)}>Reviews</a>
            </Link>
            <Link href="/organizations" passHref>
              <a onClick={() => setOpen(!open)}>Organization</a>
            </Link>
            {session ? (
              <>
                <Link href="/profile" passHref>
                  <a onClick={() => setOpen(!open)}>Profile</a>
                </Link>
                <li>
                  <button
                    className={styles.secondary}
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}`,
                      })
                    }
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className={styles.primary}
                  onClick={() =>
                    signIn('google', {
                      callbackUrl: `${window.location.origin}/profile`,
                    })
                  }
                >
                  Sign in
                </button>
              </li>
            )}
            <ThemeChanger />
          </ul>
        </nav>
      )}
    </>
  )
}
