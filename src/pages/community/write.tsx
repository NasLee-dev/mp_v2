import Flex from '@/components/shared/Flex'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { CATEGORIES } from '@/constant/Categories'
import useUser from '@/hooks/auth/useUser'
import { postWriting } from '@/remote/community/postWriting'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  category: string
  title: string
  content: string
  displayName: string
  email: string
  uid: string
}

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
)

export default function WritePage() {
  const user = useUser()
  console.log(user)
  const router = useRouter()
  const [formData, setFormData] = useState<Props>({
    category: 'free',
    title: '',
    content: '',
    displayName: user?.displayName || '',
    email: user?.email || '',
    uid: user?.uid || '',
  })
  const { register, formState, handleSubmit } = useForm<Props>({
    mode: 'onChange',
  })
  const handleFormData = useCallback(
    (
      e:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLSelectElement>
        | ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value, name } = e.target as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        }
      })
    },
    [],
  )
  const onSubmit: SubmitHandler<Props> = async () => {
    if (formData.title === '' || formData.content === '') {
      alert('제목과 내용을 입력해주세요')
      return
    }
    try {
      await postWriting(formData)
      if (window.confirm('등록이 완료되었습니다.')) {
        router.push('/community')
      }
    } catch (error) {
      alert('다시 시도해주세요')
      console.error(error)
    }
  }
  console.log(formData)
  return (
    <Container>
      <Flex css={WriteBox}>
        <Flex
          direction="row"
          style={{
            width: '100%',
            position: 'relative',
            top: '50px',
          }}
        >
          <Image
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png"
            alt="back"
            width={30}
            height={30}
            style={{
              position: 'absolute',
              left: '50px',
            }}
          />
          <Flex
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Text css={TitleStyle}>게시물 작성</Text>
          </Flex>
        </Flex>
        <form
          style={{
            width: '85%',
            position: 'relative',
            top: '150px',
            flexDirection: 'column',
          }}
        >
          <Select
            {...register('category', { required: true })}
            label=""
            name="category"
            options={CATEGORIES}
            style={{
              width: '30%',
            }}
            onChange={handleFormData}
          />
          <Spacing size={10} />
          <TextField
            {...register('title', { required: true })}
            name="title"
            label=""
            placeholder="제목을 입력해주세요"
            onChange={handleFormData}
          />
          <Spacing size={10} />
          <textarea
            {...register('content', { required: true })}
            placeholder="내용을 입력해주세요"
            name="content"
            style={{
              width: '100%',
              height: '300px',
              border: `1px solid ${colors.gray}`,
              borderRadius: '4px',
              padding: '10px',
              boxSizing: 'border-box',
              resize: 'none',
            }}
            onChange={handleFormData}
          />
          <Spacing size={50} />
          <FixedBottomButton
            label="작성하기"
            onClick={() => onSubmit(formData)}
            style={{
              width: '700px',
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </form>
      </Flex>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: calc(100vw - 0px);
  height: 93vh;
  background-color: #f0f0f0;
  position: relative;
`
const WriteBox = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 800px;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

const TitleStyle = css`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 18px;
  line-height: 22.54px;
  letter-spacing: -3%;
  text-align: Center;
`
const ButtonTextStyle = css`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 18px;
  line-height: 22.54px;
  letter-spacing: -3%;
  text-align: Center;
  color: ${colors.white};
`
