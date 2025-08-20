import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  familyName?: string;
}

const FamilySubscribePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const familyName = state.familyName || "우리 가족";

  const handlePay = async () => {
    // TODO: 결제 연동 (PG사 선택 후 구현)
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-20 pb-28">
        <div className="mt-32">
          <h1 className="text-3xl font-extrabold leading-snug text-[#2c2c2c] mb-6">
            가족의 이야기를 이어가기 위해
            <br />
            구독을 완료해주세요
          </h1>
          <p className="text-gray-500">현재 선택된 그룹: {familyName}</p>
        </div>

        <div className="absolute left-0 right-0 bottom-6 px-6 pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={handlePay}
            className="w-full bg-[#018941] text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-[#016b31] transition-colors"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilySubscribePage;
