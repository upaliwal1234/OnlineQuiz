import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Server_Url } from '../../Server_URL';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const submitData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${Server_Url}/login`,
        {
          email,
          password
        });
      if (response && response.data) {
        //get the token from the response
        const token = response.data.token;
        //parse that token 
        const decodedToken = parseJwt(token);

        const tokenString = JSON.stringify({
          id: decodedToken.id,
          email: decodedToken.email
        });
        if (tokenString) {
          //console.log("Decoded Token ",decodedToken)
          window.localStorage.setItem('myToken', tokenString)
          navigate('/');
          window.location.reload(false)
        }
      }
    }
    catch (error) {
      toast.error("Wrong Password");
      console.error('Error during signup:', error);
    }
  }
  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-2  mx-auto my-auto  md:h-screen lg:py-0">
          <div className="bg-red-600 w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white ">Your email</label>
                  <input type="email" name="email" id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white ">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                </div>
                <button type="submit"
                  onClick={submitData}
                  className="w-full text-white bg-primary-600 hover:bg-gray-50 hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 text-white">
                  Don’t have an account yet? <a href="/SignUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer /> {/* Add this line to render the ToastContainer */}
    </>
  )
}

export default Login