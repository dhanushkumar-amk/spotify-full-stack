import React, {useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MdClose} from 'react-icons/md';

const LoginForm = ({setShowAuth, onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validCredentials = [
      {email: 'dhanushkumaramk@gmail.com', password: 'dhanushkumar'},
      {email: 'lokesh@gmail.com', password: 'lokesh'},
      {email: 'nirja@gmail.com', password: 'nirja'},
    ];

    const isValid = validCredentials.some(
      (cred) =>
        cred.email === formData.email && cred.password === formData.password
    );

    if (isValid) {
      const token = 'sample-token'; // Example token
      localStorage.setItem('token', token);
      onLogin(); // Notify parent component of successful login
      setShowAuth(false);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
      <div className='relative bg-white rounded-lg shadow-lg w-full max-w-sm p-6'>
        <button
          onClick={() => setShowAuth(false)}
          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'>
          <MdClose size={24} />
        </button>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col'>
          <input
            name='email'
            onChange={handleChange}
            value={formData.email}
            type='email'
            placeholder='Your email'
            required
            className='mb-4 p-2 border border-gray-300 rounded'
          />
          <input
            name='password'
            onChange={handleChange}
            value={formData.password}
            type='password'
            placeholder='Password'
            required
            className='mb-4 p-2 border border-gray-300 rounded'
          />
          <button
            type='submit'
            className='bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition'>
            Login
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-600'>Admin access only.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
