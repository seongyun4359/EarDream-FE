import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";

const FamilyInvitePage: React.FC = () => {
  const navigate = useNavigate();

  /* 가족 구성원 프로필 편집 */
  const handleEditProfile = () => {
    navigate("/member/edit");
  };

  /* 가족 구성원 초대 */
  const handleInviteFamily = () => {};

  return (
    <MainLayout>
      <Header title="가족 관리" />

      <div className="p-4 space-y-10">
        {/* 가족 초대 */}
        <p className="font-bold mt-4">가족 초대하기</p>

        <div className="bg-white rounded-lg p-4 shadow-sm mt-4 h-30 flex flex-col justify-center items-center">
          <p className="text-xl font-bold mb-4">가족 초대코드</p>
          <p className="text-2xl font-bold">A B C D E F</p>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            variant="primary"
            size="medium"
            onClick={handleEditProfile}
            className="flex-1"
          >
            초대코드 복사하기
          </Button>

          <Button
            variant="primary"
            size="medium"
            onClick={handleEditProfile}
            className="flex-1"
          >
            카톡으로 초대하기
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default FamilyInvitePage;
