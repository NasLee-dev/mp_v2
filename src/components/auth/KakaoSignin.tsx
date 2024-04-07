import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import Image from 'next/image'

export default function KakaoSignin() {
  return (
    <Flex
      justify="center"
      align="center"
      css={ContainerStyle}
      onClick={() => alert('Kakao Signin')}
    >
      <Image
        src={'/images/kakaoLogo.png'}
        alt="KakaoLogo"
        width={30}
        height={30}
      />
      <Spacing direction="horizontal" size={5} />
      <Text typography="t4" fontWeight="bold">
        Kakao로 시작하기
      </Text>
    </Flex>
  )
}

const ContainerStyle = css`
  width: 80%;
  height: 60px;
  border: 1px solid ${colors.gray200};
  border-radius: 6px;
  display: flex;
  cursor: pointer;
`
