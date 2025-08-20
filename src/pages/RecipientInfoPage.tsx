import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Step = 1 | 2 | 3 | 4 | 5;

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const formatBirth = (digits: string) => {
  const v = onlyDigits(digits).slice(0, 8);
  if (v.length <= 4) return v;
  if (v.length <= 6) return `${v.slice(0, 4)} ${v.slice(4, 6)}`;
  return `${v.slice(0, 4)} ${v.slice(4, 6)} ${v.slice(6, 8)}`;
};

const formatPhone = (digits: string) => {
  const v = onlyDigits(digits).slice(0, 11);
  if (v.length < 4) return v;
  if (v.length < 8) return `${v.slice(0, 3)} ${v.slice(3)}`;
  return `${v.slice(0, 3)} ${v.slice(3, 7)} ${v.slice(7)}`;
};

const RecipientInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const birthDigits = useMemo(() => onlyDigits(birth), [birth]);
  const phoneDigits = useMemo(() => onlyDigits(phone), [phone]);

  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return birthDigits.length === 8;
      case 3:
        return phoneDigits.length >= 10 && phoneDigits.length <= 11;
      case 4:
        return address.trim().length > 5;
      default:
        return true;
    }
  }, [step, name, birthDigits, phoneDigits, address]);

  const handleNext = () => {
    if (!canNext) return;
    if (step < 4) {
      setStep((s) => (s + 1) as Step);
    } else {
      setStep(5);
    }
  };

  const handleFinish = () => {
    // TODO: 입력 정보 저장/전송
    navigate("/getting-started");
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-20 pb-28">
        {step <= 4 ? (
          <>
            {/* 타이틀 */}
            <div className="mt-28 mb-8">
              <div className="text-[#018941] font-extrabold text-xl mb-2">
                책자를 받으실 분은
              </div>
              <h1 className="text-3xl font-extrabold leading-snug text-[#2c2c2c] mb-6">
                어떤 분이신가요?
              </h1>

              {/* 이전 단계 값 미리보기 */}
              <div className="text-[#2c2c2c] space-y-2">
                {name && <div>{name}</div>}
                {birthDigits.length > 0 && <div>{formatBirth(birth)}</div>}
                {phoneDigits.length > 0 && <div>{formatPhone(phone)}</div>}
              </div>

              {/* 안내문 */}
              <p className="text-gray-400 mt-2">
                {step === 1 && "이름을 입력해주세요"}
                {step === 2 && "생년월일 8자리를 입력해주세요"}
                {step === 3 && "전화번호를 입력해주세요"}
                {step === 4 && "주소를 입력해주세요"}
              </p>
            </div>

            {/* 입력 영역 */}
            <div className="mt-6">
              {step === 1 && (
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#018941]"
                  maxLength={30}
                />
              )}
              {step === 2 && (
                <input
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={birth}
                  onChange={(e) => setBirth(onlyDigits(e.target.value))}
                  placeholder="20000101"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#018941] tracking-widest"
                  maxLength={8}
                />
              )}
              {step === 3 && (
                <input
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phone}
                  onChange={(e) => setPhone(onlyDigits(e.target.value))}
                  placeholder="01012345678"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#018941] tracking-widest"
                  maxLength={11}
                />
              )}
              {step === 4 && (
                <textarea
                  autoFocus
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="서울특별시 중구 세종대로 110"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#018941]"
                />
              )}
            </div>

            {/* 하단 버튼 */}
            <div className="absolute left-0 right-0 bottom-6 px-6 pb-[env(safe-area-inset-bottom)]">
              <button
                type="button"
                onClick={handleNext}
                disabled={!canNext}
                className="w-full bg-[#018941] disabled:opacity-40 text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-[#016b31] transition-colors"
              >
                확인
              </button>
            </div>
          </>
        ) : (
          <div className="mt-36">
            <div className="text-2xl font-extrabold leading-snug">
              <span className="text-[#018941]">{name}</span> 님께
              <br />
              매월 책자를 보내드려요
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              정보는 주문 완료 전까지 언제든 수정하실 수 있어요
            </p>

            <div className="absolute left-0 right-0 bottom-6 px-6 pb-[env(safe-area-inset-bottom)]">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-[#018941] text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-[#016b31] transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientInfoPage;
