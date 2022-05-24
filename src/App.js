import './App.css'

import { auth } from './firebase'
import { useAuthState} from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className='App'>
      <header className='header'>
        <Link to="/" className="logo">
          <img src={`${process.env.PUBLIC_URL}/cat64.png`} alt="cat-logo" />
          Ps ps ps
        </Link>
        <nav className="float-right">
          <Link to="/" className='text-3xl font-bold underline'>Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          { user ? <SignOut/> : <SignIn/>}
        </nav>
      </header>

      <div className='content'>
        <Outlet/>
      </div>

      <footer className='flex column space-around'>
          <nav className="flex space-around">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </nav>
          <small>&copy;2022 <strong>Ps productions</strong>, All Rights Reserved</small>
          <small>Credits: <a href="https://www.flaticon.com/free-icons/cat" title="cat icons">Cat icons created by Freepik - Flaticon</a></small>
      </footer>
    </div>
  );
}

export default App;