import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "../components/Skeletons/SidebarSkeleton";
import UserItem from "../components/UserItem";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { getUsers, isUsersLoading, selectedUser, setSelectedUser, users } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-base-200/95 backdrop-blur-sm border-r border-base-300">
      {/* Online Filter - Hidden on mobile */}
      <div className="hidden md:block p-4 border-b border-base-300">
        <div className="flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show Online Only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300">
        <div className="space-y-2 p-4">
          {filteredUsers.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              isSelected={selectedUser?._id === user._id}
              onlineUsers={onlineUsers}
              onClick={() => setSelectedUser(user)}
            />
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              {showOnlineOnly ? "No Online Users" : "No Users Found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
