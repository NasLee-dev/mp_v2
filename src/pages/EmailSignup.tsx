import { COLLECTION } from '@/components/constants'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { FormValue } from '@/model/user'
import { auth, store } from '@/remote/firebase'
import { css } from '@emotion/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
)

function EamilSignupPage() {
  const router = useRouter()
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValue>>({})
  const handleFormValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: true,
    }))
  }, [])
  const errors = useMemo(() => validate(formValue), [formValue])
  const 제출가능한가 = Object.keys(errors).length === 0

  const handleSubmit = async (formValue: FormValue) => {
    const { email, password, name, phone } = formValue
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(user, {
        displayName: name,
      })
      const newUser = {
        uid: user.uid,
        email: user.email,
        name,
      }
      await setDoc(doc(collection(store, COLLECTION.USER), user.uid), newUser)
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
          회원가입
        </Text>
        <Spacing direction="vertical" size={10} />
        <form
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <TextField
            label="이름"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={formValue.name}
            hasError={Boolean(dirty.name) && Boolean(errors.name)}
            helpMessage={Boolean(dirty.name) ? errors.name : ''}
            onBlur={handleBlur}
            onChange={handleFormValue}
            style={{
              width: '490px',
            }}
          />
          <Spacing direction="vertical" size={10} />
          <TextField
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={formValue.email}
            hasError={Boolean(dirty.email) && Boolean(errors.email)}
            helpMessage={Boolean(dirty.email) ? errors.email : ''}
            onBlur={handleBlur}
            onChange={handleFormValue}
            style={{
              width: '490px',
            }}
          />
          <Spacing direction="vertical" size={10} />
          <TextField
            label="휴대폰 번호( - 없이 입력해주세요 )"
            name="phone"
            type="text"
            placeholder="예)01012341234"
            value={formValue.phone}
            hasError={Boolean(dirty.phone) && Boolean(errors.phone)}
            helpMessage={Boolean(dirty.phone) ? errors.phone : ''}
            onBlur={handleBlur}
            onChange={handleFormValue}
            style={{
              width: '490px',
            }}
          />
          <Spacing direction="vertical" size={10} />
          <TextField
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            hasError={Boolean(dirty.password) && Boolean(errors.password)}
            value={formValue.password}
            helpMessage={Boolean(dirty.password) ? errors.password : ''}
            onBlur={handleBlur}
            style={{
              width: '490px',
            }}
            onChange={handleFormValue}
          />
          <Spacing direction="vertical" size={10} />
          <TextField
            type="password"
            name="passwordConfirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            hasError={
              Boolean(dirty.passwordConfirm) && Boolean(errors.passwordConfirm)
            }
            value={formValue.passwordConfirm}
            helpMessage={
              Boolean(dirty.passwordConfirm) ? errors.passwordConfirm : ''
            }
            onBlur={handleBlur}
            style={{
              width: '490px',
            }}
            onChange={handleFormValue}
          />
          <Spacing direction="vertical" size={50} />
          <Button
            style={{
              cursor: 'pointer',
              width: '490px',
            }}
            onClick={() => {
              handleSubmit(formValue)
            }}
          >
            <Text bold={true} typography="t5" color="white">
              회원가입
            </Text>
          </Button>
        </form>
      </Flex>
    </Flex>
  )
}

function validate(formValues: FormValue) {
  let errors: Partial<FormValue> = {}
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.'
  } else if (
    validator.equals(
      formValues.password,
      formValues.passwordConfirm as string,
    ) === false
  ) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  }
  if (formValues.name === '') {
    errors.name = '이름을 입력해주세요'
  }
  if (
    formValues.phone === '' ||
    validator.isMobilePhone(formValues.phone as string) === false
  ) {
    errors.phone = '휴대폰 번호를 확인해주세요'
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

const FormStyles = css`
  width: 500px;
  height: 600px;
  border-radius: 8px;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export default EamilSignupPage
