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
    <div className="max-w-sm border-2 border-gray-700 p-2 rounded-md">
      <div>
        <p>
          {user ? 'Congrats, you\'re signed in and can write messages' :
          '* Sign in to write messages'
          }
        </p>
        <hr className="my-1 border-1 border-primary rounded-full m-2"/>
        <main className="max-h-80 overflow-auto flex flex-col pr-2">
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {messages &&
            messages.docs.map((messageDoc) =>
              <Message
                key={messageDoc.id}
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
          <form className="flex items-center" onSubmit={sendMessage}>
            <input className="grow m-1 p-2 border border-slate-300 rounded-md text-sm shadow-sm"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="say something nice" />
            <button className="bg-primary h-8 w-8 rounded-xl cursor-pointer
                disabled:bg-gray-500
                disabled:opacity-30"
              type="submit"
              disabled={!formValue}>
              🕊️
            </button>
          </form>
        }
      </div>
    </div>
  )
}

export default ChatRoom;