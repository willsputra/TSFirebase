import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { collection, doc, addDoc, getDocs, deleteDoc} from 'firebase/firestore';
import { db } from './components/config';


export default function App() {
  
  interface User {
    id: string
    username: string
    email: string
  }

  const [users, setUsers] = useState<User[]>([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const getUsers = async () => {
    const data = await getDocs(collection(db, 'users'))
    data.forEach((doc) => {
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id} as User)))
    })
  }
  
  const createUser = async () => {
    await addDoc(collection(db,'users'), {
      username: username,
      email: email
    })

    getUsers()
  }

  const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, 'users', id))
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <View style={styles.container}>
      <TextInput value = {username} onChangeText={(username) => {setUsername(username)}} placeholder='Username' style={styles.textBoxes}></TextInput>
      <TextInput value = {email} onChangeText={(email) => {setEmail(email)}} placeholder='Email' style={styles.textBoxes}></TextInput>
      <TouchableOpacity onPress = {createUser} style={styles.button}><Text>Submit Data</Text></TouchableOpacity>
  
      {users.map((user) => {
        return (
          <View key = {user.id}>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress = {() => deleteUser(user.id)} style={styles.button}><Text>Delete</Text></TouchableOpacity>
          </View>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxes: {
    width: '90%',
    fontSize: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8
  },
  button: {
    padding: 16,
    backgroundColor: 'orange'
  }
});
