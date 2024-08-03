import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'

import Text from './Text'
import Input from './Input'
import { Colors, colors } from '@/styles/colorPalette'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, style, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false)

    const labelColor = hasError
      ? `${colors.red}`
      : focused
        ? `${colors.blue100}`
        : undefined

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <div>
        {label ? (
          <Text
            typography="t6"
            color={labelColor as Colors}
            display="inline-block"
            style={{ marginBottom: 6, fontFamily: 'SUIT' }}
          >
            {label}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          style={{
            ...style,
            border: `1px solid ${hasError ? colors.red : colors.gray}`,
            borderRadius: 4,
            width: '100%',
            boxSizing: 'border-box',
          }}
        />

        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor as Colors}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
