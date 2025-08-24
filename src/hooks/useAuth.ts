import { useState, useEffect } from "react";
import type { KakaoUser } from "../types/auth";
import { logoutFromKakao } from "../services/kakaoAuth";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<KakaoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();

    // 로그인 상태 변경을 감지하기 위한 이벤트 리스너
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // 로컬 스토리지 변경 감지
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      console.log("useAuth - checkLoginStatus 시작");

      // JWT 토큰이 있는지 먼저 확인
      const jwtToken = localStorage.getItem("jwt_access_token");
      console.log("useAuth - JWT 토큰 확인:", !!jwtToken);

      if (jwtToken) {
        // JWT 토큰이 있으면 로그인 상태로 설정
        console.log("useAuth - JWT 토큰 존재, 로그인 상태로 설정");
        setIsLoggedIn(true);
        // 사용자 정보는 JWT에서 추출하거나 별도 API로 조회
        setUser({
          id: 1,
          connected_at: new Date().toISOString(),
          properties: {
            nickname: "사용자",
          },
          kakao_account: {
            profile: {
              nickname: "사용자",
            },
          },
        });
      } else {
        // JWT 토큰이 없으면 로그아웃 상태로 설정 (카카오 API 호출 안함)
        console.log("useAuth - JWT 토큰이 없어 로그아웃 상태로 설정");
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("useAuth - 로그인 상태 확인 오류:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutFromKakao();
    setUser(null);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    user,
    loading,
    checkLoginStatus,
    logout,
  };
};
