import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/common/Header";
import type { Post } from "../types/feed";
import PostDetail from "../components/feed/PostDetail";

const NewsDetailPage: React.FC = () => {
  // TODO: 실제 데이터로 교체
  const post: Post = {
    id: "1",
    author: "구성원",
    authorImage: "/api/placeholder/40/40",
    timeAgo: "2시간 전",
    title: "제목",
    content: "게시글 내용 2줄\n두 번째 줄입니다",
    likes: 5,
    comments: 3,
    isNew: true,
  };

  const handleCommentSend = (postId: string, message: string) => {
    // TODO: 댓글 전송 로직 구현
    console.log("댓글 전송:", { postId, message });
  };

  return (
    <MainLayout>
      <Header title="소식 상세" />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 bg-white">
        {/* 게시물 목록 */}
        <div className="px-4 pb-24">
          <PostDetail
            key={post.id}
            post={post}
            onCommentSend={handleCommentSend}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsDetailPage;
