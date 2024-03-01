import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import QuestionAddEdit from './QuestionAddEdit';
import { Server_Url } from '../../Server_URL';

function NewQuestion() {
    const navigate = useNavigate();
    const { quizCode } = useParams();
    const [quesNum, setQuesNum] = useState();
    const [desc, setDesc] = useState()
    const [options, setOptions] = useState(['', '', '', ''])
    const [answer, setAnswer] = useState()

    const findQuesNum = async () => {
        await axios.get(`${Server_Url}/Quiz/${quizCode}`)
            .then((res) => {
                // setQuizData(res.data[0]);
                setQuesNum((res.data[0].questions.length + 1))
            })
            .catch((error) => console.log('Error during fetching quiz data:', error))
    }
    useEffect(() => {
        findQuesNum();
    }, []);

    const submitData = async (event) => {

        event.preventDefault();
        try {
            const response = await axios.post(`${Server_Url}/Quiz/${quizCode}/question`,
                {
                    desc,
                    quesNum,
                    options,
                    answer
                });
            if (response && response.data) {
                // await addQuestion();
                navigate(`/CreateQuiz/${quizCode}/addQuestion`)
            }
        }
        catch (error) {
            toast.error("Error in adding Question");
            console.error(error);
        }

    }
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }
    const handleOptionChange = (event, index) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    }
    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    }

    return (
        <>
            <div className='my-5'>
                <h1 className='text-gray-800 font-bold text-3xl text-center'>Add New Question</h1>
            </div>
            <QuestionAddEdit
                option={options}
                submitData={submitData} handleDescChange={handleDescChange} handleAnswerChange={handleAnswerChange} handleOptionChange={handleOptionChange}
            />
            <ToastContainer />
        </>
    )
}

export default NewQuestion