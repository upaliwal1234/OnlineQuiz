import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tokenCheck } from '../../helperToken';
import { Server_Url } from '../../Server_URL';

function JoinedQuizResult() {

    const navigate = useNavigate()
    const { quizCode } = useParams();
    const [quizResult, setQuizResult] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        let response = tokenCheck();
        if (!response) {
            navigate('/Login')
        }
        else {
            // navigate(`JoinedQuizes/results/${quizCode}`);
            const { id } = response;
            fetchQuizResults(id);
        }
    }, [])



    const fetchQuizResults = async (userId) => {
        try {
            let response = await axios.get(`${Server_Url}/QuizResult/${userId}/${quizCode}`);
            if (response.status == 200) {
                setQuizResult(response.data);
                setTitle(response.data[0].quizId.title);
            }
        } catch (error) {
            toast.error('Error in Fetching Quiz Results');
        }
    }


    return (
        <div className='min-h-screen bg-red-600'>
            <div className='pt-5'>
                <h1 className='text-center font-bold text-lg sm:text-2xl md:text-4xl text-gray-200'>{title} Results </h1>
            </div>
            <div>

                {quizResult.map((data, index) => {
                    return (
                        <div className='flex justify-center' key={index}>
                            <div className="sm:w-9/12 md:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow my-5">
                                <div className='text-center font-bold mb-2 text-lg'>
                                    <h5>Result {index + 1}</h5>
                                </div>
                                <div className="w-full">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <tbody>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    Total Questions
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.ttlQues}
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    Correct
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.correctQues}
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    Incorrect
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.ttlQues - data.correctQues}
                                                </td>
                                            </tr>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    Accuracy
                                                </th>
                                                <td className="px-6 py-4">
                                                    {((data.correctQues / data.ttlQues) * 100).toFixed(2)}%
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default JoinedQuizResult