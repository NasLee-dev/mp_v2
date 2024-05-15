import SideMenu from '@/components/family/SideMenu'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import withAuth from '@/components/shared/hooks/withAuth'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import FindPage from './familly/find'

interface Register {
  lists: Register
}

function Mymenu(lists: Register) {
  const router = useRouter()
  return <Flex></Flex>
}

export default withAuth(Mymenu)
