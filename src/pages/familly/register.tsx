import SideMenu from '@/components/family/SideMenu'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import withAuth from '@/components/shared/hooks/withAuth'
import useUser from '@/hooks/auth/useUser'
import { getPeopleListLength } from '@/remote/family/getPeopleList'
import RegistPeople from '@/remote/register'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ConnectedPerson {
  name: string
  email: string
  uid: string
}

interface FormValues {
  name: string
  age: string
  sex: 'M' | 'F'
  birth: string
  missingDate: string
  LastAddress: string
  etc: string
  img: string
  connectedPerson: ConnectedPerson
  id?: number
}

function RegisterPage() {
  const user = useUser()
  const router = useRouter()
  const { register, formState, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
  })
  const [formValue, setFormValue] = useState<FormValues>({
    name: '',
    age: '',
    sex: 'M',
    birth: '',
    missingDate: '',
    LastAddress: '',
    etc: '',
    img: '',
    connectedPerson: {
      name: '',
      email: '',
      uid: '',
    },
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'birth' && {
          age: `${new Date().getFullYear() - Number(value.slice(0, 4)) + 1}`,
        }),
      }))
    },
    [],
  )

  const uploadImageToClient = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormValue((prev) => ({
            ...prev,
            img: reader.result as string,
          }))
        }
        reader.readAsDataURL(file)
      }
    },
    [],
  )

  const handleConnectedPerson = useCallback(() => {
    const { displayName, email, uid } = user || {}
    setFormValue((prev) => ({
      ...prev,
      connectedPerson: {
        name: displayName ?? '',
        email: email ?? '',
        uid: uid ?? '',
      },
    }))
  }, [user])

  const handleGetLists = useCallback(async () => {
    const data = await getPeopleListLength()
    setFormValue((prev) => ({
      ...prev,
      id: data + 1,
    }))
  }, [])

  useEffect(() => {
    handleConnectedPerson()
    handleGetLists()
  }, [handleConnectedPerson, handleGetLists])

  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      await RegistPeople(formValue)
      const confirmed = window.confirm('등록이 완료되었습니다.')
      router.push(confirmed ? '/familly/find' : '/familly/find')
    } catch (error) {
      alert('다시 시도해주세요')
      console.error(error)
    }
  }

  return (
    <Flex direction="row">
      <SideMenu />
      <Flex css={containerStyle}>
        <Flex css={headerStyle}>
          <Text css={titleStyle}>실종자 등록하기</Text>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" css={formContainerStyle}>
            <Spacing size={20} />
            <Flex
              direction="row"
              justify="center"
              align="start"
              css={imageContainerStyle}
            >
              <Flex direction="column" css={imageWrapperStyle}>
                <Text typography="t7" css={labelStyle}>
                  실종자 사진
                </Text>
                <Image
                  src={
                    formValue.img ||
                    'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male4-256.png'
                  }
                  alt="img"
                  width={200}
                  height={210}
                  css={imageStyle}
                />
                <input type="file" name="img" onChange={uploadImageToClient} />
              </Flex>
              <Flex direction="column">
                <Flex direction="row" css={fieldRowStyle}>
                  <TextField
                    {...register('name', { required: true })}
                    name="name"
                    label="실종자 이름"
                    value={formValue.name}
                    onChange={handleFormValues}
                    css={textFieldStyle}
                  />
                  <TextField
                    {...register('birth', { required: true })}
                    name="birth"
                    label="실종자 생년월일"
                    value={formValue.birth}
                    onChange={handleFormValues}
                    css={textFieldStyle}
                  />
                </Flex>
                <Spacing size={10} />
                <Flex direction="row" css={fieldRowStyle}>
                  <TextField
                    {...register('missingDate', { required: true })}
                    name="missingDate"
                    label="실종일자"
                    value={formValue.missingDate}
                    onChange={handleFormValues}
                    css={textFieldStyle}
                  />
                  <Select
                    {...register('sex', { required: true })}
                    label="실종자 성별"
                    name="sex"
                    options={[
                      { label: '남성', value: 'M' },
                      { label: '여성', value: 'F' },
                    ]}
                    css={selectStyle}
                    onChange={handleFormValues}
                  />
                </Flex>
                <Spacing size={10} />
                <Text typography="t7" css={labelStyle}>
                  실종 주소
                </Text>
                <Input
                  {...register('LastAddress', { required: true })}
                  name="LastAddress"
                  value={formValue.LastAddress}
                  onChange={handleFormValues}
                  css={addressInputStyle}
                />
              </Flex>
            </Flex>
            <Spacing size={20} />
            <Flex css={fullWidthStyle}>
              <TextField
                name="etc"
                label="실종자 특징"
                value={formValue.etc}
                onChange={handleFormValues}
                css={fullDescriptionStyle}
              />
            </Flex>
            <Spacing size={20} />
            <Flex css={fullWidthStyle}>
              <Button
                color="primary"
                size="large"
                full
                disabled={!formState.isValid}
                type="submit"
                css={submitButtonStyle}
              >
                <Text css={submitButtonTextStyle}>등록하기</Text>
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  position: relative;
  left: 200px;
  top: 0;
  z-index: 1;
  justify-content: start;
  align-items: center;
`

const headerStyle = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
`

const titleStyle = css`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`

const formContainerStyle = css`
  width: 800px;
  justify-content: start;
  align-items: center;
  position: relative;
`

const imageContainerStyle = css`
  gap: 20px;
`

const imageWrapperStyle = css`
  width: 200px;
`

const labelStyle = css`
  margin-bottom: 6px;
`

const imageStyle = css`
  width: 200px;
  height: 210px;
  border: 1px solid #000;
`

const fieldRowStyle = css`
  width: 100%;
  gap: 60px;
`

const textFieldStyle = css`
  width: 260px;
`

const selectStyle = css`
  width: 260px;
`

const addressInputStyle = css`
  width: 100%;
`

const fullWidthStyle = css`
  width: 100%;
`

const fullDescriptionStyle = css`
  width: 800px;
  height: 200px;
`

const submitButtonStyle = css`
  border-radius: 10px;
  animation: 0.5s ease-in-out forwards;
`

const submitButtonTextStyle = css`
  font-weight: bold;
  color: ${colors.white};
`

export default withAuth(RegisterPage)
