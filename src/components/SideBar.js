import { auth } from '../firebase'
import { useAuthState} from 'react-firebase-hooks/auth';
import { FaAddressCard, FaRegNewspaper } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SignIn from './SignIn';
import SignOut from './SignOut';

const SideBar = () => {
  const [user] = useAuthState(auth)

  return (
    <div className="fixed top-0 left-0 h-screen w-16
      flex flex-col
      bg-primary text-secondary">
      
      <Link to='/'>
        <SideBarIcon icon={
          <img
            className='p-1' 
            src={`${process.env.PUBLIC_URL}/cat64.png`}
            alt="cat-logo"
            />
        } text={'home'}/>
      </Link>
      <Divider/>
      <Link to='/contact'>
        <SideBarIcon icon={<FaAddressCard size={25}/>} text={'contacts'}/>
      </Link>
      <Link to='/about'>
        <SideBarIcon icon={<FaRegNewspaper size={25}/>} text={'about'}/>
      </Link>
      <Divider/>
      <SideBarIcon icon={user? <SignOut/> : <SignIn/> } text={user ? 'sign out' : 'sign in'} />
    </div>
  )
}


    //   <header className=''>
    //     <Link to="/" className="">
    //       <img src={`${process.env.PUBLIC_URL}/cat64.png`} alt="cat-logo" />
    //       Ps ps ps
    //     </Link>
    //     <nav className="">
    //       <Link to="/" className=''>Home</Link>
    //       <Link to="/contact">Contact</Link>
    //       <Link to="/about">About</Link>
    //       { user ? <SignOut/> : <SignIn/>}
    //     </nav>
    //   </header>

const SideBarIcon = ({icon, text = 'tooltip 💡'}) => (
  <div className='sidebar-icon group'>
    {icon}
    <span className='sidebar-tooltip group-hover:scale-100'>
      {text}
    </span>
  </div>
)

const Divider = () => (
  <hr className='border border-gray-200 rounded-full m-2'/>
)

export default SideBar