import { useEffect, useState } from 'react'

function useDebounce<T = any>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce
