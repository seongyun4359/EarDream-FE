import React from "react";

interface CommentInputProps {
  profileImage: string;
  placeholder?: string;
  onSend?: (message: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  profileImage,
  placeholder = "대화를 시작해보세요",
  onSend,
}) => {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-full border border-[#018941] p-3 flex items-center space-x-3">
      <img
        src={profileImage}
        alt="프로필"
        className="w-8 h-8 rounded-full bg-gray-200"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 bg-transparent rounded-full px-4 py-2 text-sm focus:outline-none"
      />
      <button onClick={handleSend} className="p-2">
        <svg
          className="w-5 h-5 text-[#018941]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
};

export default CommentInput;
