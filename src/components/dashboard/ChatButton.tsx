
import { MessageCircle, X } from "lucide-react";

interface ChatButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatButton = ({ isOpen, toggleChat }: ChatButtonProps) => {
  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 p-4 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <MessageCircle className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export default ChatButton;
