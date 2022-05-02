import './App.css'

import { auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState} from 'react-firebase-hooks/auth';

import GameRoom from './components/GameRoom'


function App() {

  const [user] = useAuthState(auth)

  return (
    <div className='App'>
      <header className='header'>
        <a href="#" class="logo">Ps ps ps</a>
        <div class="float-right">
          <a class="active" href="#">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          { user ? <SignOut/> : <SignIn/>}
        </div>
      </header>
      <GameRoom/>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    var provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;