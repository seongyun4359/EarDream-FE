import React from "react";

interface PaymentInfoProps {
  type: "card" | "kakaopay";
  icon: React.ReactNode;
  label?: string;
  cardNumber?: string;
  date?: string;
  kakaopayAccount?: string;
  isBasic?: boolean;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  type,
  icon,
  cardNumber,
  date,
  kakaopayAccount,
}) => {
  return (
    <div>
      <div className="space-y-6 bg-white flex justify-center p-4">{icon}</div>

      <div className="p-4 space-y-2">
        {type === "card" && (
          <>
            {cardNumber && (
              <>
                <p className="font-semibold">카드번호</p>
                <p className="text-gray-400">{cardNumber}</p>
              </>
            )}

            {date && (
              <>
                <p className="font-semibold mt-4">카드 유효 기간</p>
                <p className="text-gray-400">{date}</p>
              </>
            )}
          </>
        )}

        {type === "kakaopay" && kakaopayAccount && (
          <>
            <p className="font-semibold">카카오 계정</p>
            <p className="text-gray-400">{kakaopayAccount}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentInfo;
