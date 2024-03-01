/* eslint-disable react/prop-types */
// import React from 'react'

function QuizResult(props) {

    return (
        <div>
            <h1 className='text-center font-bold mt-5 text-4xl'>Quiz Title: {props.quizTitle}</h1>
            <div className='flex justify-center'>
                <div className="sm:w-9/12 md:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow my-24">
                    <div className='text-center font-bold mb-2 text-lg'>
                        <h5>Quiz Result</h5>
                    </div>
                    <div className="w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <tbody>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Total Questions
                                    </th>
                                    <td className="px-6 py-4">
                                        {props.totalQues}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Correct
                                    </th>
                                    <td className="px-6 py-4">
                                        {props.score}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Incorrect
                                    </th>
                                    <td className="px-6 py-4">
                                        {props.totalQues - props.score}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Accuracy
                                    </th>
                                    <td className="px-6 py-4">
                                        {((props.score / props.totalQues) * 100).toFixed(2)}%
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className='text-center'>

                        <button onClick={props.saveResults} className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-600">
                            Save Result
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuizResult