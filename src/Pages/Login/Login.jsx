import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loginimg from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        const user = { email };
        axios
          .post('http://localhost:3000/jwt', user, { withCredentials: true })
          .then((data) => {
            console.log(data.data);
            if (data.data.success) {
              navigate(location?.state ? `${location.state}` : '/');
            }
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col  lg:flex-row'>
          <div className='w-1/2 mx-12'>
            <img src={Loginimg} alt='' />
          </div>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleLogin}>
              <h1 className='text-4xl text-center font-bold'>Login</h1>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                  required
                  name='email'
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  placeholder='password'
                  className='input input-bordered'
                  name='password'
                  required
                />
                <label className='label'>
                  <a href='#' className='label-text-alt link link-hover'>
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Login</button>
              </div>
            </form>
            <p className='my-4 text-center'>
              New to Car Doctors
              <>&nbsp;</>
              <Link className='text-orange-600 font-bold' to='/signup'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
