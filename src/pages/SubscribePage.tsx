import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";

const SubscribePage: React.FC = () => {
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
    delivery: "배송 완료",
  };

  return (
    <MainLayout>
      <Header title="구독 내역 및 배송" />

      <div className="p-4 space-y-6">
        {/* 구독 정보 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">플랜명</span>
              <span className="text-gray-900">{user.subscriptionPlan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">결제 일자</span>
              <span className="text-gray-900">{user.nextPaymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">회차</span>
              <span className="text-gray-900">1회차</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">배송 상태</span>
              <span className="text-[#018941] font-medium">
                {user.delivery}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscribePage;
