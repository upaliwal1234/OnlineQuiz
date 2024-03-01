import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { tokenCheck } from '../../helperToken';
import QuizResult from './QuizResult';
import { toast, ToastContainer } from 'react-toastify';
import { Server_Url } from '../../Server_URL';

function QuizDisplayPage() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const { quizId } = useParams();
    useEffect(() => {
        let response = tokenCheck();
        if (!response) {
            navigate('/Login')
        }
        else {
            navigate(`/QuizDisplay/${quizId}`)
            setUserId(response.id);
        }
    }, [])

    const [quiz, setQuiz] = useState('');
    const [quizData, setQuizData] = useState();
    const [selectedOption, setSelectedOption] = useState(5);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0); // Timer state in seconds
    const [quizQuestions, setquizQuestions] = useState({});
    const [totalQuestions, settotalQuestions] = useState(0);
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);


    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => {
                    if (timer <= 1) {
                        setShowResult(true);
                    }
                    if (prevTimer <= 0) {
                        setShowResult(true);
                        clearInterval(intervalId);
                        return 0;
                    } else {
                        return prevTimer - 1;
                    }
                });
            }, 1000);
        }

        // Cleanup function: clear the interval on unmount
        return () => clearInterval(intervalId);
    }, [timer]);


    const optionChar = ['A', 'B', 'C', 'D'];
    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };


    const updateScore = () => {
        if (optionChar[selectedOption] == quizData.answer) {
            setScore(score + 1);
        }
    }

    const getNextQuestion = () => {
        try {
            updateScore();
            const currQues = currentQuestion;
            if (currQues < totalQuestions - 1) {
                setSelectedOption(5);
                setQuizData(quizQuestions[currQues + 1]);
                setcurrentQuestion(currQues + 1);
            }
            else {
                setShowResult(true);
            }
        } catch (error) {
            console.error('Error during fetching next question:', error);
        }
    };

    const updateQuizResult = async () => {

        try {
            let ttlQues = quizQuestions.length;
            let correctQues = score;
            await axios.post(`${Server_Url}/Quiz/QuizResult/new`, {
                quizId,
                userId,
                ttlQues,
                correctQues
            });
            navigate('/');

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {

        const fetchQuizData = async () => {
            try {

                const response = await axios.get(`${Server_Url}/QuizDisplay/${quizId}`);
                setQuiz(response.data);
                if (response.data.questions.length == 0) {
                    navigate('/');
                }
                const quesIds = response.data.questions;
                settotalQuestions(response.data.questions.length)
                const response2 = await axios.post(`${Server_Url}/getQuestions`, {
                    quesIds
                })
                setquizQuestions(response2.data)

            } catch (error) {
                console.error('Error during fetching quiz data:', error);
            }
        };
        fetchQuizData();
    }, []);

    useEffect(() => {
        setQuizData(quizQuestions[0]);
        setcurrentQuestion(0);
        setTimer(quiz.time);

    }, [quizQuestions])

    return (
        <>
            <div className='min-h-screen'>
                {showResult ? (
                    <QuizResult score={score} totalQues={quizQuestions.length} saveResults={updateQuizResult} quizTitle={quiz.title} />
                ) : (

                    <>
                        <div className='text-center m-4 text-white bg-red-600 rounded-lg'>Timer :{timer == 0 || timer ? timer : " "} seconds</div>
                        <div action='' className='flex justify-center my-4'>
                            <div className='w-full max-w-screen-md h-full flex flex-col justify-center items-center gap-2 p-4'>

                                {quizData && (
                                    <div className='w-full border-2 rounded-lg bg-red-600 p-5'>
                                        <div className='w-full border rounded-md h-32 flex flex-col justify-center mb-4 text-center font-bold text-xl text-white'>
                                            <p>
                                                {quizData.desc}
                                            </p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            {quizData.options.map((option, index) => (
                                                <div className='flex items-center ' key={index} >

                                                    <button className={`w-full border rounded-md h-10 mb-4 text-center text-md text-white ${selectedOption == index ? "bg-red-700 border-none" : null
                                                        }  hover:bg-red-700 hover:border-none`}
                                                        onClick={() => handleOptionChange(index)}
                                                    >
                                                        {option}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='text-center'>
                                            <button
                                                type='submit'
                                                onClick={getNextQuestion}
                                                className='bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out'>
                                                Next
                                            </button>
                                        </div>
                                    </div>

                                )}

                            </div>
                        </div>
                    </>
                )}
            </div >
            <ToastContainer />
        </>
    );
}

export default QuizDisplayPage;