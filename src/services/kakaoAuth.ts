import type { KakaoUser } from "../types/auth";

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
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// 백엔드 API를 통한 카카오 로그인
export const loginWithKakao = async (): Promise<KakaoUser | null> => {
  try {
    if (typeof window === "undefined") {
      throw new Error("브라우저 환경이 아닙니다.");
    }

    // 1. 백엔드에서 카카오 로그인 URL 가져오기
    try {
      const response = await fetch("/api/v1/auth/kakao", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const loginUrl = data.loginUrl || data.url || data.authUrl;
        console.log("백엔드에서 받은 카카오 로그인 URL:", loginUrl);

        if (loginUrl) {
          // 백엔드 URL로 리다이렉트
          window.location.href = loginUrl;
          return null;
        }
      }
    } catch (backendError) {
      console.log(
        "백엔드 연결 실패, 프론트엔드에서 직접 처리합니다:",
        backendError
      );
    }

    // 2. 백엔드 연결 실패 시 프론트엔드에서 직접 처리
    const clientId = KAKAO_JS_KEY;
    const redirectUri = `${window.location.origin}/login`;
    const responseType = "code";
    const state = "kakao_login";

    const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&state=${state}`;

    console.log("프론트엔드 카카오 로그인 URL:", loginUrl);
    window.location.href = loginUrl;
    return null;
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

// JWT 토큰 갱신
export const refreshJWTToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem("jwt_refresh_token");
    if (!refreshToken) {
      console.log("리프레시 토큰이 없습니다.");
      return false;
    }

    const response = await fetch("/api/v1/auth/kakao/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("토큰 갱신 성공:", data);

      // 새로운 JWT 토큰 저장
      if (data.accessToken) {
        localStorage.setItem("jwt_access_token", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("jwt_refresh_token", data.refreshToken);
      }

      return true;
    } else {
      console.error("토큰 갱신 실패:", response.status);
      // 갱신 실패 시 모든 토큰 제거
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("jwt_refresh_token");
      return false;
    }
  } catch (error) {
    console.error("토큰 갱신 오류:", error);
    return false;
  }
};

// 백엔드 API를 통한 로그아웃
export const logoutFromKakao = async (): Promise<void> => {
  try {
    // 1. 백엔드 로그아웃 API 호출
    try {
      const jwtToken = localStorage.getItem("jwt_access_token");
      if (jwtToken) {
        await fetch("/api/v1/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log("백엔드 로그아웃 완료");
      }
    } catch (backendError) {
      console.log("백엔드 로그아웃 실패:", backendError);
    }

    // 2. 프론트엔드 로그아웃 처리
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Auth.logout();
    }

    // 3. 모든 토큰 제거
    localStorage.removeItem("kakao_access_token");
    localStorage.removeItem("kakao_refresh_token");
    localStorage.removeItem("jwt_access_token");
    localStorage.removeItem("jwt_refresh_token");

    console.log("로그아웃 완료");
  } catch (error) {
    console.error("로그아웃 오류:", error);
  }
};

// 백엔드 API를 통한 카카오 콜백 처리 및 JWT 토큰 교환
export const handleKakaoRedirect = async (): Promise<KakaoUser | null> => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code) {
      console.log("인가 코드 발견:", code);
      console.log("상태값:", state);

      // 1. 백엔드로 인가 코드 전송하여 JWT 토큰 받기
      try {
        const response = await fetch("/api/v1/auth/kakao/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            state: state,
            redirectUri: `${window.location.origin}/login`,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("백엔드 인증 응답:", data);

          // JWT 토큰 저장
          if (data.accessToken) {
            localStorage.setItem("jwt_access_token", data.accessToken);
          }
          if (data.refreshToken) {
            localStorage.setItem("jwt_refresh_token", data.refreshToken);
          }

          // 사용자 정보 반환
          if (data.user) {
            return data.user as KakaoUser;
          }
        } else {
          console.error(
            "백엔드 인증 실패:",
            response.status,
            await response.text()
          );
        }
      } catch (backendError) {
        console.error("백엔드 토큰 교환 실패:", backendError);
      }

      // 2. 백엔드 연결 실패 시 프론트엔드에서 직접 처리
      console.log("프론트엔드에서 직접 토큰 교환을 시도합니다.");

      // 카카오 SDK 초기화 확인
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        initKakao();
      }

      // 인가 코드로 토큰 교환 (프론트엔드 방식)
      return new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: async (authObj: {
            access_token: string;
            refresh_token: string;
          }) => {
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
          fail: (err: { error_description?: string }) => {
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

// JWT 토큰 기반 로그인 상태 확인
export const checkKakaoLoginStatus = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  // 1. JWT 토큰 우선 확인
  const jwtToken = localStorage.getItem("jwt_access_token");
  if (jwtToken) {
    console.log("checkKakaoLoginStatus - JWT 토큰 있음");
    return true;
  }

  // 2. 카카오 토큰 확인 (백엔드 연결 실패 시 대안)
  const kakaoToken = localStorage.getItem("kakao_access_token");
  if (kakaoToken) {
    console.log("checkKakaoLoginStatus - 카카오 토큰 있음");
    return true;
  }

  // 3. 카카오 SDK 토큰 확인
  try {
    if (window.Kakao && window.Kakao.Auth) {
      const sdkToken = window.Kakao.Auth.getAccessToken();
      if (sdkToken) {
        console.log("checkKakaoLoginStatus - 카카오 SDK 토큰 있음");
        return true;
      }
    }
  } catch (error) {
    console.log("checkKakaoLoginStatus - 카카오 SDK 오류:", error);
  }

  console.log("checkKakaoLoginStatus - 로그인되지 않음");
  return false;
};

// JWT 액세스 토큰 가져오기
export const getJWTAccessToken = (): string | null => {
  return localStorage.getItem("jwt_access_token");
};

// 카카오 액세스 토큰 가져오기
export const getKakaoAccessToken = (): string | null => {
  // 1. JWT 토큰 우선 반환
  const jwtToken = getJWTAccessToken();
  if (jwtToken) {
    return jwtToken;
  }

  // 2. 카카오 토큰 반환
  const kakaoToken = localStorage.getItem("kakao_access_token");
  if (kakaoToken) {
    return kakaoToken;
  }

  // 3. 카카오 SDK 토큰 반환
  if (typeof window !== "undefined" && window.Kakao && window.Kakao.Auth) {
    return window.Kakao.Auth.getAccessToken();
  }

  return null;
};
