import { auth, firestore } from "../firebase";
import { collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from "react";
import { useAuthState} from 'react-firebase-hooks/auth';


function GameRoom() {

  const [user] = useAuthState(auth)

  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(15))
  const [messages] = useCollectionData(q, { idField: 'id'})
  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser

    const docRef = await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });
    console.log("Document written with ID: ", docRef.id);
    setFormValue('');
  }

  console.log(messages)

  return (
    <>
      {user ? <h1>Congrats, you're signed in and can write messages</h1> : <h1>Sign in to write messages</h1>}
      <main>
        {messages && messages.map(msg => <p>{msg.text} {msg.id} <img alt={msg.photoURL} src={msg.photoURL} height="30px" width="30px"/></p>)}
      </main>
      {
        user &&
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
          <button type="submit" disabled={!formValue}>🕊️</button>
        </form>
      }
    </>
  )
}

export default GameRoom;