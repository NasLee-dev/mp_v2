import SideMenu from '@/components/myMenu/SideMenu'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import withAuth from '@/components/shared/hooks/withAuth'
import useUser from '@/hooks/auth/useUser'
import RegistPeople from '@/remote/register'
import { Colors, colors } from '@/styles/colorPalette'
import { css, keyframes } from '@emotion/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
)

function RegisterPage() {
  const user = useUser()
  const { register, formState, handleSubmit } = useForm({
    mode: 'onChange',
  })
  const [formValue, setFormValue] = useState({
    name: '',
    age: '',
    sex: '',
    birth: '',
    missingDate: '',
    LastAddress: '',
    etc: '',
    img: '',
    connectedPerson: {
      name: '',
      email: '',
      id: '',
    },
  })
  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
      }))
      if (name === 'birth') {
        setFormValue((prev) => ({
          ...prev,
          age: `${new Date().getFullYear() - Number(value.slice(0, 4)) + 1}`,
        }))
      }
    },
    [formValue],
  )

  const uploadImageToClient = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
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

  const handleConnectedPerson = () => {
    const { displayName, email, uid } = user || {}
    setFormValue((prev: any) => {
      return {
        ...prev,
        connectedPerson: {
          name: displayName,
          email,
          id: uid,
        },
      }
    })
  }

  useEffect(() => {
    handleConnectedPerson()
  }, [])

  const onSubmit: SubmitHandler<any> = async () => {
    await RegistPeople(formValue)
  }

  console.log(formValue)

  return (
    <Flex
      style={{
        flexDirection: 'row',
      }}
    >
      <SideMenu />
      <Flex css={ContainerStyle}>
        <Flex
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '25px',
            marginBottom: '25px',
          }}
        >
          <Text css={TitleStyle}>실종자 등록하기</Text>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            direction="column"
            style={{
              width: '800px',
              height: '800px',
              justifyContent: 'start',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Spacing size={20} />
            <Flex
              direction="row"
              justify="center"
              align="start"
              style={{
                gap: '20px',
              }}
            >
              <Flex
                direction="column"
                style={{
                  width: '200px',
                }}
              >
                <Text
                  typography="t7"
                  display="inline-block"
                  style={{ marginBottom: 6 }}
                >
                  실종자 사진
                </Text>
                <Image
                  src={
                    formValue.img === ''
                      ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male4-256.png'
                      : formValue.img
                  }
                  alt="img"
                  width={200}
                  height={210}
                  style={{
                    width: '200px',
                    height: '210px',
                    border: '1px solid #000',
                  }}
                />
                <input type="file" name="img" onChange={uploadImageToClient} />
              </Flex>
              <Flex direction="column">
                <Flex
                  direction="row"
                  style={{
                    gap: '20px',
                  }}
                >
                  <TextField
                    {...register('name', { required: true })}
                    name="name"
                    label="실종자 이름"
                    value={formValue.name}
                    onChange={handleFormValues}
                    style={{ width: '100%' }}
                  />
                  <TextField
                    {...register('birth', { required: true })}
                    name="birth"
                    label="실종자 생년월일"
                    value={formValue.birth}
                    onChange={handleFormValues}
                    style={{ width: '100%' }}
                  />
                </Flex>
                <Spacing size={10} />
                <Flex
                  direction="row"
                  style={{
                    width: '100%',
                    gap: '20px',
                  }}
                >
                  <Flex direction="column">
                    <Text
                      typography="t7"
                      display="inline-block"
                      style={{ marginBottom: 6 }}
                    >
                      실종 일자
                    </Text>
                    <Input
                      {...register('missingDate', { required: true })}
                      name="missingDate"
                      value={formValue.missingDate}
                      onChange={handleFormValues}
                      style={{ width: '260px' }}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Select
                      {...register('sex', { required: true })}
                      label="실종자 성별"
                      name="sex"
                      options={[
                        { label: '남성', value: 'M' },
                        { label: '여성', value: 'F' },
                      ]}
                      style={{
                        width: '280px',
                        height: '48px',
                      }}
                      onChange={handleFormValues}
                    />
                  </Flex>
                </Flex>
                <Spacing size={10} />
                <Text
                  typography="t7"
                  display="inline-block"
                  style={{ marginBottom: 6 }}
                >
                  실종 주소
                </Text>
                <Input
                  {...register('LastAddress', { required: true })}
                  name="LastAddress"
                  value={formValue.LastAddress}
                  onChange={handleFormValues}
                />
              </Flex>
            </Flex>
            <Spacing size={20} />
            <Flex
              style={{
                marginLeft: '10px',
              }}
            >
              <TextField
                name="etc"
                label="실종자 특징"
                value={formValue.etc}
                onChange={handleFormValues}
                style={{
                  width: '780px',
                  height: '200px',
                }}
              />
            </Flex>
            <Spacing size={20} />
            <Flex
              style={{
                width: '780px',
              }}
            >
              <Button
                color="primary"
                size="large"
                full
                disabled={!formState.isValid}
                style={{
                  borderRadius: '10px',
                  animation: '0.5s ease-in-out forwards',
                }}
                type="submit"
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.white,
                  }}
                >
                  등록하기
                </Text>
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  height: calc(100vh - 65px);
  position: relative;
  left: 200px;
  top: 0px;
  z-index: 1;
  justify-content: start;
  align-items: center;
`

const TitleStyle = css`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`

export default withAuth(RegisterPage)
