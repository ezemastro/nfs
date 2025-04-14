import { Pressable, StyleSheet, Text } from 'react-native'
import Screen from '../../components/Screen'
import { USER_TYPES } from '../../constants/userTypes'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function TypeSelection () {
  const { organization } = useLocalSearchParams()
  const router = useRouter()
  const handleSubmit = (type: number) => () => {
    if (type === USER_TYPES.CHILD) {
      router.push({
        pathname: '/login/groupSelection',
        params: { type, organization }
      })
    } else {
      router.push({
        pathname: '/login/userSelection',
        params: { type, organization }
      })
    }
  }

  return (
    <Screen>
      <Pressable style={styles.typeCont} onPress={handleSubmit(USER_TYPES.ADMIN)}><Text>Admin</Text></Pressable>
      <Pressable style={styles.typeCont} onPress={handleSubmit(USER_TYPES.ORG_ADMIN)}><Text>Admin de la organización</Text></Pressable>
      <Pressable style={styles.typeCont} onPress={handleSubmit(USER_TYPES.PRECEPTOR)}><Text>Preceptor</Text></Pressable>
      <Pressable style={styles.typeCont} onPress={handleSubmit(USER_TYPES.PARENT)}><Text>Padre</Text></Pressable>
      <Pressable style={styles.typeCont} onPress={handleSubmit(USER_TYPES.CHILD)}><Text>Estudiante</Text></Pressable>
    </Screen>
  )
}

const styles = StyleSheet.create({
  typeCont: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
    marginBottom: 10
  }
})
