import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";

interface NewsBook {
  id: string;
  month: string;
  status: "production" | "delivery" | "completed";
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
      deliveryDate: "2024-01-28",
      downloadUrl: "#",
    },
    {
      id: "2",
      month: "2023년 12월",
      status: "completed",
      deliveryDate: "2023-12-24",
      downloadUrl: "#",
    },
  ];

  const handleDownload = (newsBook: NewsBook) => {
    if (newsBook.downloadUrl) {
      // TODO: 실제 다운로드 로직
      console.log("다운로드:", newsBook.month);
    }
  };

  const handlePreview = (newsBook: NewsBook) => {
    // TODO: 책자 미리보기 로직
    console.log("책자 미리보기:", newsBook.month);
  };

  return (
    <MainLayout>
      <Header title="책자함" />

      <div className="p-4 space-y-6">
        {/* 검색바 */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="어떤 추억을 찾아볼까요?"
            className="block w-full pl-10 pr-3 py-3 border border-[#018941] rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#018941] focus:border-transparent"
          />
        </div>

        {/* 안내 메시지 */}
        <div className="bg-[#e6f4ed] rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-[#018941] mt-0.5 flex-shrink-0"
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
              <h3 className="text-sm font-medium text-black">책자함 안내</h3>
              <p className="text-sm text-black mt-1">
                매월 정기 마감일(2, 4주 일요일) 이후 소식책자가 자동으로
                업로드됩니다. 배송 완료된 소식책자는 PDF로 다운로드하거나
                온라인에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 다음 마감일 안내 */}
        <div className="bg-white border border-[#018941] rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-[#018941] mt-0.5 flex-shrink-0"
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
              <h3 className="text-sm font-medium text-black">다음 마감일</h3>
              <p className="text-sm text-black mt-1">
                <span className="font-semibold">2024년 2월 4일 (일요일)</span> -
                이 날까지 작성된 소식이 2월 소식책자에 포함됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 소식책자 목록 */}
        <div className="space-y-4">
          {newsBooks.map((newsBook) => (
            <div
              key={newsBook.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      책자 이름
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {newsBook.deliveryDate && (
                    <p className="text-sm text-gray-500">yyyy년 mm월 dd일</p>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  {newsBook.status === "completed" && (
                    <>
                      <button
                        onClick={() => handlePreview(newsBook)}
                        className="bg-[#018941] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#017a3a] transition-colors duration-200 text-sm"
                      >
                        책자 미리보기
                      </button>

                      <button
                        onClick={() => handleDownload(newsBook)}
                        className="bg-white border border-[#018941] text-[#018941] py-2 px-4 rounded-lg font-medium hover:bg-[#e6f4ed] transition-colors duration-200 text-sm"
                      >
                        PDF 다운로드
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsBoxPage;
