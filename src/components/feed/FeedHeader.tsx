import React from "react";

interface FeedHeaderProps {
  groupName: string;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ groupName }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3">
      <h1 className="text-lg font-semibold text-center text-gray-900">
        {groupName}
      </h1>

      {/* 검색바 */}
      <div className="mt-3 relative">
        <input
          type="text"
          placeholder="어떤 추억을 찾아볼까요?"
          className="w-full bg-gray-100 rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#018941] focus:ring-opacity-50 border border-gray-200"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
    </div>
  );
};

export default FeedHeader;
