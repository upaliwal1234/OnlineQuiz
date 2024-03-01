import { NavLink } from 'react-router-dom'

function LogInBtn() {
    return (
        <>
            <NavLink
                className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'bg-gray-50' : 'text-white'
                    } text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`
                }
                to="/Login"
            >
                Log in
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'bg-gray-50' : 'text-white'
                    } text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`
                }
                to="/SignUp"
            >
                Sign Up
            </NavLink>
        </>
    )
}

export default LogInBtn