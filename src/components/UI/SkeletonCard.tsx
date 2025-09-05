const SkeletonCard = () => (
  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      <div className="h-6 bg-gray-200 rounded-full w-14"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded-lg"></div>
  </div>
);

export default SkeletonCard;
