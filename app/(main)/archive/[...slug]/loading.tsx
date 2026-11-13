const ArchivePageLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Archive</h1>
            <p className="text-gray-500">Loading...</p>
            <div className="animate-pulse w-full h-4 bg-gray-200 rounded-full"></div>
        </div>
    )
}

export default ArchivePageLoading;