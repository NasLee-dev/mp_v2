import useDebounce from '@/hooks/useDebounce'
import { getPeopleListByKeyword } from '@/remote/myMenu/getPeopleList'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import Flex from '../../components/shared/Flex'
import ListBox from '../../components/myMenu/ListBox'
import SideMenu from '@/components/myMenu/SideMenu'
import { css } from '@emotion/react'
import Text from '@/components/shared/Text'
import Input from '@/components/shared/Input'

export default function ListSearchBar() {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = useQuery(
    ['list', debouncedKeyword],
    () => getPeopleListByKeyword(debouncedKeyword),
    {
      enabled: !!debouncedKeyword,
    },
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])
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
          <Text css={TitleStyle}>실종자 찾기</Text>
        </Flex>
        <Flex
          style={{
            width: '50vw',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
        </Flex>

        {keyword !== '' && data?.length == 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          <ul>
            {data?.map((list) => (
              <Flex
                key={list.id}
                style={{
                  border: '1px solid gray',
                  width: '50vw',
                  height: '200px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <ListBox list={list} />
              </Flex>
            ))}
          </ul>
        )}
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
