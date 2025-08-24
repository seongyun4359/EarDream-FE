import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import WarningIcon from "../assets/icons/WarningIcon";
import CardIcon from "../assets/icons/CardIcon";
import PaymentInfo from "../components/other/PaymentInfo";
import { usePaymentStore } from "../stores/usePaymentStore";
import type { Payment } from "../stores/usePaymentStore";

const PaymentManagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const payments = usePaymentStore((state) => state.payments);
  const setPayments = usePaymentStore((state) => state.setPayments);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isBasicPayment, setIsBasicPayment] = useState(false);
  const navigate = useNavigate();
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);

  useEffect(() => {
    const payment = payments.find((p) => p.id === Number(id));
    if (payment) {
      setSelectedPayment(payment);
      setIsBasicPayment(payment.isBasic);
    }
  }, [id, payments]);

  if (!selectedPayment) return null;

  const handleSave = () => {
    const updatedPayments = payments.map((p) =>
      p.id === selectedPayment.id
        ? { ...p, isBasic: isBasicPayment }
        : { ...p, isBasic: false }
    );
    setPayments(updatedPayments);
    navigate("/home");
  };

  const handleDeletePayment = () => {
    const updatedPayments = payments.filter((p) => p.id !== selectedPayment.id);
    setPayments(updatedPayments);
    setIsDeleteAlert(false);
    navigate("/home");
  };

  return (
    <MainLayout>
      <Header title="결제 수단 관리" />

      <PaymentInfo
        type="card"
        icon={
          <CardIcon
            className="w-20 mt-4"
            style={{ color: selectedPayment.iconColor }}
          />
        }
        label={selectedPayment.label}
        cardNumber={selectedPayment.cardNumber}
        date={selectedPayment.date}
      />

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

        <div className="flex gap-4 mt-10">
          <Button
            type="button"
            variant="primary"
            size="medium"
            onClick={handleSave}
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
