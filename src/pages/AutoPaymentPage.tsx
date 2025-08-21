import React, { useState } from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import TextCard from "../components/common/TextCard";
import Alert from "../components/common/Alert";
import WarningIcon from "../assets/icons/WarningIcon";

const AutoPaymentPage: React.FC = () => {
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  // TODO: 실제 사용자 데이터로 교체
  const user = {
    name: "김가족",
    email: "family@example.com",
    profileImage: "/api/placeholder/80/80",
    subscriptionPlan: "월 구독",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
    price: "8,900원",
    delivery: "배송 완료",
    basicPayment: "신한카드",
    basicPaymentInfo: "4343 4342 2222 3444",
  };

  const test = () => {};

  const handleShowAlert = () => {
    setIsShowAlert((pre) => !pre);
  };

  /* TODO: 자동 결제 해지 함수 추가 */
  const handleCancelAutoPayment = () => {};

  return (
    <MainLayout>
      <Header title="자동 결제 관리" />
      <div className="p-4">
        <TextCard
          className="mt-3"
          items={[
            {
              label: "구독 상태",
              value: user.subscriptionStatus,
              valueColor: "text-[#018941]",
            },
            { label: "다음 결제일", value: user.nextPaymentDate },
            { label: "구독 시작일", value: user.subscriptionStartDate },
          ]}
        />

        {/* 자동 결제 해지 버튼 */}
        <Button
          type="button"
          size="medium"
          variant="dangerOutline"
          className="mt-4 w-full"
          onClick={handleShowAlert}
        >
          자동 결제 해지
        </Button>

        {isShowAlert && (
          <Alert
            icon={<WarningIcon className="w-10 h-10 text-red-600" />}
            message="정말 자동 결제를 해지하시겠어요?"
            confirmText="해지하기"
            confirmVariant="danger"
            onConfirm={handleCancelAutoPayment}
            confirmClassName="flex-1 ml-4"
            cancelText="취소"
            cancelVariant="secondaryOutline"
            cancelClassName="flex-1"
            onCancel={handleShowAlert}
          />
        )}

        <p className="text-xl font-bold mt-8">결제 수단 관리</p>
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm mt-4">
            <div className="flex items-center space-x-4 mb-4">
              <svg
                className="w-10 h-8 text-[#018941]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 64 40"
              >
                <rect
                  x="1"
                  y="1"
                  width="62"
                  height="38"
                  rx="6"
                  ry="6"
                  className="stroke-current"
                />
                <line x1="4" y1="8" x2="60" y2="8" className="stroke-current" />
                <rect
                  x="48"
                  y="24"
                  width="8"
                  height="8"
                  rx="1"
                  className="stroke-current"
                />
              </svg>

              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-600">
                  {user.basicPaymentInfo}
                </h2>
                <h2 className="text-sm font-semibold text-gray-400">
                  {user.basicPayment}
                </h2>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#018941] text-white shadow-sm font-medium rounded-2xl transition-all px-5 py-2.5 text-base">
                  <p>기본</p>
                </div>
                <Button variant="outline" size="small" onClick={test}>
                  편집
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          size="medium"
          variant="primary"
          className="mt-4 w-full"
        >
          새 결제수단 추가
        </Button>
      </div>
    </MainLayout>
  );
};

export default AutoPaymentPage;
