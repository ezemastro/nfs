import { Pressable, Text, View } from 'react-native'
import Screen from '../../components/Screen'
import { useContext } from 'react'
import { SessionContext } from '../../contexts/session'
import DropInput from '../../components/DropInput'

export default function New () {
  const { session } = useContext(SessionContext)
  return (
    <Screen>
      <Text>Nueva autorizacion</Text>
      <View>
        <View>
          <Text>Hijo</Text>
          <View>
            {session?.children?.map((child) => (
              <Pressable key={child.id}><Text>{child.name}</Text></Pressable>
            ))}
          </View>
        </View>
        <View>
          <Text>Tipo</Text>
          <View>
            <DropInput />
          </View>
        </View>
        <View>
          <Text>Fecha</Text>
          <View>
            <DropInput />
          </View>
        </View>
        <Pressable><Text>Guardar</Text></Pressable>
      </View>
    </Screen>
  )
}
