import SideMenu from '@/components/myMenu/SideMenu'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import withAuth from '@/components/shared/hooks/withAuth'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

function RegisterPage() {
  const { register } = useForm()
  const [formValue, setFormValue] = useState({
    name: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    birth: '',
    missingDate: '',
    LastAddress: '',
    foot: '',
    etc: '',
  })
  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormValue((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [formValue],
  )
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
        <form>
          <Flex
            direction="column"
            style={{
              width: '800px',
            }}
          >
            <Flex
              direction="row"
              style={{
                justifyContent: 'row',
                width: '100%',
                gap: '20px',
              }}
            >
              <TextField
                name="name"
                label="이름"
                value={formValue.name}
                onChange={handleFormValues}
              />
              <TextField
                name="age"
                label="실종 당시 나이"
                value={formValue.age}
                onChange={handleFormValues}
              />
            </Flex>
            <TextField
              name="sex"
              label="성별"
              value={formValue.sex}
              onChange={handleFormValues}
            />
            <TextField
              name="height"
              label="키"
              value={formValue.height}
              onChange={handleFormValues}
            />
            <TextField
              name="weight"
              label="몸무게"
              value={formValue.weight}
              onChange={handleFormValues}
            />
            <TextField
              name="birth"
              label="생년월일"
              value={formValue.birth}
              onChange={handleFormValues}
            />
            <TextField
              name="missingDate"
              label="실종일"
              value={formValue.missingDate}
              onChange={handleFormValues}
            />
            <TextField
              name="LastAddress"
              label="실종 주소"
              value={formValue.LastAddress}
              onChange={handleFormValues}
            />
            <input type="file" name="img" accept="image/*" />
            <TextField
              name="foot"
              label="신발"
              value={formValue.foot}
              onChange={handleFormValues}
            />
            <TextField
              name="etc"
              label="특이사항"
              value={formValue.etc}
              onChange={handleFormValues}
            />
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
