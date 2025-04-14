import { Pressable, Text, TextInput } from 'react-native'
import Screen from '../../components/Screen'
import { useContext, useState } from 'react'
import { login } from '../../services/nfsApi'
import { router, useLocalSearchParams } from 'expo-router'
import { SessionContext } from '../../contexts/session'
import { useStatus } from '../../hooks/useStatus'

export default function Password () {
  const { setSession } = useContext(SessionContext)
  const { user } = useLocalSearchParams()
  const [password, setPassword] = useState('')
  const { setStatus } = useStatus()

  if (typeof user !== 'string') router.push('/login')

  const handleSubmit = () => {
    setStatus('loading')
    login({ user_id: user as string, password })
      .then((res) => {
        setStatus('success')
        setSession(res.user)
        router.push('/')
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <Screen>
      <TextInput spellCheck={false} value={password} onChangeText={setPassword}/>
      <Pressable onPress={handleSubmit}><Text>Enviar</Text></Pressable>
    </Screen>
  )
}
