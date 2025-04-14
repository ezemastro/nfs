import { Pressable, Text, TextInput, View } from 'react-native'

export default function DropInput () {
  return (
    <View>
      <TextInput />
      <Pressable><Text>&gt;</Text></Pressable>
    </View>
  )
}
