import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../types/feed";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import type { CommentType } from "../../types/feed";
import Button from "../common/Button";
import Alert from "../common/Alert";
import WarningIcon from "../../assets/icons/WarningIcon";
import PostImageSlider from "./PostImageSlider";

const comments: CommentType[] = [
  {
    author: "엄마",
    authorImage: "/images/family/mom.png",
    content: "오늘 사진 너무 예쁘다! 👍",
    createdAt: "2025-08-24 12:30",
  },
  {
    author: "아빠",
    authorImage: "/images/family/dad.png",
    content: "잘했다, 우리 가족 최고.",
    createdAt: "2025-08-24 13:15",
  },
  {
    author: "형",
    authorImage: "/images/family/brother.png",
    content: "ㅋㅋ 나도 같이 가고 싶었는데…",
    createdAt: "2025-08-24 14:05",
  },
  {
    author: "동생",
    authorImage: "/images/family/sister.png",
    content: "나 다음에 꼭 사진 찍자!",
    createdAt: "2025-08-24 14:30",
  },
  {
    author: "할머니",
    authorImage: "/images/family/grandma.png",
    content: "사진 보니 마음이 따뜻해지네...",
    createdAt: "2025-08-24 15:00",
  },
];

interface PostCardProps {
  post: Post;
  isManager?: boolean;
  onCommentSend?: (postId: number, message: string) => void;
  onDeletePost?: (postId: number) => void;
}

const PostDetail: React.FC<PostCardProps> = ({
  post,
  isManager = false,
  onCommentSend,
  onDeletePost,
}) => {
  const navigate = useNavigate();
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState<boolean>(false);

  const handleCommentSend = (message: string) => {
    if (onCommentSend) {
      onCommentSend(post.id, message);
    }
  };

  const handleDelete = () => {
    setIsShowDeleteAlert(false);
    onDeletePost?.(post.id);
  };

  const handleEdit = () => {
    navigate(`/home/news/edit/${post.id}`, { state: { post } });
  };

  return (
    <div className="bg-white p-4 relative">
      <div className="flex items-center justify-between mb-3">
        {/* 게시물 제목 */}
        <p className="text-lg font-medium text-gray-900 mb-3">{post.title}</p>

        {isManager && (
          <div className="flex justify-between gap-2">
            <Button
              variant="secondaryOutline"
              size="small"
              onClick={handleEdit}
            >
              편집
            </Button>

            <Button
              variant="dangerOutline"
              size="small"
              onClick={() => setIsShowDeleteAlert(true)}
            >
              삭제
            </Button>
          </div>
        )}
      </div>

      {/* 게시물 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          {post.authorImage && (
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
      </div>

      {/* 상호작용 */}
      <div className="flex items-center space-x-4 text-sm text-gray-500">
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
      <div className="mt-6">
        <PostImageSlider imageUrls={post.imageUrls || []} title={post.title} />
      </div>

      {/* 게시물 내용 */}
      <p className="text-gray-700 text-sm mt-8 mb-8 whitespace-pre-line">
        {post.content}
      </p>

      <hr className="border-t border-gray-300 mb-4 w-full" />

      <div className="flex flex-col items-start">
        {/* 댓글 개수 */}
        <p className="text-gray-700 text-me font-semibold mt-4 mb-6 whitespace-pre-line">
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

      {/* 게시글 삭제 (작성자만 가능) */}
      {isShowDeleteAlert && (
        <Alert
          icon={<WarningIcon className="w-10 h-10 text-red-600" />}
          message="정말 삭제하시겠어요?"
          confirmText="삭제하기"
          confirmVariant="danger"
          onConfirm={handleDelete}
          confirmClassName="flex-1 ml-4"
          cancelText="취소"
          cancelVariant="secondaryOutline"
          cancelClassName="flex-1"
          onCancel={() => setIsShowDeleteAlert(false)}
        />
      )}
    </div>
  );
};

export default PostDetail;
