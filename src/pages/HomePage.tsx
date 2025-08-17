import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";

interface FamilyMember {
  id: string;
  name: string;
  profileImage: string;
  relationship: string;
  isOnline: boolean;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // TODO: 실제 데이터로 교체
  const familyMembers: FamilyMember[] = [
    {
      id: "1",
      name: "엄마",
      profileImage: "/api/placeholder/40/40",
      relationship: "어머니",
      isOnline: true,
    },
    {
      id: "2",
      name: "아빠",
      profileImage: "/api/placeholder/40/40",
      relationship: "아버지",
      isOnline: false,
    },
    {
      id: "3",
      name: "할머니",
      profileImage: "/api/placeholder/40/40",
      relationship: "할머니",
      isOnline: true,
    },
  ];

  const handleWriteNews = () => {
    navigate("/write-news");
  };

  const handleViewFeed = () => {
    // TODO: 피드 보기 페이지로 이동 (가족 ID 필요)
    console.log("피드 보기");
  };

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText("FAMILY123");
    // TODO: 복사 완료 토스트 메시지 표시
    console.log("초대 코드 복사됨: FAMILY123");
  };

  return (
    <MainLayout>
      <Header title="나의 가족" />

      <div className="p-4 space-y-6">
        {/* 가족 정보 요약 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            가족 정보
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">구독 상태</p>
              <p className="text-[#018941] font-medium">정상 구독 중</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">다음 결제일</p>
              <p className="text-gray-900 font-medium">2024년 2월 4일</p>
            </div>
          </div>
        </div>

        {/* 가족 구성원 목록 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            가족 구성원
          </h2>
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={member.profileImage}
                    alt={member.name}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      member.isOnline ? "bg-[#018941]" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주요 액션 버튼들 */}
        <div className="space-y-3">
          <button
            onClick={handleWriteNews}
            className="w-full bg-[#018941] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#017a3a] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>소식 작성하기</span>
          </button>

          <button
            onClick={handleViewFeed}
            className="w-full bg-white border-2 border-[#018941] text-[#018941] py-3 px-4 rounded-lg font-medium hover:bg-[#e6f4ed] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>피드 보기</span>
          </button>
        </div>

        {/* 초대 코드 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            가족 초대
          </h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">초대 코드</p>
              <p className="font-mono text-lg font-bold text-gray-900">
                FAMILY123
              </p>
            </div>
            <button
              onClick={handleCopyInviteCode}
              className="bg-[#018941] text-white px-4 py-2 rounded-lg hover:bg-[#017a3a] transition-colors duration-200"
            >
              복사
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
