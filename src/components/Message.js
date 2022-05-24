

export default function Message(props) {
  const { text, photoURL, uid } = props.messageData

  const owner = props.currentUid === uid

  return (
    <div className={`flex items-center my-2 object-right
      ${owner && 'flex-row-reverse'}`}>
      <img
        className="h-7 w-7 rounded-3xl"
        alt='userAvatar'
        src={photoURL || 'https://ui-avatars.com/api/?name=N+P'}
      />
      <p className={`py-1 px-2 mx-1 rounded-md
        ${owner ? 'bg-slate-200' : 'bg-slate-700 text-white'}
      `}>
        {text}
      </p>
    </div>
  )
}