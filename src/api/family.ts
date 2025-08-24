// JWT 인증 제거로 인해 import 불필요

export interface CreateFamilyRequest {
  familyName: string;
  familyProfileImageUrl?: string | null;
  userId: number | string;
  monthlyDeadline: number | string;
}

export interface CreateFamilyResponse {
  familyId: number;
  familyName: string;
  familyProfileImageUrl?: string;
  monthlyDeadline: number;
  inviteCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errorCode?: string;
  timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createFamily = async (
  request: CreateFamilyRequest
): Promise<ApiResponse<CreateFamilyResponse>> => {
  // 개발 환경에서는 프록시 사용, 프로덕션에서는 환경변수 사용
  const baseUrl = import.meta.env.DEV ? "" : API_BASE_URL;

  // JWT 인증 제거 (백엔드에서 토큰 인증을 제거했으므로)
  console.log("JWT 인증 제거됨 - Authorization 헤더 없이 요청");

  // 디버깅: 요청 데이터 로그
  console.log("API 요청 데이터:", request);
  console.log("API 요청 URL:", `${baseUrl}/api/v1/families`);
  console.log("요청 본문 JSON:", JSON.stringify(request));

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Authorization 헤더 제거 (백엔드에서 토큰 인증 제거됨)
  console.log("백엔드에서 토큰 인증을 제거했으므로 Authorization 헤더 없음");

  const response = await fetch(`${baseUrl}/api/v1/families`, {
    method: "POST",
    headers,
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    let errorMessage = "가족 생성에 실패했습니다.";

    try {
      const errorData = await response.json();
      console.log("서버 에러 응답:", errorData);
      errorMessage = errorData.message || errorMessage;
    } catch (jsonError) {
      console.log("JSON 파싱 실패:", jsonError);
      console.log("응답 상태:", response.status);
      console.log("응답 헤더:", response.headers);

      // JSON 파싱 실패 시 상태 코드로 에러 메시지 생성
      if (response.status === 500) {
        errorMessage =
          "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (response.status === 400) {
        errorMessage = "잘못된 요청입니다. 입력값을 확인해주세요.";
      } else if (response.status === 401) {
        errorMessage = "인증이 필요합니다.";
      } else if (response.status === 403) {
        errorMessage = "접근 권한이 없습니다.";
      } else if (response.status === 404) {
        errorMessage = "요청한 리소스를 찾을 수 없습니다.";
      }
    }

    throw new Error(errorMessage);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("서버 응답을 처리할 수 없습니다.");
  }

  return data;
};
