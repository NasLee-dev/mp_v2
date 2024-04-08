import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY as string,
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_API_KEY as string,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.sub as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signIn',
  },
})
