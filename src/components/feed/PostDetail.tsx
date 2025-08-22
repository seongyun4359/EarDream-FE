import React from "react";
import type { Post } from "../../types/feed";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import type { CommentType } from "../../types/feed";

const comments: CommentType[] = [
  {
    author: "홍길동",
    authorImage: "",
    content: "역시 우리 가족이야",
    createdAt: "2025-08-21 12:30",
  },
  {
    author: "김철수",
    authorImage: "",
    content: "오랜만에 보니 좋네요",
    createdAt: "2025-08-21 13:15",
  },
  {
    author: "이영희",
    authorImage: "",
    content: "댓글",
    createdAt: "2025-08-21 10:10",
  },
];

interface PostCardProps {
  post: Post;
  onCommentSend?: (postId: string, message: string) => void;
}

const PostDetail: React.FC<PostCardProps> = ({ post, onCommentSend }) => {
  const handleCommentSend = (message: string) => {
    if (onCommentSend) {
      onCommentSend(post.id, message);
    }
  };
  return (
    <div className="bg-white p-4 relative">
      {/* 게시물 제목 */}
      <h3 className="font-medium text-gray-900 mb-3">{post.title}</h3>

      {/* 게시물 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-10 h-10 rounded-full bg-gray-200"
          />
          <div className="flex items-center">
            <p className="font-medium text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500 ml-3">{post.timeAgo}</p>
          </div>
        </div>
      </div>

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

      {/* 게시물 이미지 */}
      <div className="bg-gray-200 rounded-lg h-48 mb-3 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>

      {/* 게시물 내용 */}
      <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">
        {post.content}
      </p>

      <hr className="border-t border-gray-300 mb-4 w-full" />

      <div className="flex flex-col items-start">
        {/* 댓글 개수 */}
        <p className="text-gray-700 text-me font-semibold mb-4 whitespace-pre-line">
          댓글 {post.comments}개
        </p>

        {/* 댓글 목록 */}
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} className="mb-4" />
        ))}
      </div>

      {/* 댓글 입력 */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
        <CommentInput onSend={handleCommentSend} />
      </div>
    </div>
  );
};

export default PostDetail;
