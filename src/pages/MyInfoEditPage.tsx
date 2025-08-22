import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ImageUploadButton from "../components/common/ImageUploadButton";

const MyInfoEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>("");

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

  const handleSave = () => {
    navigate("/mypage");
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const setUserInfo = (value: string) => {
    console.log(value);
  };

  return (
    <MainLayout>
      <Header title="내 정보 관리" />

      <div className="flex justify-center mt-8">
        <ImageUploadButton
          image={profileImage}
          onChange={handleImageChange}
          size={100}
          isShowPreview={true}
        />
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
