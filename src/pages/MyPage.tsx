import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import LogoutIcon from "../assets/icons/LogoutIcon";
import WarningIcon from "../assets/icons/WarningIcon";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShowLogoutAlert, setIsShowLogoutAlert] = useState(false);
  const [isShowDeleteAccountAlert, setIsShowDeleteAccountAlert] =
    useState(false);

  // TODO: 실제 사용자 데이터로 교체
  const user = {
    name: "김가족",
    email: "family@example.com",
    profileImage: "/api/placeholder/80/80",
    subscriptionPlan: "월 구독",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
    price: "8,900원",
  };

  const handleEditProfile = () => {
    navigate("/mypage/edit");
  };

  const handleViewFamily = () => {
    navigate("/member");
  };

  const handleAutoPayment = () => {
    // TODO: 자동 결제 관리 페이지로 이동
    console.log("자동 결제 관리");
    navigate("/mypage/auto-payment");
  };

  const handleSubscribe = () => {
    // TODO: 결제 수단 관리 페이지로 이동
    console.log("결제 수단 관리");
    navigate("/mypage/subscribe");
  };

  const handleLogout = () => {
    // TODO: 로그아웃 로직
    console.log("로그아웃");
    navigate("/login");
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 확인 알럿으로 변경해놓음. 로직 추가 필요
    console.log("회원탈퇴");
    navigate("/login");
  };

  return (
    <MainLayout>
      <Header title="마이페이지" />

      <div className="p-4 space-y-6">
        {/* 프로필 정보 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-16 h-16 rounded-full bg-gray-200"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <Button variant="outline" size="small" onClick={handleEditProfile}>
              편집
            </Button>
          </div>
        </div>

        {/* 구독 정보 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">플랜명</span>
              <span className="text-gray-900">{user.subscriptionPlan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">다음 결제일</span>
              <span className="text-gray-900">{user.nextPaymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">금액</span>
              <span className="text-gray-900">{user.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">상태</span>
              <span className="text-[#018941] font-medium">
                {user.subscriptionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* 메뉴 목록 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            <button
              onClick={handleViewFamily}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#018941]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>가족 관리</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              onClick={handleSubscribe}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#018941]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>구독 내역 및 배송</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              onClick={handleAutoPayment}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-[#018941]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>자동 결제 관리</span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 계정 관리 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            <button
              onClick={() => setIsShowLogoutAlert(true)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between text-red-600"
            >
              <div className="flex items-center space-x-3">
                <LogoutIcon className="w-5 h-5" />
                <span>로그아웃</span>
              </div>
            </button>

            <button
              onClick={() => setIsShowDeleteAccountAlert(true)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between text-red-600"
            >
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>회원탈퇴</span>
              </div>
            </button>
          </div>
        </div>

        {isShowLogoutAlert && (
          <Alert
            icon={<LogoutIcon className="w-10 h-10 text-red-600" />}
            message="로그아웃 하시겠어요?"
            alertHelperText="로그아웃 하면 다시 로그인해야 합니다"
            confirmText="로그아웃"
            confirmVariant="danger"
            onConfirm={handleLogout}
            confirmClassName="flex-1 ml-4"
            cancelText="취소"
            cancelVariant="secondaryOutline"
            cancelClassName="flex-1"
            onCancel={() => setIsShowLogoutAlert(false)}
          />
        )}

        {isShowDeleteAccountAlert && (
          <Alert
            icon={<WarningIcon className="w-10 h-10 text-red-600" />}
            message="정말 탈퇴하시겠어요?"
            alertHelperText="계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다."
            confirmText="회원탈퇴"
            confirmVariant="danger"
            onConfirm={handleWithdraw}
            confirmClassName="flex-1 ml-4"
            cancelText="취소"
            cancelVariant="secondaryOutline"
            cancelClassName="flex-1"
            onCancel={() => setIsShowDeleteAccountAlert(false)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MyPage;
