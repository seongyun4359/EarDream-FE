// 결제 관련 타입 정의

// 포트원 결제 응답 타입
export interface PaymentResponse {
  success: boolean;
  error_code?: string;
  error_msg?: string;
  imp_uid?: string;
  merchant_uid: string;
  pay_method: string;
  paid_amount?: number;
  status: string;
  name: string;
  pg_provider: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  custom_data?: string;
  paid_at?: number;
  receipt_url?: string;
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string;
  vbank_date?: number;
}

// 포트원 IMP 타입
export interface IMP {
  init: (code: string) => void;
  request_pay: (
    params: Record<string, unknown>,
    callback: (response: PaymentResponse) => void
  ) => void;
}

// 백엔드 결제 완료 요청 타입
export interface PaymentCompleteRequest {
  paymentId: string;
  merchantUid: string;
  impUid: string;
  familyId: string | number; // 문자열 또는 숫자 허용
  status: string;
  type: "ONETIME" | "SUBSCRIPTION"; // 결제 타입 추가
}

// 정기결제 실행 요청 타입
export interface SubscriptionExecuteRequest {
  familyId: string;
  amount: number;
  orderName: string;
  customerUid: string;
}

// 빌링키 등록 요청 타입
export interface BillingKeyRegisterRequest {
  billingKey: string;
  customerUid: string;
  cardName: string;
  cardNumber: string;
  familyId: string;
}

// 구독 주기 설정 타입
export interface SubscriptionSchedule {
  week: "2nd" | "4th"; // 2째주, 4째주
  day: "sunday"; // 일요일
}
