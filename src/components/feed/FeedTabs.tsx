import React from "react";

interface FeedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FeedTabs: React.FC<FeedTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="flex px-4">
        <button
          onClick={() => onTabChange("소식함")}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "소식함"
              ? "border-[#018941] text-[#018941]"
              : "border-transparent text-gray-500"
          }`}
        >
          소식함
        </button>
        <button
          onClick={() => onTabChange("보관함")}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "보관함"
              ? "border-[#018941] text-[#018941]"
              : "border-transparent text-gray-500"
          }`}
        >
          보관함
        </button>
      </div>
    </div>
  );
};

export default FeedTabs;
