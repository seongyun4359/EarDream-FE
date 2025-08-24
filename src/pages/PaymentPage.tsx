import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  PaymentResponse,
  IMP,
  PaymentCompleteRequest,
  SubscriptionExecuteRequest,
  BillingKeyRegisterRequest,
  SubscriptionSchedule,
} from "../types/payment";
import SubscriptionScheduleModal from "../components/payment/SubscriptionScheduleModal.tsx";
// 사용하지 않는 import 제거 - 필요시 추가

interface LocationState {
  familyName?: string;
  familyId?: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const familyName = state.familyName || "우리 가족";

  // 디버깅: 전달받은 상태 로깅
  console.log("PaymentPage - 전달받은 상태:", state);
  console.log("PaymentPage - 가족 이름:", familyName);
  console.log("PaymentPage - 가족 ID:", state.familyId);

  const [method, setMethod] = useState<"kakaopay" | "card">("kakaopay");
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subscriptionSchedule, setSubscriptionSchedule] =
    useState<SubscriptionSchedule>({
      week: "2nd",
      day: "sunday",
    });
  // setSubscriptionSchedule은 SubscriptionScheduleModal에서 사용됨

  const handleScheduleChange = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleConfirm = () => {
    setShowScheduleModal(false);

    // 구독 주기 변경 후 정기결제 설정
    const customerUid = `customer_${state.familyId || "temp"}_${subscriptionSchedule.week}`;

    const subscriptionData = {
      familyId: state.familyId || "temp_family_id",
      schedule: subscriptionSchedule,
      amount: 3000, // 정기결제 금액
      orderName: `부모님께 이어드림 선물하기 - ${familyName}`,
      customerUid: customerUid,
    };

    console.log("구독 주기 변경:", subscriptionSchedule);
    console.log("정기결제 설정:", subscriptionData);

    // TODO: 백엔드 API 호출 시퀀스
    // 1. 구독 주기 변경 API
    // 2. 빌링키 등록 API (카드 정보 필요)
    // 3. 정기결제 설정 API

    // 예시: 빌링키 등록 요청 데이터
    const billingKeyRequest: BillingKeyRegisterRequest = {
      billingKey: "billing_key_example", // 포트원에서 발급된 빌링키
      customerUid: customerUid,
      cardName: "신한카드",
      cardNumber: "1234-****-****-5678", // 마스킹된 카드번호
      familyId: state.familyId || "temp_family_id",
    };

    // 예시: 정기결제 실행 요청 데이터
    const subscriptionExecuteRequest: SubscriptionExecuteRequest = {
      familyId: state.familyId || "temp_family_id",
      amount: 8900,
      orderName: `부모님께 이어드림 선물하기 - ${familyName}`,
      customerUid: customerUid,
    };

    console.log("빌링키 등록 요청:", billingKeyRequest);
    console.log("정기결제 실행 요청:", subscriptionExecuteRequest);
  };

  const handlePay = async () => {
    if (!agreePolicy) return;

    // 가족 ID 검증
    if (!state.familyId) {
      alert("가족 정보가 없습니다. 먼저 가족을 생성해주세요.");
      return;
    }

    // 개발환경에서는 모의 결제로 테스트
    if (process.env.NODE_ENV === "development") {
      console.log("개발환경: 모의 결제 진행");
      console.log("현재 가족 ID:", state.familyId);

      // 모의 결제 응답 데이터 (더 현실적인 데이터)
      const mockResponse: PaymentResponse = {
        success: true,
        imp_uid: `imp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        merchant_uid: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        pay_method: "kakaopay",
        status: "paid",
        name: `부모님께 이어드림 선물하기 - ${familyName}`,
        pg_provider: "kakaopay",
        paid_amount: 3000,
        buyer_email: "test@example.com",
        buyer_name: "구매자",
        buyer_tel: "010-1234-5678",
        custom_data: JSON.stringify({
          familyName: familyName,
          familyId: state.familyId,
        }),
        paid_at: Math.floor(Date.now() / 1000), // Unix timestamp 추가
        receipt_url: "https://example.com/receipt", // 영수증 URL 추가
      };

      // 백엔드에 결제 완료 정보 전송 (실제 가족 ID 사용)
      const paymentCompleteRequest: PaymentCompleteRequest = {
        paymentId: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        merchantUid: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        impUid: `imp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        familyId: String(state.familyId), // 가족 ID를 문자열로 변환
        status: "PENDING", // 백엔드 검증 규칙에 맞춤
        type: "ONETIME", // 결제 타입: 일회성 결제
      };

      console.log("=== 백엔드 결제 완료 요청 상세 정보 ===");
      console.log("백엔드 요청 데이터:", paymentCompleteRequest);
      console.log(
        "요청 본문 JSON:",
        JSON.stringify(paymentCompleteRequest, null, 2)
      );
      console.log("가족 ID 타입:", typeof state.familyId);
      console.log("가족 ID 값:", state.familyId);
      console.log("백엔드 요구사항:", "정확히 6개 필드 전송 (type 필드 추가)");
      console.log("백엔드 허용 상태값들:", [
        "PENDING",
        "APPROVED",
        "FAILED",
        "CANCELLED",
      ]);
      console.log("현재 사용 상태값:", "PENDING");
      console.log("=====================================");

      try {
        const apiUrl = "/api/v1/payments/complete";
        console.log("백엔드 API 요청 URL:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentCompleteRequest),
        });

        console.log("백엔드 응답 상태:", response.status);
        console.log("백엔드 응답 헤더:", response.headers);

        if (response.ok) {
          console.log("백엔드 결제 완료 처리 성공");
          alert("모의 결제가 완료되었습니다!");

          // 결제 완료 후 기본정보 입력 페이지로 이동
          navigate("/recipient", {
            state: {
              familyName,
              paymentData: mockResponse,
              merchantUid: mockResponse.merchant_uid,
              impUid: mockResponse.imp_uid,
            },
          });
        } else {
          console.error("백엔드 결제 완료 처리 실패:", response.status);

          // 백엔드 오류 응답 상세 확인
          response.text().then((errorText) => {
            console.error("백엔드 오류 상세:", errorText);
            alert(
              `모의 결제는 완료되었지만 서버 처리에 실패했습니다. (${response.status})`
            );
          });
        }
      } catch (error) {
        console.error("백엔드 결제 완료 처리 오류:", error);
        alert("모의 결제는 완료되었지만 서버 처리에 실패했습니다.");
      }
      return;
    }

    // 운영환경에서는 실제 포트원 결제 진행
    if (
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>).IMP
    ) {
      const IMP = (window as unknown as Record<string, unknown>).IMP as IMP;

      // IMP 초기화 (포트원 가맹점 식별코드)
      IMP.init("imp00000000"); // 테스트용: 실제 가맹점 코드로 변경 필요

      // 결제 요청
      IMP.request_pay(
        {
          pg: method === "kakaopay" ? "kakaopay" : "html5_inicis",
          pay_method: method === "kakaopay" ? "kakaopay" : "card",
          merchant_uid: `order_${Date.now()}`,
          name: `부모님께 이어드림 선물하기 - ${familyName}`,
          amount: 3000,
          buyer_email: "test@example.com",
          buyer_name: "구매자",
          buyer_tel: "010-1234-5678",
          digital: true,
          currency: "KRW",
          language: "ko",
          m_redirect_url: `${window.location.origin}/payment/result`,
          notice_url: `${window.location.origin}/api/v1/payments/webhook`,
          custom_data: {
            familyName: familyName,
            familyId: state.familyId || "temp_id",
          },
        },
        (rsp: PaymentResponse) => {
          if (rsp.success) {
            console.log("결제 성공:", rsp);

            const paymentCompleteRequest: PaymentCompleteRequest = {
              paymentId: `payment_${Date.now()}`,
              merchantUid: rsp.merchant_uid,
              impUid: rsp.imp_uid || "unknown_imp_uid",
              familyId: state.familyId || "temp_id",
              status: "COMPLETED",
              type: "ONETIME", // 결제 타입: 일회성 결제
            };

            fetch("/api/v1/payments/complete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentCompleteRequest),
            })
              .then((response) => {
                if (response.ok) {
                  console.log("백엔드 결제 완료 처리 성공");
                  alert("결제가 완료되었습니다!");

                  navigate("/recipient", {
                    state: {
                      familyName,
                      paymentData: rsp,
                      merchantUid: rsp.merchant_uid,
                      impUid: rsp.imp_uid,
                    },
                  });
                } else {
                  console.error("백엔드 결제 완료 처리 실패:", response.status);
                  alert("결제는 완료되었지만 서버 처리에 실패했습니다.");
                }
              })
              .catch((error) => {
                console.error("백엔드 결제 완료 처리 오류:", error);
                alert("결제는 완료되었지만 서버 처리에 실패했습니다.");
              });
          } else {
            console.log("결제 실패:", rsp);
            alert(`결제에 실패했습니다: ${rsp.error_msg}`);
          }
        }
      );
    } else {
      alert("결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-16 pb-28">
        <h1 className="text-[22px] font-extrabold text-[#2c2c2c] mb-6">
          결제정보 입력
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2c2c2c] mb-3">구독 정보</h2>
          <div className="rounded-2xl border border-gray-200 shadow-sm bg-white">
            <div className="px-4 py-4 flex items-center border-b border-gray-100">
              <div className="w-28 text-gray-500 text-sm">구독 상품</div>
              <div className="flex-1">
                <div className="text-[#018941] font-semibold">
                  부모님께 이어드림 선물하기
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  그룹명: {familyName}
                </div>
              </div>
              <button
                type="button"
                onClick={handleScheduleChange}
                className="text-xs text-[#018941] border border-[#018941] rounded-md px-2 py-1 hover:bg-[#018941] hover:text-white transition-colors"
              >
                구독주기 변경
              </button>
            </div>
            <div className="px-4 py-4 flex items-center border-b border-gray-100">
              <div className="w-28 text-gray-500 text-sm">구독 기간</div>
              <div className="flex-1 text-[#2c2c2c] text-sm">
                2025.08.09 ~ 2025.09.09
              </div>
            </div>
            <div className="px-4 py-4 flex items-center">
              <div className="w-28 text-gray-500 text-sm">다음 결제일</div>
              <div className="flex-1 text-[#2c2c2c] text-sm">2025.09.09</div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2c2c2c] mb-3">결제금액</h2>
          <div className="rounded-2xl border border-gray-200 shadow-sm bg-white">
            <div className="px-4 py-4 flex items-center border-b border-gray-100">
              <div className="w-28 text-gray-500 text-sm">상품 가격</div>
              <div className="flex-1 text-right text-[#2c2c2c]">11,900원</div>
            </div>
            <div className="px-4 py-4 flex items-center border-b border-gray-100">
              <div className="w-28 text-gray-500 text-sm">할인 금액</div>
              <div className="flex-1 text-right">
                <span className="text-[#e11d48] mr-2">25%</span>8,900원
              </div>
            </div>
            <div className="px-4 py-4 flex items-center">
              <div className="w-28 text-gray-500 text-sm">다음 결제일</div>
              <div className="flex-1 text-right text-[#2c2c2c]">2025.09.09</div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2c2c2c] mb-3">결제수단</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("kakaopay")}
              className={`rounded-2xl border px-4 py-5 text-left shadow-sm transition-colors ${method === "kakaopay" ? "border-[#018941] ring-1 ring-[#018941]" : "border-gray-200"}`}
            >
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-5 text-[11px] font-bold rounded bg-[#fee500] text-black mr-2">
                  pay
                </span>
                <span className="font-medium">카카오페이</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`rounded-2xl border px-4 py-5 text-left shadow-sm transition-colors ${method === "card" ? "border-[#018941] ring-1 ring-[#018941]" : "border-gray-200"}`}
            >
              <div className="flex items-center">
                <span className="font-medium">신용카드</span>
              </div>
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2c2c2c] mb-3">약관 동의</h2>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <label className="flex items-center px-4 py-4 border-b border-gray-100 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeAll}
                onChange={(e) => {
                  setAgreeAll(e.target.checked);
                  setAgreePolicy(e.target.checked);
                }}
                className="mr-3 accent-[#018941] w-5 h-5"
              />
              <span className="font-semibold">전체 동의하기</span>
            </label>
            <label className="flex items-start px-4 py-4 gap-3">
              <input
                type="checkbox"
                checked={agreePolicy}
                onChange={(e) => {
                  setAgreePolicy(e.target.checked);
                  if (!e.target.checked) setAgreeAll(false);
                }}
                className="mt-0.5 accent-[#018941] w-5 h-5"
              />
              <div className="flex-1 text-sm text-gray-600">
                [필수] 자동결제 상품 인지 및 취소, 환불, 소득 공제 정책 등 상품
                구매 정책 동의
              </div>
              <button className="text-sm text-gray-400">보기</button>
            </label>
          </div>
        </section>

        <section className="mb-28">
          <h2 className="text-xl font-bold text-[#2c2c2c] mb-3">유의사항</h2>
          <ul className="text-xs text-gray-500 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              구독결제는 구독기간 마지막 날 결제되며, 결제 후 구독기간은 자동
              갱신됩니다.
            </li>
            <li>
              구독결제 중단을 원할 경우, 구독기간 종료 하루 전까지 구독을
              해지해야 합니다.
            </li>
            <li>
              만 19세 미만의 회원의 유료서비스 이용은 법정대리인의 동의가
              필요합니다.
            </li>
            <li>
              법정대리인이 동의하지 않은 경우 이용계약을 취소할 수 있습니다.
            </li>
          </ul>
        </section>

        <div className="absolute left-0 right-0 bottom-6 px-6 pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={handlePay}
            disabled={!agreePolicy}
            className="w-full bg-[#018941] disabled:opacity-40 text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-[#016b31] transition-colors"
          >
            결제하기
          </button>
        </div>
      </div>

      {/* 구독 주기 변경 모달 */}
      <SubscriptionScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onConfirm={handleScheduleConfirm}
        currentSchedule={subscriptionSchedule}
      />
    </div>
  );
};

export default PaymentPage;
