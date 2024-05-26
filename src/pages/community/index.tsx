import Submenu from '@/components/community/SubMenu'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { getNotice, getNotices } from '@/remote/community/getNotice'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import useGetNotice from './hooks/useGetNotice'
import MiniNotice from '@/components/family/MiniNotice'
import Spacing from '@/components/shared/Spacing'
import ContentsProps from '@/components/community/ContentsProps'
import CommunityProps from '@/components/community/CommunityProps'

export default function Community() {
  const [innerHeight, setInnerHeight] = useState<number>(0)
  const [tab, setTab] = useState(0)
  const [clickedMenu, setClickedMenu] = useState(0)
  const [notices, setNotices] = useState<any[]>([]) // Provide the correct type for the notices state
  const handleGetNotices = async () => {
    try {
      const response = await getNotices()
      setNotices(response.docs.map((doc) => doc.data())) // Access the data of each document in the QuerySnapshot
    } catch (error) {
      console.error('error', error)
    }
  }
  const getInnerHeight = () => {
    if (window) {
      setInnerHeight(window.innerHeight)
    }
  }
  useEffect(() => {
    handleGetNotices()
    getInnerHeight()
  }, [])
  return (
    <Container innerHeight={innerHeight}>
      <Flex css={ContentsBox}>
        <Flex
          style={{
            flexDirection: 'row',
            gap: '20px',
            justifyContent: 'start',
            alignItems: 'start',
            display: 'flex',
            width: '80%',
            position: 'absolute',
            top: '20px',
          }}
        >
          <Flex
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setTab(0)
              setClickedMenu(0)
            }}
          >
            <BlogText tab={tab}>컨텐츠</BlogText>
          </Flex>
          <Flex
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setTab(1)
              setClickedMenu(2)
            }}
          >
            <ComuText tab={tab}>커뮤니티</ComuText>
          </Flex>
        </Flex>
        <Spacing direction="horizontal" size={20} />
        <Submenu
          tab={tab}
          clickedMenu={clickedMenu}
          setClickedMenu={setClickedMenu}
        />
        <Flex
          style={{
            flexDirection: 'column',
            gap: '10px',
            position: 'absolute',
            top: '120px',
            left: '80px',
          }}
        >
          <MiniNotice notices={notices.slice(0, 2)} />
        </Flex>
      </Flex>
      <Flex
        css={ContentsBox}
        style={{
          top: '220px',
          height: innerHeight - 220 - 66,
        }}
      >
        {tab === 0 ? <ContentsProps /> : <CommunityProps />}
      </Flex>
    </Container>
  )
}

const Container = styled.div<{ innerHeight: number }>`
  display: flex;
  width: calc(100vw - 0px);
  height: ${(props) => props.innerHeight - 66}px;
  background-color: #f0f0f0;
  position: relative;
`
const ContentsBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 200px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

const BlogText = styled.span<{ tab: number }>`
  font-size: 20px;
  color: ${(props) => (props.tab === 0 ? colors.black : colors.gray400)};
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: ${colors.black};
  }
`
const ComuText = styled.span<{ tab: number }>`
  font-size: 20px;
  color: ${(props) => (props.tab === 1 ? colors.black : colors.gray400)};
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: ${colors.black};
  }
`
