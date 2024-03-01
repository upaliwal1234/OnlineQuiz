import React, { useEffect, useState } from 'react'
import QuestionAddEdit from './QuestionAddEdit'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Server_Url } from '../../Server_URL';

function QuestionEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { quizCode } = useParams();
    const [quesNum, setQuesNum] = useState();
    const [desc, setDesc] = useState()
    const [options, setOptions] = useState(['', '', '', ''])
    const [answer, setAnswer] = useState()

    const findQues = async () => {
        await axios.get(`${Server_Url}/Question/${id}`)
            .then((res) => {
                setQuesNum(res.data.quesNum);
                setDesc(res.data.desc);
                setOptions(res.data.options);
                setAnswer(res.data.answer);
            })
            .catch((error) => console.log('Error during fetching quiz data:', error))
    }
    useEffect(() => {
        findQues();
    }, []);


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

    const editData = async (event) => {

        event.preventDefault();
        try {
            const response = await axios.patch(`${Server_Url}/Question/${id}/edit`,
                {
                    desc,
                    quesNum,
                    options,
                    answer
                });
            if (response && response.data) {
                navigate(`/CreateQuiz/${quizCode}/addQuestion`)
            }
        }
        catch (error) {
            toast.error("Error in adding Question");
            console.error(error);
        }

    }
    return (
        <>
            <div className='my-5'>
                <h1 className='text-gray-800 font-bold text-3xl text-center'>Edit Question</h1>
            </div>
            <QuestionAddEdit option={options} desc={desc} answer={answer} submitData={editData} handleDescChange={handleDescChange} handleAnswerChange={handleAnswerChange}
                handleOptionChange={handleOptionChange}
            />
        </>
    )
}

export default QuestionEdit