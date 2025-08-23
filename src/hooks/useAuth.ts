import { useState, useEffect } from "react";
import type { KakaoUser } from "../types/auth";
import {
  checkKakaoLoginStatus,
  getKakaoUserInfo,
  logoutFromKakao,
} from "../services/kakaoAuth";

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

      const isLoggedInStatus = checkKakaoLoginStatus();
      console.log("useAuth - checkKakaoLoginStatus 결과:", isLoggedInStatus);

      if (isLoggedInStatus) {
        console.log("useAuth - 로그인 상태 확인됨, 사용자 정보 조회 중...");
        const userInfo = await getKakaoUserInfo();
        console.log("useAuth - 사용자 정보 조회 결과:", userInfo);

        if (userInfo) {
          setUser(userInfo);
          setIsLoggedIn(true);
          console.log("useAuth - 로그인 상태 설정 완료: true");
        } else {
          console.log("useAuth - 사용자 정보가 null, 로그아웃 상태로 설정");
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        console.log("useAuth - 로그인 상태가 아님, 로그아웃 상태로 설정");
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
