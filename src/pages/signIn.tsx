import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react'
import Image from 'next/image'

function SignInPage({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  return (
    <div>
      <Flex css={ContainerStyles}>
        <Flex css={FormStyles} direction="column" align="center">
          <Spacing direction="vertical" size={20} />
          <Text bold={true} typography="t3">
            로그인을 진행해주세요!
          </Text>
          <Spacing direction="vertical" size={80} />
          {Object.values(providers).map((provider) => (
            <>
              <div
                key={provider.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  justifyContent: 'center',
                  color: provider.id === 'google' ? 'white' : 'black',
                  backgroundColor:
                    provider.id === 'google'
                      ? '#4285F4'
                      : provider.id === 'kakao'
                        ? '#FFEB00'
                        : '#3C1E1E',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/',
                  })
                }
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Image
                    src={
                      provider.id === 'google'
                        ? '/images/GoogleLogo.png'
                        : provider.id === 'kakao'
                          ? '/images/KakaoLogo.png'
                          : '/naver.png'
                    }
                    width={30}
                    height={30}
                    alt={provider.name}
                  />
                  <Text
                    style={{
                      color: provider.id === 'google' ? 'white' : 'black',
                    }}
                    typography="t5"
                  >
                    {provider.id === 'google' ? 'Google' : 'Kakao'}로 로그인
                  </Text>
                </div>
              </div>
              <Spacing direction="vertical" size={10} />
            </>
          ))}
        </Flex>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

const ContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`

const FormStyles = css`
  width: 500px;
  height: 500px;
  border-radius: 8px;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export default SignInPage
