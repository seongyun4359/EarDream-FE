import React, { useState } from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import TextCard from "../components/common/TextCard";
import Alert from "../components/common/Alert";
import WarningIcon from "../assets/icons/WarningIcon";
import CardIcon from "../assets/icons/CardIcon";
import PaymentCard from "../components/other/PaymentCard";

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

  const payments = [
    {
      id: 1,
      label: "신한카드",
      cardNumber: "**** - **** - **** - 1234",
      isBasic: true,
      icon: <CardIcon className="w-10 h-10 text-[#018941]" />,
    },
    {
      id: 2,
      label: "국민카드",
      cardNumber: "**** - **** - **** - 5678",
      isBasic: false,
      icon: <CardIcon className="w-10 h-10 text-[#016b33]" />,
    },
    {
      id: 3,
      label: "카카오뱅크 카드",
      cardNumber: "**** - **** - **** - 9012",
      isBasic: false,
      icon: <CardIcon className="w-10 h-10 text-[#feca1b]" />,
    },
  ];

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
        {payments.map((payment) => (
          <PaymentCard
            key={payment.cardNumber}
            icon={payment.icon}
            label={payment.label}
            cardNumber={payment.cardNumber}
            isBasic={payment.isBasic}
          />
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

// <div className="flex items-center">
//               <span className="inline-flex items-center justify-center w-8 h-5 text-[11px] font-bold rounded bg-[#fee500] text-black mr-2">
//                 pay
//               </span>
//               <span className="font-medium">카카오페이</span>
//             </div>
