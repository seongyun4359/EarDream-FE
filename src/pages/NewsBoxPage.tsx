import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";

interface NewsBook {
  id: string;
  month: string;
  status: "production" | "delivery" | "completed";
  statusText: string;
  deliveryDate?: string;
  downloadUrl?: string;
}

const NewsBoxPage: React.FC = () => {
  // TODO: 실제 데이터로 교체
  const newsBooks: NewsBook[] = [
    {
      id: "1",
      month: "2024년 1월",
      status: "completed",
      statusText: "배송 완료",
      deliveryDate: "2024-01-28",
      downloadUrl: "#",
    },
    {
      id: "2",
      month: "2023년 12월",
      status: "completed",
      statusText: "배송 완료",
      deliveryDate: "2023-12-24",
      downloadUrl: "#",
    },
    {
      id: "3",
      month: "2023년 11월",
      status: "delivery",
      statusText: "배송 중",
      deliveryDate: "2023-11-26",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production":
        return "bg-yellow-100 text-yellow-800";
      case "delivery":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (newsBook: NewsBook) => {
    if (newsBook.downloadUrl) {
      // TODO: 실제 다운로드 로직
      console.log("다운로드:", newsBook.month);
    }
  };

  const handleViewOnline = (newsBook: NewsBook) => {
    if (newsBook.downloadUrl) {
      // TODO: 온라인 뷰어 열기
      console.log("온라인 뷰어:", newsBook.month);
    }
  };

  return (
    <MainLayout>
      <Header title="소식함" />

      <div className="p-4 space-y-6">
        {/* 안내 메시지 */}
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
              <h3 className="text-sm font-medium text-blue-900">소식함 안내</h3>
              <p className="text-sm text-blue-700 mt-1">
                매월 정기 마감일(2, 4주 일요일) 이후 소식책자가 자동으로
                업로드됩니다. 배송 완료된 소식책자는 PDF로 다운로드하거나
                온라인에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 소식책자 목록 */}
        <div className="space-y-4">
          {newsBooks.map((newsBook) => (
            <div
              key={newsBook.id}
              className="bg-white rounded-lg p-4 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {newsBook.month}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(newsBook.status)}`}
                >
                  {newsBook.statusText}
                </span>
              </div>

              {newsBook.deliveryDate && (
                <p className="text-sm text-gray-600 mb-3">
                  배송일: {newsBook.deliveryDate}
                </p>
              )}

              {newsBook.status === "completed" && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewOnline(newsBook)}
                    className="flex-1 bg-[#018941] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#017a3a] transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>온라인 보기</span>
                  </button>

                  <button
                    onClick={() => handleDownload(newsBook)}
                    className="flex-1 bg-white border-2 border-[#018941] text-[#018941] py-2 px-4 rounded-lg font-medium hover:bg-[#e6f4ed] transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>PDF 다운로드</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 다음 마감일 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-900">
                다음 마감일
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                2024년 2월 4일 (일요일) - 이 날까지 작성된 소식이 2월 소식책자에
                포함됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsBoxPage;
