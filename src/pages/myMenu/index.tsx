import SideMenu from '@/components/myMenu/SideMenu'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import withAuth from '@/components/shared/hooks/withAuth'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import FindPage from './find'

interface Register {
  lists: Register
}

const SIDE_MENU = [
  {
    id: 1,
    title: '실종자 찾기',
    url: '/myMenu/find',
  },
  {
    id: 2,
    title: '실종자 등록하기',
    url: '/myMenu/register',
  },
]

function Mymenu(lists: Register) {
  const router = useRouter()
  return (
    <Flex>
      <SideMenu />
      {router.pathname === '/myMenu/find' && <FindPage lists={lists} />}
    </Flex>
  )
}

export default withAuth(Mymenu)
