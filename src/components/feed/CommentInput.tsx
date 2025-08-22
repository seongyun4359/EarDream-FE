import React, { useState } from "react";
import ImageUploadButton from "../common/ImageUploadButton";

interface CommentInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder = "대화를 시작해보세요",
  onSend,
}) => {
  const [message, setMessage] = useState("");
  const [uploadImage, setUploadImage] = useState<string>("");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full bg-white rounded-full p-3 flex items-center">
      {/* 사진 업로드 버튼 */}
      <ImageUploadButton
        image={uploadImage}
        onChange={handleImageChange}
        size={48}
        isShowPreview={false}
      />

      <div className="ml-4 bg-white rounded-full w-full border border-[#018941] p-3 flex items-center justify-between">
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
    </div>
  );
};

export default CommentInput;
