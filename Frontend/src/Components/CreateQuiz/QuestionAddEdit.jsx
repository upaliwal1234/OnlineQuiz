/* eslint-disable react/prop-types */
function QuestionAddEdit(props) {

    return (
        <div className='min-h-screen my-5'>
            <form className="max-w-sm mx-auto" onSubmit={props.submitData}>
                <div className="mb-5">
                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <textarea type="text" id="desc" name='desc' defaultValue={props.desc} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full h-24 p-2.5" placeholder="Type question here..." required
                        onChange={props.handleDescChange} />
                </div>
                <div className="mb-5">
                    <label htmlFor="option1" className="block mb-2 text-sm font-medium text-gray-900 ">Option A</label>
                    <input type="text" id="option1" name='options' defaultValue={props.option[0]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" onChange={(e) => props.handleOptionChange(e, 0)} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="option1" className="block mb-2 text-sm font-medium text-gray-900 ">Option B</label>
                    <input type="text" id="option1" name='options' defaultValue={props.option[1]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" onChange={(e) => props.handleOptionChange(e, 1)} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="option1" className="block mb-2 text-sm font-medium text-gray-900 ">Option C</label>
                    <input type="text" id="option1" name='options' defaultValue={props.option[2]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" onChange={(e) => props.handleOptionChange(e, 2)} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="option1" className="block mb-2 text-sm font-medium text-gray-900 ">Option D</label>
                    <input type="text" id="option1" name='options' defaultValue={props.option[3]} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" onChange={(e) => props.handleOptionChange(e, 3)} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="answer" className="block mb-2 text-sm font-medium text-gray-900 ">Answer</label>
                    <input type="text" id="answer" name='answer' defaultValue={props.answer} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder='e.g. A' onChange={props.handleAnswerChange} required />
                </div>
                <button type="submit" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
            </form>
        </div>
    )
}

export default QuestionAddEdit