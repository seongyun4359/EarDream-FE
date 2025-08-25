import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/common/Header";
// import type { Post } from "../types/feed";
import PostDetail from "../components/feed/PostDetail";
import { useUserStore } from "../stores/useUserStore";
import { usePostStore } from "../stores/usePostStore";
import { mapPostDataToPost } from "../utils/postUtil";
import { deletePost } from "../services/postsApi";

const NewsDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const { postId } = useParams<{ postId: string }>();

  const userId = useUserStore((state) => state.userId);
  const postsData = usePostStore((state) => state.posts);
  const posts = mapPostDataToPost(postsData);

  const post = posts.find((p) => p.id && p.id.toString() === postId);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  const handleCommentSend = (postId: number, message: string) => {
    // TODO: 댓글 전송 로직 구현
    console.log("댓글 전송:", { postId, message });
  };

  /* 게시글 삭제 함수 */
  const handleDeletePost = async () => {
    if (!postId) return;

    const postIdNumber = Number(postId);
    if (isNaN(postIdNumber)) return;

    const response = await deletePost(postIdNumber);

    if (response.success) {
      navigate("/home");
    } else {
      alert("게시글 삭제에 실패하였습니다. " + response.message);
    }
  };

  return (
    <MainLayout>
      <Header
        title="소식 상세"
        showBackButton
        onBackClick={() => navigate("/home")}
      />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 bg-white">
        {/* 게시물 목록 */}
        <div className="px-4 pb-24">
          <PostDetail
            post={post}
            isManager={
              userId && post.authorId ? userId === post.authorId : false
            }
            onCommentSend={handleCommentSend}
            onDeletePost={handleDeletePost}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsDetailPage;
