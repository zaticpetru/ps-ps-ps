import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase';

export default function SignIn() {
  const signInWithGoogle = () => {
    var provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}