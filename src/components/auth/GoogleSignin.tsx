import useGoogleSignin from '@/hooks/useGoogleSignin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import GoogleLogo from '../icons/Google'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import Image from 'next/image'
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

export default function GoogleSignIn({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  if (!providers.id) return null
  return (
    <Flex direction="row" justify="center" align="center" css={ContainerStyle}>
      <Image
        src={'/images/GoogleLogo.png'}
        alt="googleLogo"
        width={30}
        height={30}
      />
      <Spacing direction="horizontal" size={5} />
      <Text typography="t4" fontWeight="bold" css={TextStyle}>
        Google로 시작하기
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

const TextStyle = css`
  color: ${colors.blue980};
`
