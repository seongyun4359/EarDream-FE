import React from "react";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  rightElement,
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="p-5">
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-gray-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="mr-3 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>
      {rightElement && <div className="flex items-center">{rightElement}</div>}
    </header>
  );
};

export default Header;
