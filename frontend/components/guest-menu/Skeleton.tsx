export const Skeleton = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-premium-beige p-4 space-y-6">
      {/* Header Skeleton */}
      <div className="h-12 flex justify-between items-center mb-8">
        <div className="space-y-2">
          <div className="w-32 h-6 bg-gray-200 rounded-md animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse opacity-60" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-12 bg-gray-200 rounded-2xl animate-pulse" />

      {/* Category Tabs Skeleton */}
      <div className="flex space-x-3 overflow-hidden">
        <div className="w-20 h-8 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
        <div className="w-24 h-8 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
        <div className="w-20 h-8 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
        <div className="w-24 h-8 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
      </div>

      {/* Quick Filters Skeleton */}
      <div className="flex space-x-2 overflow-hidden">
        <div className="w-28 h-7 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
        <div className="w-20 h-7 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
        <div className="w-24 h-7 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
      </div>

      {/* Menu Items Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl w-full animate-pulse" />
        ))}
      </div>
    </div>
  );
};
