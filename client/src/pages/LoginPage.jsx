import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState('Sign up') // 'login' or 'sign up'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(currentState === 'Sign up' && !isDataSubmitted) {
      // Handle sign up logic here
      console.log('Sign up data:', { fullName, email, password });
      setIsDataSubmitted(true);
      return;
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} alt='logo' className='w-[min(30vw, 250px)]'/>

      {/* right - form */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currentState}
          {isDataSubmitted &&
            <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt='arrow' className='w-5 cursor-pointer  ' />    
          }
        </h2>
        {currentState === 'Sign up' && !isDataSubmitted && (
          <input
            type='text'
            placeholder='Full Name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type='email'
              placeholder='Email'
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

             <input
              type='password'
              placeholder='Password'
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )}  

        { currentState === 'Sign up' && isDataSubmitted && (
          <textarea
            rows='4'
            placeholder='Bio'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        )}
        <button
          type='submit'
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 cursor-pointer'
        >
          {currentState === 'Sign up' ? 'Create Account' : 'Login Now'}          
        </button>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input
            type='checkbox'
            className=''
          />
          <p>Agree to the terms & use of privacy policy.</p>  
        </div>
        <div className='flex flex-col gap-2'> 
          {currentState === 'Sign up' ? (
            <p className='text-sm text-gray-600'>Already have an account? 
              <span onClick={() => setCurrentState('Login')} 
                className='font-medium text-violet-500 cursor-pointer'>
                Login here
              </span>
            </p>
          ):(
            <p className='text-sm text-gray-600'>Create an account
             <span 
              onClick={() => setCurrentState('Sign up')}
              className='font-medium text-violet-500 cursor-pointer'>
                Click here
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage