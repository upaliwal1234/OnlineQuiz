/* eslint-disable react/prop-types */
// import React from 'react'

function QuizCard(props) {
    return (
        <>
            <div className="w-96 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <div href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.title}</h5>
                </div>
                <p className="mb-3 font-normal text-gray-700">Time: {props.time}</p>
                <p className="mb-3 font-normal text-gray-700">Total Questions: {props.ttlQues}</p>
                <p className="mb-3 font-normal text-gray-700">Quiz Code: {props.quizCode}</p>
                <div className='flex justify-between'>

                    <button onClick={(event) => props.joinQuiz(event, props.quizId)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                        Join Quiz
                    </button>
                    {props.section == 'createdQuiz' ? (

                        <button onClick={(event) => props.editQuiz(event, props.quizCode)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                            Edit Quiz
                        </button>
                    ) : (
                        <button onClick={(event) => props.viewQuizResult(event, props.quizCode)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                            View Results
                        </button>
                    )}
                </div>
            </div >

        </>
    )
}

export default QuizCard