import React, { useState } from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import TextCard from "../components/common/TextCard";
import Alert from "../components/common/Alert";
import WarningIcon from "../assets/icons/WarningIcon";
import CardIcon from "../assets/icons/CardIcon";
import PaymentCard from "../components/other/PaymentCard";
import { usePaymentStore } from "../stores/usePaymentStore";
import type { Payment } from "../stores/usePaymentStore";

const AutoPaymentPage: React.FC = () => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const payments = usePaymentStore((state) => state.payments);
  const [selectedPayment, setSelectedPayment] = useState<Payment>(payments[0]);

  const handleShowAlert = () => setIsShowAlert((prev) => !prev);

  /* TODO: 자동 결제 해지 함수 */
  const handleCancelAutoPayment = () => {};

  /* 카드 선택 시 selectedPayment 변경 */
  const handleSelectPayment = (id: number) => {
    const payment = payments.find((p) => p.id === id);
    if (payment) setSelectedPayment(payment);
  };

  // TODO: 실제 사용자 데이터로 교체
  const user = {
    name: "김가족",
    email: "family@example.com",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
  };

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
            key={payment.id}
            id={payment.id}
            icon={
              <CardIcon
                className="w-10 h-10"
                style={{ color: payment.iconColor }}
              />
            }
            label={payment.label}
            cardNumber={payment.cardNumber}
            onClick={() => handleSelectPayment(payment.id)}
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
