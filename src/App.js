import { Link, Outlet } from 'react-router-dom';

import SideBar from './components/SideBar';


function App() {


  return (
    <div>
      <SideBar />
      <div className='ml-16 flex flex-col justify-between min-h-screen'>
        <div className='ml-4 mt-4'>
          <Outlet />
        </div>
        <footer className='bg-primary text-white p-4 flex flex-col items-center'>
          <nav className='flex justify-around min-w-full my-3'>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </nav>
          <small>&copy;2022 <strong>Ps productions</strong>, All Rights Reserved</small>
          <small>Credits:&nbsp;
            <a 
              href="https://www.flaticon.com/free-icons/cat"
              title="cat icons"
              className='underline decoration-green-500 decoration-slice'
              >
              Cat icons by Freepik - Flaticon
            </a>
          </small>
      </footer>
      </div>
    </div>
  );
}

export default App;