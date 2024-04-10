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
import { useRouter } from 'next/router'

function SignInPage({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  const router = useRouter()
  return (
    <div>
      <Flex css={ContainerStyles}>
        <Flex css={FormStyles} direction="column" align="center">
          <Spacing direction="vertical" size={20} />
          <Text bold={true} typography="t3">
            로그인을 진행해주세요!
          </Text>
          <Spacing direction="vertical" size={80} />
          <Flex
            direction="row"
            align="center"
            justify="center"
            style={{
              display: 'flex',
              width: '100%',
              height: '60px',
              borderRadius: '8px',
              border: '1px solid #333',
              cursor: 'pointer',
              gap: '10px',
            }}
            onClick={() => {
              router.push('/auth/signin')
            }}
          >
            <Image
              src={
                'https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png'
              }
              width={30}
              height={30}
              alt={'Mail'}
              style={{
                marginLeft: '-10px',
              }}
            />
            <Text bold={true} typography="t5">
              이메일로 로그인
            </Text>
          </Flex>
          <Spacing direction="vertical" size={15} />
          {Object.values(providers).map((provider) => (
            <>
              <div
                key={provider.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  height: '60px',
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
                    bold={true}
                    style={{
                      color: provider.id === 'google' ? 'white' : 'black',
                    }}
                    typography="t5"
                  >
                    {provider.id === 'google' ? 'Google' : 'Kakao'}로 로그인
                  </Text>
                </div>
              </div>
              <Spacing direction="vertical" size={15} />
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
