import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import { useFamilyStore } from "../stores/useFamilyStore";

const FamilyInvitePage: React.FC = () => {
  const inviteCode = useFamilyStore((state) => state.inviteCode);

  /* TODO: 카카오 초대하기 구현 필요 */
  const handleKaKao = () => {};

  /* 초대코드 복사하기 */
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      alert("초대코드가 복사되었습니다!");
    } catch (err) {
      console.error("복사 실패:", err);
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <MainLayout>
      <Header title="가족 관리" />

      <div className="p-4 space-y-10">
        {/* 가족 초대 */}
        <p className="font-bold mt-4">가족 초대하기</p>

        <div className="bg-white rounded-lg p-4 shadow-sm mt-4 h-30 flex flex-col justify-center items-center">
          <p className="text-xl font-bold mb-4">가족 초대코드</p>
          <p className="text-2xl font-bold">{inviteCode}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            variant="primary"
            size="medium"
            onClick={handleCopyCode}
            className="flex-1"
          >
            초대코드 복사하기
          </Button>

          <Button
            variant="primary"
            size="medium"
            onClick={handleKaKao}
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
