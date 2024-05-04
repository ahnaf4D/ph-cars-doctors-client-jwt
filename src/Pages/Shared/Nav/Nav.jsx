import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.svg';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => alert('Success! You Sign out'))
      .catch((error) => {
        console.log(`${error}`);
      });
  };
  const menu = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link>About</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to='/bookings'>Bookings</Link>
          </li>
          <button onClick={handleLogout} className='btn btn-error'>
            Logout
          </button>
        </>
      )}
    </>
  );
  return (
    <div className='navbar bg-base-100 h-28'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            {menu}
          </ul>
        </div>
        <Link className=' text-xl' to='/'>
          <img src={Logo} alt='logo' />
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{menu}</ul>
      </div>
      <div className='navbar-end'>
        <Link to='/login' className='btn btn-error btn-outline'>
          Appointment
        </Link>
      </div>
    </div>
  );
};

export default Nav;