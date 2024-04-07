import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

import globalSteyls from '@styles/globalStyles'
import Layout from '@shared/Layout'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/shared/Navbar'
import AuthGuard from '@/components/auth/AuthGuard'

const client = new QueryClient({})
export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <SessionProvider session={session}>
          <Global styles={globalSteyls} />
          <QueryClientProvider client={client}>
            <Hydrate state={dehydratedState}>
              <AuthGuard>
                <Navbar />
                <Component {...pageProps} />
              </AuthGuard>
            </Hydrate>
          </QueryClientProvider>
        </SessionProvider>
      </Layout>
    </RecoilRoot>
  )
}
