import React from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../types/feed";
import CommentInput from "./CommentInput";

interface PostCardProps {
  post: Post;
  onCommentSend?: (postId: string, message: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onCommentSend }) => {
  const navigate = useNavigate();
  const handleCommentSend = (message: string) => {
    if (onCommentSend) {
      onCommentSend(post.id.toString(), message);
    }
  };

  const handleCardClick = () => {
    navigate(`/home/news/detail/${post.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm"
      onClick={handleCardClick}
    >
      {/* 게시물 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {post.authorImage && post.authorImage.trim() !== "" && (
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
          )}
          <div className="flex items-center">
            <p className="font-medium text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500 ml-3">{post.timeAgo}</p>
          </div>
        </div>
        {post.isNew && (
          <span className="bg-[#018941] text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      {/* 게시물 제목 */}
      <h3 className="font-medium text-gray-900 mb-3">{post.title}</h3>

      {/* 게시물 이미지 */}
      <div className="bg-gray-200 rounded-lg h-70 mb-3 flex items-center justify-center overflow-hidden">
        {post.imageUrls ? (
          <img
            src={post.imageUrls[0]}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-12 h-12 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        )}
      </div>

      {/* 게시물 내용 */}
      <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">
        {post.content}
      </p>

      {/* 상호작용 */}
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <span>{post.comments}</span>
        </div>
      </div>

      {/* 댓글 입력 */}
      <CommentInput onSend={handleCommentSend} />
    </div>
  );
};

export default PostCard;
