import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { tokenCheck } from '../../helperToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Server_Url } from '../../Server_URL';

function JoinQuiz() {
  const { quizCode: code } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    let response = tokenCheck();
    if (!response) {
      navigate('/Login')
    }
    else {
      if (code) {
        navigate(`/JoinQuiz/${code}`);
      }
      else {
        navigate(`/JoinQuiz`);
      }
    }
  }, [])
  const [quizCode, setQuizCode] = useState('');

  const handleJoinQuiz = async () => {
    try {
      const response = await axios.get(`${Server_Url}/Quiz/${code || quizCode}`);
      if (response.status == 200) {
        let quizId = response.data[0]._id;
        navigate(`/QuizDisplay/${quizId}`)
      }
    } catch (error) {
      toast.error("Wrong Quiz Code, Quiz not found");
    }
  };
  return (
    <>
      <div className="bg-red-600 h-96 min-h-screen flex justify-center">
        <div className="container mx-auto py-12 my-40">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Join a Quiz</h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Enter Quiz Code"
              className="border border-gray-400 rounded-md py-2 px-4 mr-2"
              defaultValue={code == 'undefined' ? null : code}
              onChange={(e) => setQuizCode(e.target.value)}
            />
            <button
              className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              onClick={handleJoinQuiz}>
              Join Quiz
            </button>
          </div>

        </div>
      </div>
      <ToastContainer /> {/* Add this line to render the ToastContainer */}
    </>
  )
}

export default JoinQuiz