import React from "react";

interface FeedFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onWriteNews: () => void;
}

const FeedFilters: React.FC<FeedFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onWriteNews,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-sm">
      <div className="flex space-x-8">
        <button
          onClick={() => onFilterChange("전체")}
          className={`flex flex-col items-center space-y-1 ${
            activeFilter === "전체" ? "text-[#018941]" : "text-gray-500"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              activeFilter === "전체" ? "bg-[#018941]" : "bg-gray-200"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                activeFilter === "전체" ? "text-white" : "text-gray-600"
              }`}
            >
              전체
            </span>
          </div>
          <span className="text-xs">전체 보기</span>
        </button>

        <button
          onClick={() => onFilterChange("구성원")}
          className={`flex flex-col items-center space-y-1 ${
            activeFilter === "구성원" ? "text-[#018941]" : "text-gray-500"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              activeFilter === "구성원" ? "bg-[#018941]" : "bg-gray-200"
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <span className="text-xs">구성원</span>
        </button>

        <button
          onClick={onWriteNews}
          className="flex flex-col items-center space-y-1 text-gray-500"
        >
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="text-xs">추가</span>
        </button>
      </div>
    </div>
  );
};

export default FeedFilters;
