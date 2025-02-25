import { useChatStore } from "../store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - Adjust width for different screens */}
      <div className="w-20 md:w-[320px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Chat Container */}
      <div className={`flex-1 ${!selectedUser && "hidden md:block"}`}>
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
