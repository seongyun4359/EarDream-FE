import React from "react";

const LoginPage: React.FC = () => {
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 구현
    console.log("카카오 로그인");
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white relative">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/login_background.svg')",
          }}
        />

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0" />

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 min-h-screen flex flex-col items-center px-4">
          {/* 중앙 로고 및 메인 텍스트 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* 로고 */}
            <div className="mb-6">
              <img
                src="/eardream.svg"
                alt="이어드림 로고"
                className="w-16 h-16 mx-auto"
              />
            </div>

            {/* 메인 텍스트 */}
            <div className="text-white space-y-2 text-center">
              <p className="text-sm opacity-90 font-gumi">
                가족의 순간을 담아내는 특별한 기록
              </p>
              <h1 className="text-4xl font-bold text-white font-gumi">
                이어드림
              </h1>
            </div>
          </div>

          {/* 하단 텍스트 및 카카오 버튼 */}
          <div className="w-full pb-20">
            {/* 하단 텍스트 */}
            <div className="text-white space-y-2 text-center mb-8">
              <p className="text-sm opacity-90">매달 가족의 소식을 모아</p>
              <p className="text-sm opacity-90">아름다운 책자로 만들어드려요</p>
            </div>

            {/* 카카오 로그인 버튼 */}
            <div className="w-full max-w-sm mx-auto px-4">
              <button
                onClick={handleKakaoLogin}
                className="w-full transition-transform duration-200 hover:scale-105"
              >
                <img
                  src="/kakao_button.svg"
                  alt="카카오로 시작하기"
                  className="w-full h-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
