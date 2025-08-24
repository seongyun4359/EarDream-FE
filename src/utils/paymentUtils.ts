import {
  PaymentCompleteRequest,
  SubscriptionExecuteRequest,
  BillingKeyRegisterRequest,
  SubscriptionSchedule,
} from "../types/payment";

// 결제 완료 요청 데이터 생성
export const createPaymentCompleteRequest = (
  impUid: string,
  merchantUid: string,
  familyId: string,
  status: string = "PENDING"
): PaymentCompleteRequest => {
  return {
    paymentId: `payment_${Date.now()}`,
    merchantUid,
    impUid,
    familyId,
    status,
  };
};

// 정기결제 실행 요청 데이터 생성
export const createSubscriptionExecuteRequest = (
  familyId: string,
  amount: number,
  orderName: string,
  customerUid: string
): SubscriptionExecuteRequest => {
  return {
    familyId,
    amount,
    orderName,
    customerUid,
  };
};

// 빌링키 등록 요청 데이터 생성
export const createBillingKeyRegisterRequest = (
  billingKey: string,
  customerUid: string,
  cardName: string,
  cardNumber: string,
  familyId: string
): BillingKeyRegisterRequest => {
  return {
    billingKey,
    customerUid,
    cardName,
    cardNumber,
    familyId,
  };
};

// 고객 UID 생성
export const generateCustomerUid = (familyId: string, week: string): string => {
  return `customer_${familyId}_${week}`;
};

// 구독 주기 텍스트 변환
export const getScheduleText = (schedule: SubscriptionSchedule): string => {
  const weekText = schedule.week === "2nd" ? "2째주" : "4째주";
  const dayText = schedule.day === "sunday" ? "일요일" : schedule.day;
  return `${weekText} ${dayText}`;
};

// 결제 금액 포맷팅
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR").format(amount);
};

// 결제 상태 텍스트 변환
export const getPaymentStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "처리중",
    PROCESSING: "진행중",
    SUCCESS: "성공",
    PAID: "결제완료",
    FAILED: "실패",
    CANCELLED: "취소됨",
  };
  return statusMap[status] || status;
};
