const PostDetailSkeleton = () => {
  return (
    <div className="space-y-3 py-3" aria-busy="true" aria-label="Loading post">
      <div className="h-8 w-3/4 max-w-md animate-pulse rounded bg-gray-300" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-4 w-40 animate-pulse rounded bg-gray-200" />
    </div>
  );
};

export default PostDetailSkeleton;
