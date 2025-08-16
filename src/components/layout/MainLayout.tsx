import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showNavigation = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex justify-center">
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white relative">
        <main className="pb-24">{children}</main>

        {showNavigation && (
          <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white/80 backdrop-blur-xl border-t border-gray-100 px-2 py-3">
            <div className="flex justify-around items-center">
              {/* 홈 */}
              <button
                onClick={() => handleNavigation("/home")}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  isActive("/home")
                    ? "text-[#018941]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                    isActive("/home") ? "bg-[#018941]/10" : "hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">홈</span>
              </button>

              {/* 소식 작성 */}
              <button
                onClick={() => handleNavigation("/write-news")}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  isActive("/write-news")
                    ? "text-[#018941]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                    isActive("/write-news")
                      ? "bg-[#018941]/10"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">소식 작성</span>
              </button>

              {/* 소식함 */}
              <button
                onClick={() => handleNavigation("/news-box")}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  isActive("/news-box")
                    ? "text-[#018941]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                    isActive("/news-box")
                      ? "bg-[#018941]/10"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">소식함</span>
              </button>

              {/* 마이페이지 */}
              <button
                onClick={() => handleNavigation("/mypage")}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  isActive("/mypage")
                    ? "text-[#018941]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                    isActive("/mypage")
                      ? "bg-[#018941]/10"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">마이페이지</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
