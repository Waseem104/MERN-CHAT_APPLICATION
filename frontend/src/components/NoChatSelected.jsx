import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl bg-base-200/50 backdrop-blur-sm max-w-md mx-auto transform transition-all duration-300 hover:scale-105">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transform transition-all duration-300 hover:rotate-12">
          <MessageSquare className="w-10 h-10 text-primary" />
        </div>
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-base-content/80 animate-fade-in">
            No Chat Selected
          </h3>
          <p className="text-base-content/60 max-w-sm animate-fade-in">
            Select a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
