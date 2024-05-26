import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import OrderByProps from './OrderByProps'
import { useState } from 'react'
import CommunityBox from './communityBox/CommunityBox'
import Button from '../shared/Button'
import { useRouter } from 'next/router'

export default function CommunityProps() {
  const [orderBy, setOrderBy] = useState<{
    recent: boolean
    commentCount: boolean
    recommend: boolean
  }>({
    recent: true,
    commentCount: false,
    recommend: false,
  })
  const router = useRouter()
  return (
    <Container
      style={{
        padding: '20px 10px 20px 10px',
      }}
    >
      <OrderByProps orderBy={orderBy} setOrderBy={setOrderBy} />
      <Spacing size={20} />
      <CommunityBox />
      <Flex
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '40px',
        }}
      >
        <Button
          onClick={() => {
            router.push('/community/write')
          }}
        >
          글쓰기
        </Button>
      </Flex>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`
