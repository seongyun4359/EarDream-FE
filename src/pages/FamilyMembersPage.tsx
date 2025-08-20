import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";

const FamilyMembersPage: React.FC = () => {
  const navigate = useNavigate();

  const family = {
    name: "김가족",
    email: "family@example.com",
    profileImage: "/api/placeholder/80/80",
    subscriptionPlan: "월 구독",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
    price: "8,900원",
  };

  /* 가족 구성원 프로필 편집 */
  const handleEditProfile = () => {
    navigate("/member/edit");
  };

  /* 가족 구성원 초대 */
  const handleInviteFamily = () => {
    navigate("/member/invite");
  };

  /* 가족 대기리스트 */
  const handleWaitList = () => {
    navigate("/member/waitList");
  };

  return (
    <MainLayout>
      <Header title="가족 관리" />

      <div className="p-4 space-y-10">
        {/* 가족 관리자 */}
        <p className="font-bold mt-4">가족 관리자</p>
        <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={family.profileImage}
              alt={family.name}
              className="w-16 h-16 rounded-full bg-gray-200"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {family.name}
              </h2>
              <p className="text-gray-600">{family.email}</p>
            </div>
          </div>
        </div>

        {/* 가족 구성원 */}
        <div className="flex items-center justify-between mt-10">
          <p className="font-bold">내 가족</p>
          <Button
            type="button"
            variant="text"
            size="medium"
            onClick={handleWaitList}
            className=""
          >
            대기리스트
          </Button>
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm mt-4">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={family.profileImage}
                alt={family.name}
                className="w-16 h-16 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {family.name}
                </h2>
              </div>

              <Button
                variant="outline"
                size="small"
                onClick={handleEditProfile}
              >
                편집
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-10">
          <Button
            type="button"
            variant="primary"
            size="medium"
            onClick={handleInviteFamily}
            className="w-full"
          >
            가족 초대하기
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default FamilyMembersPage;
