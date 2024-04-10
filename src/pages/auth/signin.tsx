import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { FormValue } from '@/model/user'
import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import validator from 'validator'

function EamilSigninPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [user, setUser] = useRecoilState(userAtom)
  const router = useRouter()

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }, [])
  const errors = useMemo(() => validate(formValues), [formValues])
  const 제출가능한가 = Object.keys(errors).length === 0
  const handleSubmit = async () => {
    try {
      const getUser = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password,
      )
      console.log(getUser)
      setUser({
        ...user,
        uid: getUser.user.uid as string,
        email: getUser.user.email as string,
        displayName: getUser.user.displayName as string,
        photoURL: getUser.user.photoURL as string,
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Flex css={ContainerStyles}>
      <Flex css={FormStyles} direction="column" align="center">
        <Spacing direction="vertical" size={20} />
        <Text bold={true} typography="t3">
          로그인을 진행해주세요!
        </Text>
        <Spacing direction="vertical" size={50} />
        <Flex direction="column" css={formContainerStyles}>
          <TextField
            label="이메일"
            name="email"
            placeholder="text@test.com"
            onChange={handleFormValues}
            value={formValues.email}
            style={{
              width: '490px',
            }}
          />
          <Spacing size={16} />
          <TextField
            label="패스워드"
            name="password"
            type="password"
            onChange={handleFormValues}
            value={formValues.password}
            style={{
              width: '490px',
            }}
          />
          <Spacing size={32} />
          <Button
            size="medium"
            disabled={제출가능한가 === false}
            onClick={() => {
              handleSubmit()
            }}
            style={{
              width: '490px',
            }}
          >
            로그인
          </Button>
          <Spacing size={12} />
          <Link href="/auth/signup" css={linkStyles}>
            <Text typography="t7">아직 계정이 없으신가요? </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

function validate(formValues: FormValue) {
  let errors: Partial<FormValue> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }
  return errors
}

const ContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`

const formContainerStyles = css`
  padding: '24px';
  width: '100%';
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
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

export default EamilSigninPage
