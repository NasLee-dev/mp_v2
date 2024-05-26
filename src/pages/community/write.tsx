import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export default function WritePage() {
  return (
    <Container>
      <Flex css={WriteBox}></Flex>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: calc(100vw - 0px);
  height: 92vh;
  background-color: #f0f0f0;
  position: relative;
`
const WriteBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`
