import { collection, doc, addDoc, getDocs, deleteDoc} from 'firebase/firestore';
import { db } from '../components/config';

export const getUsers = async () => {
    return await getDocs(collection(db, 'users')) 
}

export const createUser = async (username: string, email: string) => {
    await addDoc(collection(db,'users'), {
      username: username,
      email: email
    })
  }

export const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, 'users', id))
  }