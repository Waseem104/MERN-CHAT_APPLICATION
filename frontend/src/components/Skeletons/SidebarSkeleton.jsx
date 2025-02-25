const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);
  return (
    <aside className="p-4 bg-base-200 h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </div>
      {/* Skeleton Contacts */}
      <div className="space-y-4">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            {/* Avatar skeleton */}
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden md:block flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
