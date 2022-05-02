import { auth, firestore } from "../firebase";
import { collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useState, useRef } from "react";
import { useAuthState} from 'react-firebase-hooks/auth';
import Message from "./Message";

function ChatRoom() {

  const [user] = useAuthState(auth)

  const messagesRef = collection(firestore, 'messages');
  const [messages, loading, error] = useCollection(
    query(messagesRef, orderBy("createdAt"), limit(100)),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  const [formValue, setFormValue] = useState('')

  const scrollTo = useRef();

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

    scrollTo.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <div className="flex">

      <div style={{
        flexGrow: '3',
        backgroundColor: 'blue',
        backgroundImage: 'url(https://cdn-icons.flaticon.com/png/512/5522/premium/5522754.png?token=exp=1651514205~hmac=9548c9e44ceeb4d8d5ce277ad4eacb74)',
        minWidth: '550px',
        minHeight: '650px',
        marginRight: '40px',
        opacity: '0.5'
      }}>

      </div>
      <div>
        {user ?
          <p>Congrats, you're signed in and can write messages</p> :
          <p>* Sign in to write messages</p>
        }
        <hr/>
        <main className="chat">
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {messages &&
            messages.docs.map((messageDoc) =>
              <Message
                messageData={messageDoc.data()}
                messageDocId={messageDoc.id}
                currentUid={user ? user.uid : ''}
              />
            )
          }
          <span ref={scrollTo}></span>
        </main>
        {
          user &&
          <form className="chatBox" onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
            <button type="submit" disabled={!formValue}>🕊️</button>
          </form>
        }
      </div>
    </div>
  )
}

export default ChatRoom;