import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import FeedHeader from "../components/feed/FeedHeader";
import FeedTabs from "../components/feed/FeedTabs";
import FeedFilters from "../components/feed/FeedFilters";
import PostCard from "../components/feed/PostCard";
import Button from "../components/common/Button";
import OpenBoxIcon from "../assets/icons/OpenBoxIcon";
import Alert from "../components/common/Alert";
import WarningIcon from "../assets/icons/WarningIcon";
import Album from "../components/other/Album";
import { getFamilyPosts, getPostDetails } from "../services/postsApi";
import type { PostData } from "../types/post";
import { useUserStore } from "../stores/useUserStore";
import { usePostStore } from "../stores/usePostStore";
import { mapPostDataToPost } from "../utils/postUtil";

const dumyAlbum = [
  {
    name: "보라카이 여행",
    coverImage: "https://placekitten.com/400/200",
    items: [
      { label: "게시글", value: "5" },
      { label: "작성자", value: "김가족" },
    ],
  },
  {
    name: "제주도 여행",
    images: [
      "https://placekitten.com/200/200",
      "https://placekitten.com/201/200",
      "https://placekitten.com/200/201",
      "https://placekitten.com/201/201",
    ],
    items: [
      { label: "게시글", value: "8" },
      { label: "작성자", value: "이가족" },
    ],
  },
  {
    name: "서울 여행",
    images: [],
    items: [
      { label: "게시글", value: "8" },
      { label: "작성자", value: "이가족" },
    ],
  },
  {
    name: "서울 나들이",
    images: [
      "https://placekitten.com/202/202",
      "https://placekitten.com/203/203",
    ],
    items: [
      { label: "게시글", value: "3" },
      { label: "작성자", value: "박가족" },
    ],
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("소식함");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);

  const familyId = useUserStore((state) => state.familyId);
  const postsData = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getFamilyPosts(familyId);
        console.log("가족 소식 API 응답:", res);

        const detailedPosts: PostData[] = (
          await Promise.all(
            res.data.map(async (postSummary: PostData) => {
              const detail = await getPostDetails(postSummary.id);
              return detail.data;
            })
          )
        ).flat();

        setPosts(detailedPosts);
        console.log("이것은 ", detailedPosts);
      } catch (error) {
        console.error("가족 소식 불러오기 실패", error);
      }
    };

    fetchPosts();
  }, [familyId]);

  const handleWriteNews = () => {
    navigate("/write-news");
  };

  const handleCommentSend = (postId: string, message: string) => {
    // TODO: 댓글 전송 로직 구현
    console.log("댓글 전송:", { postId, message });
  };

  /* TODO: 앨범 삭제 함수*/
  const handleDeleteAlbum = () => {};
  const posts = mapPostDataToPost(postsData);

  return (
    <MainLayout>
      <FeedHeader groupName="가족 이름" />
      <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 소식함 */}
      {activeTab === "소식함" && (
        <>
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
            <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 flex justify-end">
              <Button
                variant="primary"
                className="w-24 h-10 rounded-full shadow-lg flex items-center justify-center text-me"
                onClick={handleWriteNews}
              >
                + 글쓰기
              </Button>
            </div>
          </div>
        </>
      )}

      {/* 보관함 */}
      {activeTab === "보관함" && (
        <>
          <div className="flex justify-end mt-4 relative">
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/home/album/pick")}
            >
              앨범 추가하기
            </Button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-10">
                <ul>
                  {["앨범 정보", "앨범 편집", "삭제"].map((option) => (
                    <li
                      key={option}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        option === "삭제" ? "text-red-500 hover:bg-red-100" : ""
                      }`}
                      onClick={() => setIsDeleteAlert(true)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 더미 앨범 데이터 */}
          {dumyAlbum && (
            <div className="grid grid-cols-2 gap-4 mt-8 px-4">
              {dumyAlbum.map((album, idx) => (
                <Album
                  key={idx}
                  coverImage={album.coverImage}
                  albumName={album.name}
                  images={album.images}
                  onDelete={() => setIsDeleteAlert(true)}
                />
              ))}
            </div>
          )}

          {!dumyAlbum && (
            <div className="flex flex-col items-center justify-center mt-14 text-gray-400">
              <OpenBoxIcon className="w-30 h-30" />
              <p className="text-center mt-8">
                앗! <br />
                보관함이 비어있어요
              </p>
            </div>
          )}
        </>
      )}

      {/* 앨범 삭제 경고창 */}
      {isDeleteAlert && (
        <Alert
          icon={<WarningIcon className="w-10 h-10 text-red-600" />}
          message="정말 삭제하시겠어요?"
          confirmText="제외하기"
          confirmVariant="danger"
          onConfirm={handleDeleteAlbum}
          confirmClassName="flex-1 ml-4"
          cancelText="취소"
          cancelVariant="secondaryOutline"
          cancelClassName="flex-1"
          onCancel={() => setIsDeleteAlert(false)}
        />
      )}
    </MainLayout>
  );
};

export default HomePage;
