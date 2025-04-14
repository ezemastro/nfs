import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Screen from '../../components/Screen'
import { useEffect, useState } from 'react'
import { getUsers } from '../../services/nfsApi'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useStatus } from '../../hooks/useStatus'

export default function UserSelection () {
  const { status, setStatus } = useStatus()
  const [users, setUsers] = useState<FlatUser[]>([])
  const { organization, type, group } = useLocalSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (typeof organization !== 'string' || typeof type !== 'string') {
      router.push('/login')
      return
    }
    setStatus('loading')
    getUsers({ organization, type, group: typeof group === 'string' ? group : undefined })
      .then((res) => {
        setStatus('success')
        setUsers(res.users)
      })
      .catch(() => { setStatus('error') })
  }, [organization, type, group, setStatus, router])

  const handleSubmit = (user: FlatUser) => () => {
    router.push({
      pathname: '/login/password',
      params: { user: user.id }
    })
  }

  return (
    <Screen>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'success' && users.map((user) => (
        <Pressable key={user.id} onPress={handleSubmit(user)} style={styles.userCont}>
          <Image
            source={user.image !== null ? { uri: user.image } : require('../../assets/images/avatar-placeholder.webp')}
            style={{ width: 100, height: 100 }}
          />
          <View>
            <Text>{user.name} {user.last_name}</Text>
          </View>
        </Pressable>
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  userCont: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  userInfo: {

  }
})
