import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  familyName?: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const familyName = state.familyName || "우리 가족";

  const [method, setMethod] = useState<"kakaopay" | "card">("kakaopay");
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const handlePay = () => {
    if (!agreePolicy) return;
    
    // 포트원 결제 요청
    if (typeof window !== "undefined" && (window as any).IMP) {
      const IMP = (window as any).IMP;
      
      // IMP 초기화 (실제 가맹점 식별코드로 변경 필요)
      IMP.init("imp00000000"); // 테스트용 코드
      
      // 결제 요청
      IMP.request_pay({
        pg: method === "kakaopay" ? "kakaopay" : "html5_inicis", // PG사
        pay_method: method === "kakaopay" ? "kakaopay" : "card", // 결제수단
        merchant_uid: `order_${Date.now()}`, // 주문번호 (고유값)
        name: `부모님께 이어드림 선물하기 - ${familyName}`, // 주문명
        amount: 3000, // 결제금액 (3,000원)
        buyer_email: "test@example.com", // 구매자 이메일
        buyer_name: "구매자", // 구매자 이름
        buyer_tel: "010-1234-5678", // 구매자 전화번호
        digital: true, // 디지털 상품
        currency: "KRW", // 통화
        language: "ko", // 언어
        m_redirect_url: `${window.location.origin}/payment/result`, // 모바일 리다이렉트 URL
        notice_url: `${window.location.origin}/api/payment/webhook`, // 웹훅 URL
        custom_data: {
          familyName: familyName,
          familyId: "temp_id", // 실제로는 가족 ID 사용
        },
      }, (rsp: any) => {
        if (rsp.success) {
          // 결제 성공 시
          console.log("결제 성공:", rsp);
          alert("결제가 완료되었습니다!");
          // 결제 완료 후 기본정보 입력 페이지로 이동
          navigate("/recipient", { 
            state: { 
              familyName,
              paymentData: rsp,
              merchantUid: rsp.merchant_uid,
            } 
          });
        } else {
          // 결제 실패 시
          console.log("결제 실패:", rsp);
          alert(`결제에 실패했습니다: ${rsp.error_msg}`);
        }
      });
    } else {
      // IMP SDK가 로드되지 않은 경우
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
              <button className="text-xs text-[#018941] border border-[#018941] rounded-md px-2 py-1">
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
    </div>
  );
};

export default PaymentPage;
