import React from 'react'
import { tokenCheck } from '../../helperToken';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Server_Url } from '../../Server_URL';

function CreateQuiz() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState();

  useEffect(() => {
    let response = tokenCheck();
    if (!response) {
      navigate('/Login')
    }
    else {
      navigate('/CreateQuiz');
      setUserId(response.id);
    }
  }, [])

  const alphabetSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberSet = "0123456789";

  const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)]
  }

  const generateQuizCode = (code = "") => {
    code += getRandomData(alphabetSet);
    code += getRandomData(numberSet);
    if (code.length < 5) {
      return generateQuizCode(code)
    }
    return code;
  }
  const [title, setTitle] = useState('');
  const [time, setTime] = useState();
  const quizCode = generateQuizCode();

  const submitData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${Server_Url}/Quiz`,
        {
          title,
          time,
          quizCode,
          userId
        });
      if (response && response.data) {
        const createdQuizCode = response.data.quizCode;
        navigate(`/CreateQuiz/${createdQuizCode}/addQuestion`)
      }
    }
    catch (error) {
      toast.error("Please Enter Quiz Title & Time");
      console.error(error);
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  }


  return (
    <div className='min-h-screen bg-red-600'>
      {/* <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Your Quiz</h1>
        </div>
      </header> */}
      <div>
        <h1 className="text-3xl text-center font-bold tracking-tight text-white pt-5">Create Your Quiz</h1>
        <form className='mx-auto py-6 sm:px-6 lg:px-8 text-left flex justify-center'>
          <div className="w-4/5 md:w-3/5 lg:w-2/5 py-20 border border-black/30 rounded-lg p-4 flex flex-col gap-4 bg-white mt-5">
            <div>
              <label
                className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title"
              >
                Quiz Title
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter quiz title"
                id="title" required
                name='title'
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <label
                className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="time"
              >Time</label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                id="time"
                placeholder='Enter Time in Seconds'
                min={1} required
                name='time'
                onChange={handleTimeChange}
              />
            </div>
            <div className='flex justify-center'>
              <button onClick={submitData} type="submit" className="my-2 py-3 px-4 w-full items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Add Questions
              </button>
            </div>
          </div>
        </form>
      </div >
      <ToastContainer />
    </div >
  )
}

export default CreateQuiz