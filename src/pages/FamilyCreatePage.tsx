import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FamilyCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [familyName, setFamilyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isReady = familyName.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleConfirm();
  };

  const handleConfirm = async () => {
    if (!isReady) return;
    setIsSubmitting(true);
    try {
      // TODO: API 연동 (가족 생성) 후 결제 페이지로 이동
      navigate("/family/subscribe", { state: { familyName } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-20 pb-28">
        {/* 인사 및 안내 문구 */}
        <div className="mt-32 mb-8">
          <div className="text-[#018941] font-extrabold text-xl mb-2">
            안녕하세요!
          </div>
          <h1 className="text-3xl font-extrabold leading-snug text-[#2c2c2c] mb-6">
            새롭게 그룹을 만드시는군요!
          </h1>
          <div className="text-2xl text-gray-500 mb-2">
            가족 이름을 입력해 주세요
          </div>
          <div className="text-gray-400">
            가족 이름은 나중에도 변경할 수 있어요
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="예: 김OO 가족"
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#018941]"
            maxLength={30}
            required
          />
          {/* 키보드에서 제출 지원용 숨김 버튼 */}
          <button type="submit" className="hidden" />
        </form>

        {/* 하단 확인 버튼 (입력 시 노출) */}
        {isReady && (
          <div className="absolute left-0 right-0 bottom-6 px-6 pb-[env(safe-area-inset-bottom)]">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full bg-[#018941] text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-[#016b31] transition-colors"
            >
              {isSubmitting ? "확인 중..." : "확인"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyCreatePage;
