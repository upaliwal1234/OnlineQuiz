import React from 'react';
import { useEffect } from 'react';
import { tokenCheck } from '../../helperToken';
import { useNavigate } from 'react-router-dom';
const LogoutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let response = tokenCheck();
    if (!(response)) {
      navigate('/Login')
    }
    else {
      navigate('/LogOut')
    }
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('myToken');
    navigate('/Login')
    window.location.reload(false)
  }
  return (
    <div className="flex justify-center items-center m-28">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">You Want To Logout?</h1>
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
