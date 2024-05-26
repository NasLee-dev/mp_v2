import { Dispatch, SetStateAction, useCallback } from 'react'
import Flex from '../shared/Flex'
import { colors } from '@/styles/colorPalette'
import Text from '../shared/Text'
import { css } from '@emotion/react'

interface OrderByPropsProps {
  orderBy: {
    recent: boolean
    commentCount: boolean
    recommend: boolean
  }
  setOrderBy: Dispatch<
    SetStateAction<{
      recent: boolean
      commentCount: boolean
      recommend: boolean
    }>
  >
}

export default function OrderByProps({
  orderBy,
  setOrderBy,
}: OrderByPropsProps) {
  const handleOrderBy = useCallback(
    (type: string) => {
      if (type === 'recent') {
        setOrderBy({
          recent: true,
          commentCount: false,
          recommend: false,
        })
      } else if (type === 'commentCount') {
        setOrderBy({
          recent: false,
          commentCount: true,
          recommend: false,
        })
      } else if (type === 'recommend') {
        setOrderBy({
          recent: false,
          commentCount: false,
          recommend: true,
        })
      }
    },
    [setOrderBy],
  )
  return (
    <Flex
      direction="row"
      justify="end"
      style={{
        width: '100%',
        gap: '10px',
        padding: '0 10px 0 10px',
        marginRight: '30px',
      }}
    >
      <Flex
        id="recent"
        style={{
          cursor: 'pointer',
          gap: '5px',
        }}
        onClick={() => {
          handleOrderBy('recent')
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            backgroundColor: `${orderBy.recent ? colors.blue980 : colors.gray200}`,
            borderRadius: '50%',
            marginTop: '5px',
          }}
        />
        <Text
          css={TextStyle}
          style={{
            color: `${orderBy.recent ? colors.blue980 : colors.gray800}`,
          }}
        >
          최신순
        </Text>
      </Flex>
      <Flex
        id="commentCount"
        style={{
          cursor: 'pointer',
          gap: '5px',
        }}
        onClick={() => {
          handleOrderBy('commentCount')
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            backgroundColor: `${orderBy.commentCount ? colors.blue980 : colors.gray200}`,
            borderRadius: '50%',
            marginTop: '5px',
          }}
        />
        <Text
          css={TextStyle}
          style={{
            color: `${orderBy.commentCount ? colors.blue980 : colors.gray800}`,
          }}
        >
          댓글순
        </Text>
      </Flex>
      <Flex
        id="recommend"
        style={{
          cursor: 'pointer',
          gap: '5px',
        }}
        onClick={() => {
          handleOrderBy('recommend')
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            backgroundColor: `${orderBy.recommend ? colors.blue980 : colors.gray200}`,
            borderRadius: '50%',
            marginTop: '5px',
          }}
        />
        <Text
          css={TextStyle}
          style={{
            color: `${orderBy.recommend ? colors.blue980 : colors.gray800}`,
          }}
        >
          추천순
        </Text>
      </Flex>
    </Flex>
  )
}

const TextStyle = css`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.gray800};
`
