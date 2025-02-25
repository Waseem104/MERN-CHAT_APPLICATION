import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedImg, setSelectedImage] = useState(null);
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef();

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedImg) return;

    try {
      sendMessage({
        text: newMessage.trim(),
        image: selectedImg,
      });

      setNewMessage("");
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message ", error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSend = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please Select an image File");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
    };
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 bg-base-200/90 border-t border-base-300 backdrop-blur-md">
      {/* Image Preview */}
      {selectedImg && (
        <div className="mb-4 relative max-w-xs mx-auto">
          <div className="relative group rounded-lg overflow-hidden border-2 border-primary/20">
            <img
              src={selectedImg}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <button
              onClick={handleCancelImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-base-100/80 hover:bg-base-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-error" />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center space-x-3 max-w-4xl mx-auto">
        <button
          className="btn btn-circle btn-ghost hover:bg-primary/20 transition-colors duration-200"
          onClick={handleImageClick}
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageSend}
          ref={fileInputRef}
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="input input-bordered flex-1 bg-base-100/50 focus:bg-base-100 transition-all duration-300 focus:ring-2 ring-primary/50"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() && !selectedImg}
          className="btn btn-circle btn-primary hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
