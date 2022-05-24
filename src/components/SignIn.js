import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase';
import { FaSignInAlt } from 'react-icons/fa'

export default function SignIn() {
  const signInWithGoogle = () => {
    var provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
      <button className="sign-in" onClick={signInWithGoogle}>
        <FaSignInAlt size={25}/>
      </button>
  )
}