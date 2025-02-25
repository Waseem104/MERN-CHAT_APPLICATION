import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import defaultImage from "../assets/avatar.webp";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessagesLoading,
    unSubscribeFromMessages,
    subscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unSubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-base-100/95 backdrop-blur-sm">
      <ChatHeader />

      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => {
            const isSender = message.senderId === authUser._id;
            return (
              <div
                key={message._id || idx}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full ring-1 ring-primary/10">
                    <img
                      alt={isSender ? "My avatar" : "Recipient avatar"}
                      src={
                        isSender
                          ? authUser.profilePic || defaultImage
                          : selectedUser.profilePic || defaultImage
                      }
                      className="object-cover"
                    />
                  </div>
                </div>
                <div
                  className={`chat-bubble ${
                    isSender ? "chat-bubble-primary" : "chat-bubble-secondary"
                  }`}
                >
                  {message.text}
                  {message.image && (
                    <div className="mt-2">
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="max-w-xs rounded-md"
                      />
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
