import { Stack } from 'expo-router'
import { View } from 'react-native'
import { SessionProvider } from '../contexts/session'

export default function Layout () {
  return (
    <SessionProvider>
      <View style={{ flex: 1 }}>
        <Stack />
      </View>
    </SessionProvider>
  )
}
