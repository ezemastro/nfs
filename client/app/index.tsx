import { Text } from 'react-native'
import Screen from '../components/Screen'
import { useContext } from 'react'
import { SessionContext } from '../contexts/session'
import { Link } from 'expo-router'
import { USER_TYPES } from '../constants/userTypes'

export default function Home () {
  const { session } = useContext(SessionContext)
  return (
    <Screen>
      { session === undefined && <Link href="/login">Login</Link> }
      { session !== undefined && <Text>{session.name} {session.last_name}</Text> }
      { session?.type === USER_TYPES.ADMIN && <Text>Admin</Text> }
      { session?.type === USER_TYPES.ORG_ADMIN && <Text>Admin de la organización</Text> }
      { session?.type === USER_TYPES.PRECEPTOR && <Text>Preceptor</Text> }
      { session?.type === USER_TYPES.PARENT && (
        <Link href="/authorization/new">Nueva autorizacion</Link>
      ) }
      { session?.type === USER_TYPES.CHILD && <Text>Estudiante</Text> }
    </Screen>
  )
}
