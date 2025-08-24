// 백엔드 인증 API 타입 정의
export interface KakaoTokenRequest {
  code: string;
  state: string;
  redirectUri?: string;
}

export interface KakaoTokenResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user_info: {
      userId: number;
      kakaoId: string;
      name: string;
      phoneNumber: string;
      profileImageUrl: string;
      birthDate: string;
      address: string;
      createdAt: string;
      updatedAt: string;
    };
    is_new_user: boolean;
  };
  message: string;
  errorCode: string;
  timestamp: string;
}

export interface KakaoLoginUrlResponse {
  success: boolean;
  data: string; // 카카오 로그인 URL
  message: string;
  errorCode: string;
  timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 카카오 로그인 URL 가져오기
export const getKakaoLoginUrl = async (): Promise<string> => {
  const baseUrl = import.meta.env.DEV ? "" : API_BASE_URL;

  console.log("카카오 로그인 URL 요청:", `${baseUrl}/api/v1/auth/kakao`);

  const response = await fetch(`${baseUrl}/api/v1/auth/kakao`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("카카오 로그인 URL 응답 상태:", response.status);
  console.log("카카오 로그인 URL 응답 헤더:", response.headers);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("카카오 로그인 URL 오류 응답:", errorText);
    throw new Error(
      `카카오 로그인 URL을 가져올 수 없습니다. (${response.status})`
    );
  }

  const responseText = await response.text();
  console.log("카카오 로그인 URL 응답 텍스트:", responseText);

  try {
    const data: KakaoLoginUrlResponse = JSON.parse(responseText);
    return data.data;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    console.error("응답 텍스트:", responseText);
    throw new Error("카카오 로그인 URL 응답을 파싱할 수 없습니다.");
  }
};

// 카카오 인증코드로 JWT 토큰 발급받기
export const getJwtToken = async (
  code: string,
  state: string
): Promise<KakaoTokenResponse> => {
  const baseUrl = import.meta.env.DEV ? "" : API_BASE_URL;

  const request: KakaoTokenRequest = {
    code,
    state,
    redirectUri: `${window.location.origin}/login`,
  };

  console.log("JWT 토큰 요청:", request);
  console.log("JWT 토큰 요청 URL:", `${baseUrl}/api/v1/auth/kakao/token`);
  console.log("현재 origin:", window.location.origin);
  console.log("redirectUri:", `${window.location.origin}/login`);
  console.log("요청 헤더:", {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: window.location.origin,
  });
  console.log("요청 본문:", JSON.stringify(request));

  const response = await fetch(`${baseUrl}/api/v1/auth/kakao/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: window.location.origin,
    },
    body: JSON.stringify(request),
  });

  console.log("JWT 토큰 응답 상태:", response.status);
  console.log("JWT 토큰 응답 헤더:", response.headers);

  // 응답 본문도 확인
  const responseText = await response.text();
  console.log("응답 본문:", responseText);

  if (!response.ok) {
    let errorMessage = "JWT 토큰 발급에 실패했습니다.";
    try {
      const errorData = JSON.parse(responseText);
      errorMessage = errorData.message || errorMessage;
    } catch {
      // JSON 파싱 실패 시 응답 텍스트를 오류 메시지로 사용
      errorMessage = responseText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  let data: KakaoTokenResponse;
  try {
    data = JSON.parse(responseText);
  } catch (error) {
    console.error("응답 JSON 파싱 실패:", error);
    throw new Error("서버 응답을 파싱할 수 없습니다.");
  }

  // JWT 토큰을 로컬 스토리지에 저장
  localStorage.setItem("jwt_access_token", data.data.access_token);
  localStorage.setItem("jwt_refresh_token", data.data.refresh_token);
  localStorage.setItem("user_info", JSON.stringify(data.data.user_info));

  console.log("JWT 토큰 발급 성공:", data);

  return data;
};

// JWT 토큰 갱신
export const refreshJwtToken = async (): Promise<KakaoTokenResponse> => {
  const baseUrl = import.meta.env.DEV ? "" : API_BASE_URL;
  const refreshToken = localStorage.getItem("jwt_refresh_token");

  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  const response = await fetch(`${baseUrl}/api/v1/auth/kakao/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("JWT 토큰 갱신에 실패했습니다.");
  }

  const data: KakaoTokenResponse = await response.json();

  // 새로운 토큰을 로컬 스토리지에 저장
  localStorage.setItem("jwt_access_token", data.data.access_token);
  localStorage.setItem("jwt_refresh_token", data.data.refresh_token);

  return data;
};

// JWT 액세스 토큰 가져오기
export const getJwtAccessToken = (): string | null => {
  return localStorage.getItem("jwt_access_token");
};

// 로그아웃
export const logout = (): void => {
  localStorage.removeItem("jwt_access_token");
  localStorage.removeItem("jwt_refresh_token");
  localStorage.removeItem("user_info");
  localStorage.removeItem("kakao_access_token");
  localStorage.removeItem("kakao_refresh_token");
};
