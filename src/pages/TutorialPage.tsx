import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TutorialStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  description?: string;
}

const TutorialPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: "언제 어디서나 소식 공유",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "가족들은 디지털 아카이빙",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "부모님께 배송되는 한 권의 따뜻한 소식책자",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // 튜토리얼 완료 시 가족 설정 페이지로 이동
      navigate("/family-setup");
    }
  };

  const handleSkip = () => {
    // 건너뛰기 시 홈페이지로 이동
    navigate("/home");
  };

  const currentStepData = tutorialSteps.find((step) => step.id === currentStep);

  const renderTitle = () => {
    const baseClass = "text-2xl font-bold text-center leading-relaxed mb-8";
    if (currentStep === 1) {
      return (
        <h1 className={baseClass}>
          <span className="text-black">언제 어디서나</span>
          <span className="text-[#018941]">소식 공유</span>
        </h1>
      );
    }
    if (currentStep === 2) {
      return (
        <h1 className={baseClass}>
          <span className="text-black">가족들은 </span>
          <span className="text-[#018941]">디지털 아카이빙</span>
        </h1>
      );
    }
    return (
      <h1 className={baseClass}>
        <span className="text-black">부모님께 배송되는</span>
        <br />
        <span className="text-black">한 권의 </span>
        <span className="text-[#018941]">따뜻한 소식책자</span>
      </h1>
    );
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white relative min-h-screen flex flex-col">
        {/* 건너뛰기 버튼 */}
        <div className="flex justify-end p-6">
          <button
            onClick={handleSkip}
            className="text-[#018941] text-sm font-medium hover:text-[#016b31] transition-colors"
          >
            건너뛰기
          </button>
        </div>

        {/* 메인 콘텐츠: 중앙 정렬 */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {renderTitle()}

          {/* 아이콘 */}
          <div className="w-24 h-24 bg-[#018941]/10 rounded-2xl flex items-center justify-center">
            <div className="text-[#018941]">{currentStepData?.icon}</div>
          </div>
        </div>

        {/* 하단 고정 영역 */}
        <div className="px-6 pb-8">
          {/* 진행 상태 표시 */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {tutorialSteps.map((step) => (
              <div
                key={step.id}
                aria-hidden
                className={`transition-all duration-300 ease-out ${
                  step.id === currentStep
                    ? "w-12 h-3 bg-[#018941] rounded-full"
                    : "w-2.5 h-2.5 rounded-full bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* 다음/확인 버튼 */}
          <button
            onClick={handleNext}
            className="w-full bg-[#018941] text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-[#016b31] transition-colors"
          >
            {currentStep === 3 ? "확인" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
