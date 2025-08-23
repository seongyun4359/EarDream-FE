import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

interface PaymentCardProps {
  icon: React.ReactNode;
  label: string;
  cardNumber?: string;
  isBasic: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  icon,
  label,
  cardNumber,
  isBasic = false,
}) => {
  const navigate = useNavigate();

  /* TODO: 결제수단 관리 페이지로 이동 필요 */
  const handleEditPayment = () => {
    navigate("/mypage/auto-payment/manage");
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
      <div className="flex items-center space-x-4 mb-4">
        {icon}

        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-600">{cardNumber}</h2>
          <h2 className="text-sm font-semibold text-gray-400">{label}</h2>
        </div>

        <div className="flex gap-4">
          {isBasic && (
            <div className="bg-[#018941] text-white shadow-sm font-medium rounded-2xl transition-all px-5 py-2.5 text-base">
              <p>기본</p>
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
