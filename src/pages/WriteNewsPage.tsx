import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const WriteNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    // TODO: 실제 API 호출
    console.log("소식 작성:", content);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/home");
    }, 1000);
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <MainLayout>
      <Header title="소식 작성" showBackButton onBackClick={handleBack} />

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            오늘의 소식을 작성해주세요
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                소식 내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="가족에게 전하고 싶은 소식을 자유롭게 작성해주세요..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016b33] focus:border-[#018941] transition-colors duration-200 resize-none"
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isSubmitting || !content.trim()}
              >
                {isSubmitting ? "작성 중..." : "소식 작성"}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-900">작성 팁</h3>
              <p className="text-sm text-blue-700 mt-1">
                가족과의 일상, 특별한 순간, 또는 간단한 안부 메시지도 좋습니다.
                매월 정기 마감일(2, 4주 일요일)에 소식책자로 제작됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WriteNewsPage;
