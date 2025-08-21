import React from "react";
import { useNavigate } from "react-router-dom";

const GettingStartedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-24 pb-28">
        <div className="mt-40">
          <div className="text-2xl font-extrabold leading-snug text-[#2c2c2c]">
            이제 <span className="text-[#018941]">가족</span>과의
            <br />
            소중한 추억을 기록해보세요
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-6 px-6 pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="w-full bg-[#018941] text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-[#016b31] transition-colors"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;
