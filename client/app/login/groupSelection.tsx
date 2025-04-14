import { useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import { useStatus } from '../../hooks/useStatus'
import { getGroups } from '../../services/nfsApi'
import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'

export default function GroupSelection () {
  const { status, setStatus } = useStatus()
  const [groups, setGroups] = useState<Group[]>([])
  const { organization, type } = useLocalSearchParams()

  useEffect(() => {
    if (typeof organization !== 'string') { router.push('/login'); return }
    setStatus('loading')
    getGroups({ organization })
      .then((res) => {
        setStatus('success')
        setGroups(res.groups)
      })
      .catch((err) => {
        console.log(err)
        setStatus('error')
      })
  }, [organization, setStatus])

  const handleSubmit = (group: Group) => () => {
    router.push({
      pathname: '/login/userSelection',
      params: { group: group.id, type, organization }
    })
  }
  return (
    <Screen>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'success' && groups.map((group) => (
        <Pressable key={group.id} style={styles.groupCont} onPress={handleSubmit(group)}>
          <Text>{group.name}</Text>
        </Pressable>
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  groupCont: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
    marginBottom: 10
  }
})
