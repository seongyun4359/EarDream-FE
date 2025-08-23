import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createFamily } from "../api/family";
import type { CreateFamilyRequest } from "../api/family";
import { useAuth } from "../hooks/useAuth";

const FamilyCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, loading } = useAuth();
  const [familyName, setFamilyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isReady = familyName.trim().length > 0;

  // 로그인 상태 확인 (임시로 비활성화)
  useEffect(() => {
    console.log("FamilyCreatePage - 로그인 상태 확인:", {
      isLoggedIn,
      user,
      loading,
    });

    // 로딩 중이면 아직 확인하지 않음
    if (loading) {
      console.log("로그인 상태 확인 중...");
      return;
    }

    // 임시로 로그인 상태 체크 비활성화 (백엔드에서 토큰 인증 제거됨)
    console.log(
      "백엔드에서 토큰 인증을 제거했으므로 로그인 상태와 관계없이 진행"
    );

    // 기존 로그인 상태 확인 로직 주석 처리
    /*
    if (!isLoggedIn && window.location.pathname !== "/login") {
      console.log("로그인 상태가 아닙니다..");
    } else if (isLoggedIn) {
      console.log("로그인 상태 확인됨:", user);
    }
    */
  }, [isLoggedIn, user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleConfirm();
  };

  const handleConfirm = async () => {
    if (!isReady) return;
    setIsSubmitting(true);

    try {
      // 가족 생성 API 호출
      const request: CreateFamilyRequest = {
        familyName: familyName.trim(),
        familyProfileImageUrl: null,
        userId: 1, // 임시로 고정값 사용 (백엔드 테스트용)
        monthlyDeadline: 4, // 숫자
      };

      const response = await createFamily(request);

      // 성공 시 결제 페이지로 이동
      navigate("/family/subscribe", {
        state: {
          familyName: response.familyName,
          familyId: response.familyId,
          inviteCode: response.inviteCode,
        },
      });
    } catch (error) {
      console.error("가족 생성 실패:", error);
      alert("가족 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중이면 로딩 화면 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f2f7] flex justify-center items-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">로그인 상태 확인 중...</div>
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
