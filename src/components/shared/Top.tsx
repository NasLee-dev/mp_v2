import { css } from '@emotion/react'

import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title: string
  subTitle: string
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold={true} typography="t1">
        {title}
      </Text>
      <Text typography="t6">{subTitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`

export default Top
