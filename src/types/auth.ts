// 카카오 사용자 정보 타입
export interface KakaoUser {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    email?: string;
    age_range?: string;
    birthday?: string;
    gender?: string;
  };
}

// 카카오 로그인 응답 타입
export interface KakaoLoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope?: string;
  refresh_token_expires_in: number;
}

// 로그인 상태 타입
export interface LoginState {
  isLoggedIn: boolean;
  user: KakaoUser | null;
  accessToken: string | null;
}
