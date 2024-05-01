import SideMenu from '@/components/myMenu/SideMenu'
import { useRouter } from 'next/router'
import Find from './find'

export default function Familly() {
  const router = useRouter()
  return (
    <div>
      <SideMenu />
      {router.pathname === '/familly/find' && <Find />}
    </div>
  )
}
