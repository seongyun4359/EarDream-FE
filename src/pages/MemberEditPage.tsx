import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Alert from "../components/common/Alert";

import WarningIcon from "../assets/icons/WarningIcon";

const MemberEditPage: React.FC = () => {
  const user = {
    name: "김가족",
    email: "family@example.com",
    profileImage: "/api/placeholder/80/80",
    subscriptionPlan: "월 구독",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
    price: "8,900원",
    isRecipient: true,
  };

  const navigate = useNavigate();
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isRecipientAlert, setIsRecipientAlert] = useState(false);
  const [isRecipient, setIsRecipient] = useState(user.isRecipient);

  /* TODO: 사용자 정보 타입 수정 필요 */
  const [userInfo, setUserInfo] = useState<string>("");

  /* TODO: 사용자 정보 수정 후 저장하는 함수 수정 필요 */
  const handleSave = () => {
    navigate("/home");
  };

  /* TODO: 사용자 삭제하는 로직 함수 추가 필요*/
  const handleDeleteMember = () => {
    if (isRecipient) {
      setIsRecipientAlert(true);
      setIsDeleteAlert(false);
    }
  };

  return (
    <MainLayout>
      <Header title="가족 관리" />

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

        {/* 관계 수정 */}
        <div>
          <p className="font-bold">관계</p>
          <select
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
            className="mt-4 w-full border rounded-lg p-3 text-gray-500"
          >
            <option value="">관계를 선택해주세요</option>
            <option value="부모">부모</option>
            <option value="배우자">배우자</option>
            <option value="자녀">자녀</option>
            <option value="형제자매">형제/자매</option>
            <option value="할머니">할머니</option>
            <option value="할아버지">할아버지</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isRecipient}
            onChange={(e) => setIsRecipient(e.target.checked)}
            className="w-5 h-5 accent-[#018941]"
          />
          <p>책자 수령인으로 지정할래요</p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-4 mt-10">
          <Button
            type="button"
            variant="primary"
            size="medium"
            onClick={() => handleSave}
            className="flex-1"
          >
            저장하기
          </Button>

          <Button
            type="button"
            variant="dangerOutline"
            size="medium"
            onClick={() => setIsDeleteAlert(true)}
            className="flex-1"
          >
            목록에서 제외하기
          </Button>
        </div>

        {isDeleteAlert && (
          <Alert
            icon={<WarningIcon className="w-10 h-10 text-red-600" />}
            message="정말 가족 목록에서 제외 하시겠어요?"
            confirmText="제외하기"
            confirmVariant="danger"
            onConfirm={handleDeleteMember}
            confirmClassName="flex-1 ml-4"
            cancelText="취소"
            cancelVariant="secondaryOutline"
            cancelClassName="flex-1"
            onCancel={() => setIsDeleteAlert(false)}
          />
        )}

        {isRecipientAlert && (
          <Alert
            icon={<WarningIcon className="w-10 h-10 text-red-600" />}
            message="책자 수령인 상태에서는 제외할 수 없어요"
            confirmText="확인"
            confirmVariant="secondaryOutline"
            onConfirm={() => setIsRecipientAlert(false)}
            confirmClassName="flex-1 ml-4"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MemberEditPage;
