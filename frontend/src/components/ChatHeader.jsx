import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import defaultImage from "../assets/profile.jpg";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-4 bg-base-200/90 border-b border-base-300 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <img
            src={selectedUser?.profilePic || defaultImage}
            alt={selectedUser?.fullName}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full transform scale-100 group-hover:scale-110 transition-transform duration-200"></span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{selectedUser?.fullName}</h2>
          <p className="text-sm text-base-content/70 flex items-center gap-2">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
