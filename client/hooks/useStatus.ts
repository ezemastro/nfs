import { useState } from 'react'

export const useStatus = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  return { status, setStatus }
}
