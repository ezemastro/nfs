import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Screen from '../../components/Screen'
import { getOrganizations } from '../../services/nfsApi'
import { useStatus } from '../../hooks/useStatus'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

export default function Organization () {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const { status, setStatus } = useStatus()
  const router = useRouter()

  useEffect(() => {
    setStatus('loading')
    getOrganizations()
      .then((res) => {
        setOrganizations(res.organizations)
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [setStatus])

  const handleSubmit = (organization: Organization) => () => {
    router.push({
      pathname: '/login/typeSelection',
      params: { organization: organization.id }
    })
  }

  return (
    <Screen>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'success' && organizations.map((organization) => (
        <Pressable key={organization.id} onPress={handleSubmit(organization)}
        style={{ ...styles.orgCont, backgroundColor: organization.color }}>
          <Image source={{ uri: organization.logo }} style={{ height: 100, width: 100 }}/>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.orgName, color: organization.theme === 'L' ? 'black' : 'white' }}>{organization.name}</Text>
          </View>
        </Pressable>
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  orgCont: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  orgName: {
    fontSize: 20,
    textAlign: 'center'
  }
})
