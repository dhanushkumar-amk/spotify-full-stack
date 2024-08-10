import {useState, useContext} from 'react';
import {assets} from '../../assets/assets';
import {PlayerContext} from '../../context/PlayerContext';
import axios from 'axios';
import './Login.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cursor } from 'mongoose';

const Login = ({setShowLogin}) => {
  const {url, setToken} = useContext(PlayerContext);
  const [currState, setCurrState] = useState('Sign Up');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data, [name]: value}));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let new_url = url;
    if (currState === 'Login') {
      new_url += '/api/user/login';
    } else {
      new_url += '/api/user/register';
    }
    try {
      const response = await axios.post(new_url, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
        toast.success(
          currState === 'Login'
            ? 'Login successful!'
            : 'Registration successful!'
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred while processing your request.');
    }
  };

  return (
    <>
      {/* Overlay for login form */}
      <div className='login-overlay'>
        <form
          onSubmit={onLogin}
          className='login-popup-container'>
          <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img
              src={assets.cross_icon}
              alt='Close'
              className='cursor-pointer'
              onClick={() => setShowLogin(false)}
            />
          </div>
          <div className='login-popup-inputs'>
            {currState === 'Sign Up' && (
              <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                type='text'
                placeholder='Your name'
                required
              />
            )}
            <input
              name='email'
              onChange={onChangeHandler}
              value={data.email}
              type='email'
              placeholder='Your email'
              required
            />
            <input
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              type='password'
              placeholder='Password'
              required
            />
          </div>
          <button type='submit'>
            {currState === 'Login' ? 'Login' : 'Create account'}
          </button>
          <div className='login-popup-condition'>
            <input
              type='checkbox'
              name='terms'
              id='terms'
              required
              className='text-green-700'
            />
            <label htmlFor='terms'>
              By continuing, I agree to the <a href='/terms'>terms of use</a> &{' '}
              <a href='/privacy'>privacy policy</a>.
            </label>
          </div>
          {currState === 'Login' ? (
            <p>
              Create a new account?{' '}
              <span onClick={() => setCurrState('Sign Up')}
                className='cursor-pointer hover:text-green-700'
                
              >Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              
              <span onClick={() => setCurrState('Login')}  
              className='cursor-pointer hover:text-green-700'
              >Login here</span>
            </p>
          )}
        </form>
      </div>
    
    </>
  );
};

export default Login;
