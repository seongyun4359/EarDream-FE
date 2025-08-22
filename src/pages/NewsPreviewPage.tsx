import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";

const NewsPreviewPage: React.FC = () => {
  const { id } = useParams();

  // TODO: 실제 데이터로 교체
  const newsBook = {
    id: id || "1",
    month: "2024년 1월",
    deliveryDate: "2024-01-28",
  };

  return (
    <MainLayout>
      <Header title="책자함" showBackButton={true} />

      <div className="p-4 space-y-4">
        {/* 제목과 날짜 */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {newsBook.month}
          </h1>
          <p className="text-sm text-gray-500">{newsBook.deliveryDate}</p>
        </div>

        {/* PDF 미리보기 영역 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[600px] flex flex-col">
          {/* 상단 정보 */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">PDF 미리보기</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">A4 사이즈</span>
            </div>
          </div>

          {/* 미리보기 콘텐츠 */}
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500">PDF 미리보기</p>
              <p className="text-xs text-gray-400">내용을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsPreviewPage;
