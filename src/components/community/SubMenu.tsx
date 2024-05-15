import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Dispatch, SetStateAction, useState } from 'react'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import { colors } from '@/styles/colorPalette'

interface SubmenuProps {
  tab: number
  clickedMenu: number
  setClickedMenu: Dispatch<SetStateAction<number>>
}

export default function Submenu({
  tab,
  clickedMenu,
  setClickedMenu,
}: SubmenuProps) {
  return tab === 0 ? (
    <Flex
      style={{
        flexDirection: 'row',
        gap: '5px',
        position: 'absolute',
        left: '80px',
        top: '60px',
      }}
    >
      <Flex
        css={SubmenuBox}
        style={{
          border:
            clickedMenu === 0
              ? `1px solid ${colors.blue980}`
              : `1px solid ${colors.gray200}`,
        }}
        onClick={() => setClickedMenu(0)}
      >
        <Text
          style={{
            color: clickedMenu === 0 ? colors.blue980 : colors.gray500,
          }}
        >
          블로그
        </Text>
      </Flex>
      <Flex
        css={SubmenuBox}
        style={{
          border:
            clickedMenu === 1
              ? `1px solid ${colors.blue980}`
              : `1px solid ${colors.gray200}`,
        }}
        onClick={() => setClickedMenu(1)}
      >
        <Text
          style={{
            color: clickedMenu === 1 ? colors.blue980 : colors.gray500,
          }}
        >
          뉴스
        </Text>
      </Flex>
    </Flex>
  ) : (
    <Flex
      style={{
        flexDirection: 'row',
        gap: '5px',
        position: 'absolute',
        left: '80px',
        top: '60px',
      }}
    >
      <Flex
        css={SubmenuBox}
        style={{
          border:
            clickedMenu === 2
              ? `1px solid ${colors.blue980}`
              : `1px solid ${colors.gray200}`,
        }}
        onClick={() => setClickedMenu(2)}
      >
        <Text
          style={{
            color: clickedMenu === 2 ? colors.blue980 : colors.gray500,
          }}
        >
          커뮤니티
        </Text>
      </Flex>
      <Flex
        css={SubmenuBox}
        style={{
          border:
            clickedMenu === 3
              ? `1px solid ${colors.blue980}`
              : `1px solid ${colors.gray200}`,
        }}
        onClick={() => setClickedMenu(3)}
      >
        <Text
          style={{
            color: clickedMenu === 3 ? colors.blue980 : colors.gray500,
          }}
        >
          공지사항
        </Text>
      </Flex>
    </Flex>
  )
}

const SubmenuBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-width: 100px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid ${colors.gray200};
  cursor: pointer;
`
