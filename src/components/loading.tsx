const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 dark:border-blue-300"></div>
            <div className="text-blue-500 text-xl font-semibold animate-pulse dark:text-blue-300 mt-4">
                Loading...
            </div>
        </div>
    );
};

export default Spinner;
