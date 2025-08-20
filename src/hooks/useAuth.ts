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
  }, []);

  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      const isLoggedInStatus = checkKakaoLoginStatus();

      if (isLoggedInStatus) {
        const userInfo = await getKakaoUserInfo();
        setUser(userInfo);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("로그인 상태 확인 오류:", error);
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
