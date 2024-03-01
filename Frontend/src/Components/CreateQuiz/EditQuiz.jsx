import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { Server_Url } from '../../Server_URL';

function EditQuiz() {

    const { quizCode } = useParams();
    const [quizData, setQuizData] = useState({})
    const [title, setTitle] = useState();
    const [time, setTime] = useState();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            let response = await axios.get(`${Server_Url}/Quiz/${quizCode}`);
            if (response.status == 200) {
                setQuizData(response.data[0]);
                setTitle(response.data[0].title);
                setTime(response.data[0].time);
            }
        } catch (error) {
            toast.error("Error in Fetching Data");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }

    const saveData = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.patch(`${Server_Url}/Quiz/${quizData._id}/edit`, {
                title,
                time
            });
            if (response.status == 200) {
                toast.success("Quiz edited successfully");
                navigate(`/CreateQuiz/${quizCode}/addQuestion`);
            }

        } catch (error) {
            toast.error("Error in saving data");
        }
    }
    return (
        <div className='min-h-screen my-5'>
            <form className="max-w-sm mx-auto" onSubmit={saveData}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Quiz Title</label>
                    <input type="text" id="title" name='title' defaultValue={quizData.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" onChange={(e) => handleTitleChange(e)} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 ">Time(in seconds)</label>
                    <input type="number" id="time" name='time' defaultValue={quizData.time} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" onChange={(e) => handleTimeChange(e)} required />
                </div>

                <button type="submit" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default EditQuiz