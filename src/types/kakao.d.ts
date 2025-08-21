// 카카오 SDK 전역 타입 정의
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          scope?: string;
          success: (authObj: any) => void;
          fail: (err: any) => void;
        }) => void;
        authorize: (options: { redirectUri: string }) => void;
        logout: () => void;
        getAccessToken: () => string | null;
      };
      API: {
        request: (options: { url: string }) => Promise<any>;
      };
    };
  }
}

export {};
