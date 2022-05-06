import NextAuth, { User } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

export default NextAuth({
  callbacks: {
    async session({ session, token, user }) {
      session.user = token as User
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.id = account.id
        token.profile = profile
      }

      return token
    },
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
})
