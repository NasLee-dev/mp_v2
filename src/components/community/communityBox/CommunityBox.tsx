import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import useUser from '@/hooks/auth/useUser'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'

export default function CommunityBox() {
  const user = useUser()
  console.log(user)
  return (
    <Flex css={CommunityBoxStyle}>
      <Flex
        direction="row"
        style={{
          gap: '10px',
        }}
      >
        <Image
          src={
            user?.photoURL ||
            'https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-256.png'
          }
          alt="user pic"
          width={25}
          height={25}
        />
        <Text>{user?.displayName}</Text>
      </Flex>
      <Title>커뮤니티</Title>
      <Contents
        style={{
          color: colors.gray,
        }}
      >
        커뮤니티 내용
      </Contents>

      <RecommendCount
        style={{
          color: colors.gray,
        }}
      >
        추천 10
      </RecommendCount>
      <CommentCount
        style={{
          color: colors.gray,
        }}
      >
        댓글 10
      </CommentCount>
      <CreatedAt
        style={{
          color: colors.gray,
        }}
      >
        2021-10-10
      </CreatedAt>
    </Flex>
  )
}

const CommunityBoxStyle = css`
  width: 90%;
  height: 150px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  position: relative;
  cursor: pointer;
`
const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const Contents = styled.span`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: black;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const CreatedAt = styled.span`
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  position: absolute;
  bottom: 10px;
`

const CommentCount = styled.span`
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`

const RecommendCount = styled.span`
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  position: absolute;
  bottom: 10px;
  right: 70px;
`
