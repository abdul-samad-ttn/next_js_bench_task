const CommentsListSkeleton = () => {
    return (
      <ul className="list-disc list-outside pl-6 space-y-4" aria-busy="true" aria-label="Loading comments">
        {[1, 2, 3].map((i) => (
          <li key={i} className="border-b border-gray-200 pb-4">
            <div className="h-5 w-48 animate-pulse rounded bg-gray-300" />
            <div className="mt-2 h-3 w-56 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-3 w-28 animate-pulse rounded bg-gray-200" />
          </li>
        ))}
      </ul>
    );
  };
  
  export default CommentsListSkeleton;