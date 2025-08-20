import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FamilyJoinPage: React.FC = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    setIsSubmitting(true);
    try {
      // TODO: API 연동 (초대 코드 검증 및 참여)
      // await api.joinFamily({ inviteCode })
      navigate("/home");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white min-h-screen px-6 pt-20 pb-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 mb-6 hover:text-gray-700"
        >
          ← 뒤로가기
        </button>

        <h1 className="text-2xl font-bold mb-6">가족 참여하기</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              초대 코드
            </label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="예: ABCD-1234"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#018941] uppercase tracking-wider"
              maxLength={32}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !inviteCode.trim()}
            className="w-full bg-[#018941] disabled:opacity-60 text-white py-4 rounded-lg font-medium text-lg hover:bg-[#016b31] transition-colors"
          >
            {isSubmitting ? "확인 중..." : "그룹 참여하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FamilyJoinPage;
