import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import type { Payment } from "../../stores/usePaymentStore";
// PaymentCard.tsx
interface PaymentCardProps {
  payment: Payment;
  icon: React.ReactNode;
  onClick?: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  icon,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleEditPayment = () => {
    navigate(`/mypage/auto-payment/manage/${payment.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm mt-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        {icon}

        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-600">
            {payment.cardNumber}
          </h2>
          <h2 className="text-sm font-semibold text-gray-400">
            {payment.label}
          </h2>
        </div>

        <div className="flex gap-4">
          {payment.isBasic && (
            <div className="bg-[#018941] text-white shadow-sm font-medium rounded-2xl transition-all px-5 py-2.5 text-base">
              기본
            </div>
          )}
          <Button variant="outline" size="small" onClick={handleEditPayment}>
            편집
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
