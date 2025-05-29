export const SkeletonLoader = () => {
  const bgBase = true ? 'bg-gray-600' : 'bg-gray-100';
  const bgBlock = true ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div
      className={`animate-pulse mb-4 mx-3 p-4 rounded-lg shadow-sm opacity-40`}
    >
      <div className={`w-full h-60 rounded-lg ${bgBlock}`} />
      <div className={`mt-2 h-6 w-3/4 rounded ${bgBlock}`} />
      <div className={`mt-2 h-6 w-2/4 rounded ${bgBlock}`} />
      <div className={`mt-2 h-6 w-2/4 rounded ${bgBlock}`} />
    </div>
  );
};
