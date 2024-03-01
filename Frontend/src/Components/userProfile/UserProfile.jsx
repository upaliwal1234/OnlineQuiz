import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { tokenCheck } from '../../helperToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ProfileEdit from './ProfileEdit';
import { Server_Url } from '../../Server_URL';


function UserProfile() {
  const [User, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  // The useNavigate hook is part of the React Router library used for navigation in React applications that use routing.
  const navigate = useNavigate()
  useEffect(() => {
    let response = tokenCheck();
    if (!response) {
      navigate('/Login')
    }
    else {
      const { id } = response;
      navigate('/userProfile');
      setEdit(false)
      DisplayDetails(id);
    }
  }, [])

  const DisplayDetails = async (userId) => {
    try {
      const userData = await axios.get(`${Server_Url}/user/${userId}`);
      setUser(userData.data);
      setName(userData.data.name);
      setEmail(userData.data.email);
      setUserId(userId);
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`${Server_Url}/user/${userId}`, {
        name,
        email
      })
      if (response.status == 200) {
        setEdit(false);
        DisplayDetails(userId);
      }
      else {
        toast.error('Unable to Save Changes');
      }

    } catch (error) {
      console.error('Error: ', error);
    }
  }
  return (
    <>
      {edit ? (
        <ProfileEdit name={User.name} email={User.email} save={handleSave} handleNameChange={handleNameChange} handleEmailChange={handleEmailChange} />
      ) : (

        <div className="flex justify-center bg-red-600 min-h-screen">
          <div className='mt-12 w-4/5 sm:w-3/5'>
            <div className="bg-white overflow-hidden shadow rounded-lg border w-full">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {User.name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {User.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Password
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      ********
                    </dd>
                  </div>
                  <div></div>
                </dl>
              </div>
              <div className='text-right py-3 px-5'>
                <button onClick={() => setEdit(true)} className='bg-red-600 text-white hover:bg-red-300 font-bold py-2 px-8 rounded-md transition duration-300 ease-in-out' >Edit</button>
              </div>
            </div>

          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default UserProfile;
