import React from 'react'
import { tokenCheck } from '../../helperToken';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizCard from './QuizCard';
import { Server_Url } from '../../Server_URL';

function CreatedQuizes() {

    const navigate = useNavigate()
    const [user, setUser] = useState();
    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        let response = tokenCheck();
        if (!response) {
            navigate('/Login')
        }
        else {
            navigate('/CreatedQuizes');
            const { id } = response;
            fetchCreatedQuizes(id);
        }
    }, [])


    const fetchCreatedQuizes = async (id) => {
        try {
            let response = await axios.get(`${Server_Url}/user/${id}/quizCreated`);
            if (response.status == 200) {
                setQuizes(response.data);
                setUser(id);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleJoinQuiz = (event, quizId) => {
        event.preventDefault();
        navigate(`/QuizDisplay/${quizId}`);
    }

    const handleEditQuiz = (event, quizCode) => {
        event.preventDefault();
        navigate(`/CreateQuiz/${quizCode}/addQuestion`)
    }

    return (
        <div className='min-h-screen bg-red-600'>
            <div className='p-4'>
                <h1 className='text-center text-4xl text-ggray-800 font-bold text-gray-200'>Quizes Created</h1>
            </div>

            <div className='flex flex-wrap gap-4 justify-center md:mt-10'>
                {quizes.map((dataObj, index) => {
                    return (
                        <QuizCard
                            key={index}
                            title={dataObj.title}
                            time={dataObj.time}
                            ttlQues={dataObj.questions.length}
                            quizCode={dataObj.quizCode}
                            quizId={dataObj._id}
                            section={'createdQuiz'}
                            joinQuiz={handleJoinQuiz}
                            editQuiz={handleEditQuiz}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default CreatedQuizes