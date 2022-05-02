

export default function Message(props) {
  const { text, photoURL, uid } = props.messageData

  const messageClass = props.currentUid === uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img alt='userAvatar' src={photoURL || 'https://ui-avatars.com/api/?name=N+P'}/>
        <p>{text}</p>
      </div>
    </>
  )
}