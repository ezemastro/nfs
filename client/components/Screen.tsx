import { type ReactNode } from 'react'
import { ScrollView } from 'react-native'

interface Props {
  children: ReactNode
}

export default function Screen ({ children }: Props) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ff0', gap: 10 }}>
      {children}
    </ScrollView>
  )
}
