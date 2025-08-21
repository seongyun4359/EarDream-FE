import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const MyInfoEditPage: React.FC = () => {
  const navigate = useNavigate();

  const user = {
    name: "김가족",
    email: "family@example.com",
    profileImage: "/api/placeholder/80/80",
    subscriptionPlan: "월 구독",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
    price: "8,900원",
  };

  /* TODO: 사용자 정보 변경 함수 수정 필요 */
  const [userInfo, setUserInfo] = useState<string>("");

  /* TODO: 사용자 정보 수정 후 저장하는 함수 수정 필요 */
  const handleSave = () => {
    navigate("/home");
  };

  return (
    <MainLayout>
      <Header title="내 정보 관리" />

      {/* 사용자 이미지 */}
      <div className="p-4 space-y-6 bg-white">
        <div className="flex items-center justify-center space-x-4 mb-4 p-4">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-24 h-24 rounded-full bg-gray-200"
          />
        </div>
      </div>

      {/* 이름 수정 */}
      <div className="p-4 flex flex-col space-y-10">
        <div>
          <p className="font-bold">이름</p>
          <Input
            value={user.name}
            placeholder={user.name}
            onChange={setUserInfo}
            className="mt-4"
          />
        </div>

        {/* 이메일 수정 */}
        <div>
          <p className="font-bold">이메일</p>
          <Input
            value={user.email}
            placeholder={user.email}
            onChange={setUserInfo}
            className="mt-4"
          />
        </div>

        <Button
          type="button"
          variant="primary"
          size="medium"
          onClick={handleSave}
          className="mt-30 w-full"
        >
          저장하기
        </Button>
      </div>
    </MainLayout>
  );
};

export default MyInfoEditPage;
