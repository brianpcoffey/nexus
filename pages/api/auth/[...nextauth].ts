import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from 'lib/mongodb'
import GoogleProvider from 'next-auth/providers/google'

const maxAge = 30 * 24 * 60 * 60 // 30 days

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({ db: (await clientPromise).db('NexusDatabase') }),
    //Configure one or more authentication providers
    //We will solely use Google, preferably within a single domain
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      // signIn: '/auth/signin', // Don't need this page as we redirect them directly to Google Auth
      signOut: '/pages/index', // Redirect them to home page on sign out
      error: '/auth/error',
      newUser: '/auth/new-user',
    },
    // jwt: {
    //   signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,

    // You can also specify a public key for verification if using public/private key (but private only is fine)
    // verificationKey: process.env.JWT_SIGNING_PUBLIC_KEY,

    // If you want to use some key format other than HS512 you can specify custom options to use
    // when verifying (note: verificationOptions should include a value for maxTokenAge as well).
    // verificationOptions: {
    //   maxTokenAge: `${maxAge}s`,
    //   algorithms: ['HS512'],
    // },
    //},
  })
}