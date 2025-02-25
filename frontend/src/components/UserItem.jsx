import { memo } from "react";
import defaultImage from "../assets/profile.jpg";

const UserItem = memo(({ user, isSelected, onlineUsers, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 
      ${
        isSelected
          ? "bg-primary text-primary-content shadow-soft"
          : "hover:bg-base-300 hover:translate-x-1"
      }`}
  >
    <div className="relative flex-shrink-0 group">
      <img
        src={user.profilePic || defaultImage}
        alt={user.fullName}
        className="w-12 h-12 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-base-content/20 group-hover:ring-primary transition-all duration-300"
      />
      {onlineUsers.includes(user._id) && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full animate-pulse" />
      )}
    </div>
    <div className="flex-1 min-w-0 ml-3 hidden md:block">
      <h3 className="font-semibold truncate">{user.fullName}</h3>
      <p className="text-sm opacity-70 truncate">
        {onlineUsers.includes(user._id) ? (
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
            <span>Online</span>
          </span>
        ) : (
          "Offline"
        )}
      </p>
    </div>
  </div>
));

UserItem.displayName = "UserItem";

export default UserItem;
