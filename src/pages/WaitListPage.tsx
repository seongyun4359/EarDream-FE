import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import RelationShipSelect from "../components/other/RelationShipSelect";

const WaitListPage: React.FC = () => {
  const family = {
    name: "김가족",
    email: "family@example.com",
    profileImage: "/api/placeholder/80/80",
    subscriptionPlan: "월 구독",
    subscriptionStatus: "정상 구독 중",
    nextPaymentDate: "2024년 2월 4일",
    subscriptionStartDate: "2023년 1월 1일",
    price: "8,900원",
  };

  /* TODO: 승인 로직 함수 추가 필요 */
  const handleInviteFamily = () => {};

  /* TODO: 거절 로직 함수 추가 필요 */
  const handleRejectFamily = () => {};

  return (
    <MainLayout>
      <Header title="가족 관리" />

      <div className="p-4 space-y-10">
        {/* 대기리스트 */}
        <p className="font-bold mt-4">대기리스트</p>

        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm mt-4">
            <div className="flex items-center space-x-4">
              <img
                src={family.profileImage}
                alt={family.name}
                className="w-16 h-16 rounded-full mb-16 bg-gray-200"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {family.name}
                </h2>

                {/* TODO: 관계 변경 관련 수정 필요 */}
                <RelationShipSelect
                  value={family.name}
                  onChange={handleInviteFamily}
                  className="mt-2 w-full border rounded-lg p-3 text-gray-500"
                />

                <div className="flex mt-2 gap-4">
                  <Button
                    variant="primary"
                    size="small"
                    className="w-full"
                    onClick={handleInviteFamily}
                  >
                    승인
                  </Button>

                  <Button
                    variant="dangerOutline"
                    size="small"
                    className="w-full"
                    onClick={handleRejectFamily}
                  >
                    거부
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default WaitListPage;
