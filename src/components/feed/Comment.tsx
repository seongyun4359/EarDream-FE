import React from "react";
import type { CommentType } from "../../types/feed";
import { timeAgo } from "../../utils/date";

interface CommentProps {
  comment: CommentType;
  className?: string;
}

const Comment: React.FC<CommentProps> = ({ comment, className }) => {
  return (
    <div className={`bg-white items-start ${className}`}>
      <div className="flex items-center space-x-3 mb-2">
        <img
          src={comment.authorImage}
          alt={comment.author}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
        <div className="flex items-center">
          <p className="font-medium text-gray-900">{comment.author}</p>
          <p className="text-sm text-gray-500 ml-4">
            {timeAgo(comment.createdAt)}
          </p>
        </div>
      </div>

      {/* 댓글 내용 */}
      <p className="text-sm text-gray-800 ml-13">{comment.content}</p>
    </div>
  );
};

export default Comment;
