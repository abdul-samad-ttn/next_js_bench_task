const PostsDetailsPageLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Loading Posts Details...</h1>
            <p className="text-gray-500">Please wait while we load the posts details...</p>
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </div>
    )
}

export default PostsDetailsPageLoading;