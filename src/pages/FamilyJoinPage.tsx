import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FamilyJoinPage: React.FC = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const isReady = inviteCode.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleConfirm();
  };

  const handleConfirm = async () => {
    if (!isReady) return;
    setIsSubmitting(true);
    try {
      // TODO: API 연동 (초대 코드 검증 및 참여)
      // const { leaderName } = await api.joinFamily({ inviteCode })
      setIsChecking(true);
      // 대기 화면을 잠시 보여준 뒤 홈으로 이동 (임시)
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
        <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-24">
          <div className="mt-36">
            <div className="text-2xl font-extrabold leading-snug">
              <span className="text-[#018941]">그룹 리더</span> 님이
              <br />
              참가를 확인 중이에요
            </div>
            <p className="text-gray-400 mt-4">조금만 기다려주세요!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-20 pb-28">
        {/* 인사 및 안내 문구 */}
        <div className="mt-32 mb-8">
          <div className="text-[#018941] font-extrabold text-xl mb-2">
            안녕하세요!
          </div>
          <h1 className="text-3xl font-extrabold leading-snug text-[#2c2c2c] mb-6">
            그룹에 참여 하시는군요!
          </h1>
          <div className="text-2xl text-gray-500 mb-2">
            초대코드를 입력해 주세요
          </div>
          <div className="text-gray-400">
            가족 구성원이 공유한 초대코드를 입력하면 참여할 수 있어요
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder="ABCDEF"
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#018941] uppercase tracking-widest"
            maxLength={32}
            required
          />
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

export default FamilyJoinPage;
