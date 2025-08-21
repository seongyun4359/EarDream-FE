import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import FeedHeader from "../components/feed/FeedHeader";
import FeedTabs from "../components/feed/FeedTabs";
import FeedFilters from "../components/feed/FeedFilters";
import PostCard from "../components/feed/PostCard";
import Button from "../components/common/Button";
import type { Post } from "../types/feed";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("소식함");
  const [activeFilter, setActiveFilter] = useState("전체");

  // TODO: 실제 데이터로 교체
  const posts: Post[] = [
    {
      id: "1",
      author: "구성원",
      authorImage: "/api/placeholder/40/40",
      timeAgo: "2시간 전",
      title: "제목",
      content: "게시글 내용 2줄\n두 번째 줄입니다",
      likes: 5,
      comments: 3,
      isNew: true,
    },
    {
      id: "2",
      author: "구성원",
      authorImage: "/api/placeholder/40/40",
      timeAgo: "4시간 전",
      title: "제목",
      content: "게시글 내용 2줄\n두 번째 줄입니다",
      likes: 3,
      comments: 1,
      isNew: true,
    },
  ];

  const handleWriteNews = () => {
    navigate("/write-news");
  };

  const handleCommentSend = (postId: string, message: string) => {
    // TODO: 댓글 전송 로직 구현
    console.log("댓글 전송:", { postId, message });
  };

  return (
    <MainLayout>
      <FeedHeader groupName="가족 이름" />
      <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <FeedFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onWriteNews={handleWriteNews}
      />

      <div className="flex-1 bg-white relative">
        {/* 게시물 목록 */}
        <div className="space-y-4 px-4 pb-20">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onCommentSend={handleCommentSend}
            />
          ))}
        </div>

        {/* 플로팅 글쓰기 버튼 */}
        <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 w-full max-w-md px-2 z-50">
          <Button
            variant="primary"
            className="w-24 h-10 rounded-full shadow-lg flex items-center justify-center text-me"
            onClick={handleWriteNews}
          >
            + 글쓰기
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
