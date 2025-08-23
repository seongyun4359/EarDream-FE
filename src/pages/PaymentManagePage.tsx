import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import WarningIcon from "../assets/icons/WarningIcon";
import CardIcon from "../assets/icons/CardIcon";
import PaymentInfo from "../components/other/PaymentInfo";

const payments = [
  {
    id: 1,
    label: "신한카드",
    cardNumber: "**** - **** - **** - 1234",
    date: "08/29",
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

const PaymentManagePage: React.FC = () => {
  const payment = {
    card: "**** - **** - **** - 3444",
    date: "03/27",
    isBasicPayment: true,
  };

  const navigate = useNavigate();
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [isBasicPayment, setIsBasicPayment] = useState(payment.isBasicPayment);

  /* TODO: 사용자 정보 수정 후 저장하는 함수 수정 필요 */
  const handleSave = () => {
    navigate("/home");
  };

  /* TODO: 결제수단 삭제하는 로직 함수 추가 필요*/
  const handleDeletePayment = () => {};

  return (
    <MainLayout>
      <Header title="결제 수단 관리" />

      <PaymentInfo
        type="card"
        icon={<CardIcon className="w-20 text-[#018941] mt-4" />}
        label={payments[0].cardNumber}
        cardNumber={payments[0].cardNumber}
        date={payments[0].date}
      />

      {/* 기본 결제 수단 수정 */}
      <div className="p-4 flex flex-col space-y-10">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isBasicPayment}
            onChange={(e) => setIsBasicPayment(e.target.checked)}
            className="w-5 h-5 accent-[#018941]"
          />
          <p>기본 결제 수단으로 지정할래요</p>
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
            삭제하기
          </Button>
        </div>

        {isDeleteAlert && (
          <Alert
            icon={<WarningIcon className="w-10 h-10 text-red-600" />}
            message="정말 삭제하시겠어요?"
            confirmText="제외하기"
            confirmVariant="danger"
            onConfirm={handleDeletePayment}
            confirmClassName="flex-1 ml-4"
            cancelText="취소"
            cancelVariant="secondaryOutline"
            cancelClassName="flex-1"
            onCancel={() => setIsDeleteAlert(false)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default PaymentManagePage;
