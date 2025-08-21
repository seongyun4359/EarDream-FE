import type { KakaoUser, KakaoLoginResponse } from "../types/auth";

// 카카오 JavaScript 키 (환경 변수에서 가져오기)
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

// 카카오 초기화
export const initKakao = (): void => {
  if (typeof window !== "undefined" && window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      console.log("카카오 JavaScript 키:", KAKAO_JS_KEY);
      window.Kakao.init(KAKAO_JS_KEY);
      console.log("카카오 SDK 초기화 완료");
    }
  }
};

// 모바일 기기 감지
const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// 카카오 로그인 실행
export const loginWithKakao = async (): Promise<KakaoUser | null> => {
  try {
    if (typeof window === "undefined" || !window.Kakao) {
      throw new Error("카카오 SDK가 로드되지 않았습니다.");
    }

    // 모바일 환경에서는 리다이렉트 방식 사용
    if (isMobile()) {
      console.log("모바일 환경 감지 - 리다이렉트 방식으로 로그인");
      const redirectUri = `${window.location.origin}/login`;
      const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_JS_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
      window.location.href = authUrl;
      return null; // 리다이렉트되므로 null 반환
    }

    // 데스크톱 환경에서는 팝업 방식 사용
    return new Promise((resolve, reject) => {
      console.log("데스크톱 환경 - 팝업 방식으로 로그인");

      // 카카오 로그인 실행 (웹 전용 방식)
      window.Kakao.Auth.login({
        // scope 제거 - 기본 권한만으로 로그인
        success: async (authObj: KakaoLoginResponse) => {
          try {
            console.log("카카오 로그인 성공:", authObj);
            console.log("액세스 토큰:", authObj.access_token);
            console.log("토큰 타입:", authObj.token_type);

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("kakao_access_token", authObj.access_token);
            localStorage.setItem("kakao_refresh_token", authObj.refresh_token);
            console.log("토큰 저장 완료");

            // 즉시 사용자 정보 가져오기 시도
            try {
              console.log("사용자 정보 가져오기 시작...");
              const userInfo = await getKakaoUserInfo();
              if (userInfo) {
                console.log("사용자 정보 가져오기 성공:", userInfo);
                resolve(userInfo);
              } else {
                console.error("사용자 정보가 null입니다.");
                reject(new Error("사용자 정보를 가져올 수 없습니다."));
              }
            } catch (userError) {
              console.error("사용자 정보 가져오기 실패:", userError);
              reject(userError);
            }
          } catch (error) {
            console.error("로그인 성공 후 처리 중 오류:", error);
            reject(error);
          }
        },
        fail: (err: unknown) => {
          console.error("카카오 로그인 실패:", err);
          reject(new Error("카카오 로그인에 실패했습니다."));
        },
      });
    });
  } catch (error) {
    console.error("카카오 로그인 오류:", error);
    return null;
  }
};

// 카카오 사용자 정보 가져오기
export const getKakaoUserInfo = async (): Promise<KakaoUser | null> => {
  try {
    if (typeof window === "undefined" || !window.Kakao) {
      throw new Error("카카오 SDK가 로드되지 않았습니다.");
    }

    // 토큰 유효성 확인
    const accessToken = window.Kakao.Auth.getAccessToken();
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }

    console.log("사용자 정보 요청 - 액세스 토큰:", accessToken);
    console.log("카카오 SDK 초기화 상태:", window.Kakao.isInitialized());

    const response = await window.Kakao.API.request({
      url: "/v2/user/me",
    });

    console.log("사용자 정보 응답:", response);
    return response as KakaoUser;
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);

    // 401 오류인 경우 토큰 제거
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      error.status === 401
    ) {
      console.log("토큰이 만료되었습니다. 로그아웃 처리합니다.");
      logoutFromKakao();
    }

    return null;
  }
};

// 카카오 로그아웃
export const logoutFromKakao = (): void => {
  try {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Auth.logout();
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("kakao_access_token");
      localStorage.removeItem("kakao_refresh_token");
      console.log("카카오 로그아웃 완료");
    }
  } catch (error) {
    console.error("카카오 로그아웃 오류:", error);
  }
};

// 모바일 웹에서 리다이렉트 후 인가 코드 처리
export const handleKakaoRedirect = async (): Promise<KakaoUser | null> => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("인가 코드 발견:", code);

      // 인가 코드로 토큰 교환 (올바른 방법)
      return new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: async (authObj: any) => {
            try {
              console.log("토큰 교환 성공:", authObj);

              // 토큰을 로컬 스토리지에 저장
              localStorage.setItem("kakao_access_token", authObj.access_token);
              localStorage.setItem(
                "kakao_refresh_token",
                authObj.refresh_token
              );

              // 사용자 정보 가져오기
              const userInfo = await getKakaoUserInfo();
              resolve(userInfo);
            } catch (error) {
              console.error("사용자 정보 가져오기 실패:", error);
              reject(error);
            }
          },
          fail: (err: any) => {
            console.error("토큰 교환 실패:", err);
            reject(err);
          },
        });
      });
    }

    return null;
  } catch (error) {
    console.error("리다이렉트 처리 오류:", error);
    return null;
  }
};

// 로그인 상태 확인
export const checkKakaoLoginStatus = (): boolean => {
  if (typeof window === "undefined" || !window.Kakao) {
    return false;
  }

  const token = localStorage.getItem("kakao_access_token");
  return !!token && window.Kakao.Auth.getAccessToken() !== null;
};

// 액세스 토큰 가져오기
export const getKakaoAccessToken = (): string | null => {
  if (typeof window === "undefined" || !window.Kakao) {
    return null;
  }

  return window.Kakao.Auth.getAccessToken();
};
