function PageNotFound() {
    return (
        <div className="min-h-screen bg-red-600">
            <div className="py-44 flex flex-col items-center">
                <div className="text-gray-900 font-bold text-7xl">
                    404
                </div>

                <div className="font-bold text-gray-300 text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                    This page does not exist
                </div>

                <div className="text-white font-medium text-sm md:text-xl lg:text-2xl mt-8">
                    The page you are looking for could not be found.
                </div>
            </div>
        </div>
    )
}

export default PageNotFound