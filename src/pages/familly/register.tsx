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
    (
      e: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >,
    ) => {
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
    <Flex
      direction="row"
      style={{ height: 'calc(100vh - 65px)', width: '100%' }}
    >
      <SideMenu />
      <Flex css={containerStyle}>
        <Flex css={headerStyle}>
          <Text css={titleStyle}>실종자 등록하기</Text>
        </Flex>
        <Spacing size={10} />
        <Flex css={formContainerStyle}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ position: 'absolute', top: 0, left: '10%', width: '90%' }}
          >
            <Flex
              direction="row"
              style={{ width: '80%', justifyContent: 'space-between' }}
            >
              <Flex direction="column" css={imageContainerStyle}>
                <Text style={{ textAlign: 'left' }}>
                  <label css={labelStyle}>실종자 사진</label>
                </Text>
                <Image
                  src={
                    formValue.img ||
                    'https://cdn1.iconfinder.com/data/icons/material-design-icons-light/24/picture-512.png'
                  }
                  alt="image"
                  width={250}
                  height={210}
                  css={imageStyle}
                />
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={uploadImageToClient}
                />
              </Flex>
              <Flex direction="column">
                <Flex
                  direction="row"
                  style={{
                    justifyContent: 'space-between',
                    gap: '20px',
                    height: '50%',
                  }}
                >
                  <Flex direction="column" style={{ gap: '10px' }}>
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
                  <Flex direction="column" style={{ gap: '10px' }}>
                    <TextField
                      {...register('missingDate', { required: true })}
                      name="missingDate"
                      label="실종 추정 일자"
                      placeholder="2000-12-20"
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
                      style={{ fontSize: 16 }}
                      onChange={handleFormValues}
                    />
                  </Flex>
                </Flex>
                <Spacing size={30} />
                <Flex direction="column">
                  <label css={labelStyle}>실종자 최종 주소</label>
                  <input
                    {...register('LastAddress', { required: true })}
                    name="LastAddress"
                    value={formValue.LastAddress}
                    onChange={handleFormValues}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '6px',
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Spacing size={20} />
            <Flex
              css={fullWidthStyle}
              direction="column"
              style={{ width: '80%' }}
            >
              <label css={labelStyle}>실종자 특징</label>
              <textarea
                name="etc"
                value={formValue.etc}
                onChange={handleFormValues}
                style={{
                  width: '100%',
                  height: '200px',
                  resize: 'none',
                  borderRadius: '6px',
                }} // 원하는 높이와 스타일 설정
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
          </form>
        </Flex>
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
  justify-content: center;
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
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  position: relative;
`

const imageContainerStyle = css`
  gap: 10px;
  width: 300px;
`

const labelStyle = css`
  margin-bottom: 6px;
  font-family: 'SUIT';
  font-size: 16px;
`

const imageStyle = css`
  width: 250px;
  height: 220px;
  border: 1px solid #000;
  border-radius: 6px;
`

const textFieldStyle = css`
  width: 50%;
`

const selectStyle = css`
  width: 100%;
`

const fullWidthStyle = css`
  width: 80%;
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
