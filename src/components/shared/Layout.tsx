import AuthGuard from '../auth/AuthGuard'
import Navbar from './Navbar'
import SEO from './SEO'
import Head from 'next/head'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SEO
        title="Missing People"
        description="그리운 사람들을 찾아드립니다"
        image=""
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
