import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import { colors } from '@/styles/colorPalette'
import Text from '../shared/Text'
import { useRouter } from 'next/router'

const SIDE_MENU = [
  {
    id: 1,
    title: '실종자 찾기',
    url: '/familly/find',
  },
  {
    id: 2,
    title: '실종자 등록하기',
    url: '/familly/register',
  },
]

function SideMenu() {
  const router = useRouter()
  return (
    <Flex direction="column" color="gray100" css={SideMenuStyle}>
      {SIDE_MENU.map((menu) => (
        <Flex
          key={menu.title}
          css={Menu}
          onClick={() => {
            router.push(menu.url)
          }}
        >
          <Text
            css={TextStyle}
            style={{
              color: router.pathname.includes(menu.url)
                ? colors.blue980
                : colors.gray800,
            }}
          >
            {menu.title}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}

const SideMenuStyle = css`
  width: 200px;
  height: 100%;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  flex-direction: column;
`

const Menu = css`
  position: relative;
  top: 60px;
  width: 80%;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.gray200};
  }
  padding: 20px;
`

const TextStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray800};
`

export default SideMenu
