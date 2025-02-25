export default function MessageSkeleton() {
  const skeletonMessages = Array(4).fill(null);

  return (
    // Changed to match ChatContainer's message area
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-100/95">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`${
              idx % 2 === 0 ? "bg-base-200" : "bg-primary/10"
            } px-4 py-3 rounded-2xl max-w-[60%] space-y-2 shadow-sm`}
          >
            <div
              className={`h-4 rounded-full animate-pulse ${
                idx % 2 === 0 ? "bg-base-300" : "bg-primary/20"
              }`}
              style={{ width: "80%" }}
            />
            <div
              className={`h-4 rounded-full animate-pulse ${
                idx % 2 === 0 ? "bg-base-300" : "bg-primary/20"
              }`}
              style={{ width: "40%" }}
            />
            <div className="flex justify-end mt-1">
              <div
                className={`h-3 w-12 rounded-full ${
                  idx % 2 === 0 ? "bg-base-300" : "bg-primary/20"
                } animate-pulse`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
