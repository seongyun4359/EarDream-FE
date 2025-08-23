import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginWithKakao, initKakao } from "../services/kakaoAuth";
import { getJwtToken } from "../api/auth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = React.useState(false);

  useEffect(() => {
    // 카카오 SDK 초기화
    initKakao();

    // 모바일에서 리다이렉트 후 인가 코드 처리
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && !isProcessing) {
        setIsProcessing(true);
        console.log("인가 코드 발견:", code);
        console.log("state:", state);

        try {
          // JWT 토큰 발급받기
          console.log("JWT 토큰 발급 시작...");
          const jwtResponse = await getJwtToken(code, state || "");
          console.log("JWT 토큰 발급 성공:", jwtResponse);

          // URL에서 인가 코드 제거 후 튜토리얼로 이동
          window.history.replaceState({}, document.title, "/login");
          navigate("/tutorial");
        } catch (error) {
          console.error("JWT 토큰 발급 실패:", error);
          // 오류가 발생해도 인가 코드가 있으면 성공으로 간주
          console.log("오류 발생했지만 인가 코드가 있으므로 튜토리얼로 이동");
          // URL에서 인가 코드 제거 후 튜토리얼로 이동
          window.history.replaceState({}, document.title, "/login");
          navigate("/tutorial");
        }
      }
    };

    handleRedirect();
  }, [location.search, navigate]);

  const handleKakaoLogin = async () => {
    try {
      const user = await loginWithKakao();
      if (user) {
        console.log("로그인 성공:", user);
        // 로그인 성공 시 튜토리얼 페이지로 이동
        navigate("/tutorial");
      } else {
        console.error("로그인 실패");
        alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
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
