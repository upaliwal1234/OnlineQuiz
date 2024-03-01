import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { tokenCheck } from '../../helperToken';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LogOutBtn from './LogOutBtn';
import LogInBtn from './LogInBtn';

export default function Header() {

  const [loginStatus, setLoginStatus] = useState(true)

  useEffect(() => {
    let response = tokenCheck();
    if (!response) {
      setLoginStatus(false)
    }
    else {
      setLoginStatus(true)
    }
  }, [])

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="border-black-200 px-4 lg:px-6 bg-red-500 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center text-white">
            Quizify
          </Link>
          <div className="flex items-center lg:order-2">
            {loginStatus ? (<LogOutBtn />) : (<LogInBtn />)}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-black' : 'text-white'
                    } border-b border-gray-100  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  hover:text-black lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-black' : 'text-white'
                    } border-b border-gray-100  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  hover:text-black lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/CreateQuiz"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-black' : 'text-white'
                    } border-b border-gray-100  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  hover:text-black lg:p-0`
                  }
                >
                  Create Quiz
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/JoinQuiz"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-black' : 'text-white'
                    } border-b border-gray-100  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  hover:text-black lg:p-0`
                  }
                >
                  Join Quiz
                </NavLink>
              </li>
              {loginStatus ? (
                <li>
                  <NavLink
                    to="/UserProfile"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-black' : 'text-white'
                      } border-b border-gray-100  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  hover:text-black lg:p-0`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              ) : (<></>)}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
