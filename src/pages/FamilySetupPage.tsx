import React from "react";
import { useNavigate } from "react-router-dom";

const FamilySetupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-20 pb-10">
        {/* 헤더 텍스트 */}
        <div className="mt-32 mb-6">
          <h1 className="text-3xl font-extrabold leading-snug text-[#2c2c2c]">
            곧 가족들과
            <br />
            만날 준비가 돼요
          </h1>
        </div>
        <p className="text-gray-500 mb-6 leading-relaxed">
          새로운 가족 그룹을 만들거나
          <br />
          기존 가족 그룹에 참여할 수 있어요
        </p>

        {/* 카드: 가족 만들기 */}
        <button
          type="button"
          onClick={() => navigate("/family/create")}
          className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 mb-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4 rounded-xl bg-[#018941]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-8 h-8 text-[#018941]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-[#1f2937]">
                가족 만들기
              </div>
              <div className="text-gray-500 text-sm mt-1">
                새로운 가족 그룹을 생성하고
                <br />
                가족 구성원을 초대해보세요
              </div>
            </div>
          </div>
        </button>

        {/* 카드: 가족 참여하기 */}
        <button
          type="button"
          onClick={() => navigate("/family/join")}
          className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-8 h-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M12 14a5 5 0 100-10 5 5 0 000 10z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-[#1f2937]">
                가족 참여하기
              </div>
              <div className="text-gray-500 text-sm mt-1">
                초대받은 가족 그룹에
                <br />
                참여해보세요
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FamilySetupPage;
