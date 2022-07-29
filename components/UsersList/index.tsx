import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getUsers, createUser, deleteUser } from '../../utils/users';
import { styles } from './styles'

export default function UsersList() {
  
  interface User {
    id: string
    username: string
    email: string
  }

  const [users, setUsers] = useState<User[]>([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const fetchUsers = async() => {
    const data = await getUsers()
    data.forEach((doc) => {
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id} as User)))
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <View style={styles.container}>
      <TextInput value = {username} onChangeText={(username) => {setUsername(username)}} placeholder='Username' style={styles.textBoxes}></TextInput>
      <TextInput value = {email} onChangeText={(email) => {setEmail(email)}} placeholder='Email' style={styles.textBoxes}></TextInput>
      <TouchableOpacity onPress = {() => {createUser(username, email), fetchUsers()}} style={styles.button}><Text>Submit Data</Text></TouchableOpacity>
  
      {users.map((user) => {
        return (
          <View key = {user.id}>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress = {() => {deleteUser(user.id), fetchUsers()}} style={styles.button}><Text>Delete</Text></TouchableOpacity>
          </View>
        )
      })}
    </View>
  );
}


