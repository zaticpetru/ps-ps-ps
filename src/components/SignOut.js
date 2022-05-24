import { auth } from "../firebase"
import { FaSignOutAlt } from 'react-icons/fa'

export default function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>
      <FaSignOutAlt size={25}/>
    </button>
  )
}