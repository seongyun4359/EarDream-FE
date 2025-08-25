import React, { useState } from "react";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import RelationShipSelect from "../components/other/RelationShipSelect";
import { useUserStore } from "../stores/useUserStore";
import { useFamilyStore } from "../stores/useFamilyStore";
import { approveInvitation, rejectInvitation } from "../services/familyApi";

const WaitListPage: React.FC = () => {
  const familyId = useUserStore((state) => state.familyId);
  const invitedFamilyMembers = useFamilyStore(
    (state) => state.invitedFamilyMembers
  );

  const [relationshipMap, setRelationshipMap] = useState<{
    [key: number]: string;
  }>({});

  const handleRelationshipChange = (invitationId: number, value: string) => {
    setRelationshipMap((prev) => ({ ...prev, [invitationId]: value }));
  };

  /* 초대 승인 함수 */
  const handleInviteFamily = async (invitationId: number) => {
    const relationship = relationshipMap[invitationId] || "가족";
    try {
      await approveInvitation(familyId, invitationId, relationship);
      alert("초대가 승인되었습니다!");
    } catch (err) {
      console.error(err);
      alert("초대 승인 실패하였습니다.");
    }
  };

  /* TODO: 거절 로직 함수 추가 필요 */
  const handleRejectFamily = async (invitationId: number) => {
    try {
      await rejectInvitation(invitationId);
    } catch (err) {
      console.error("초대 거절에 실패하였습니다.", err);
    }
  };

  return (
    <MainLayout>
      <Header title="가족 관리" />

      <div className="p-4 space-y-10">
        {/* 대기리스트 */}
        <p className="font-bold mt-4">대기리스트</p>

        {invitedFamilyMembers.map((member) => (
          <div
            key={member.invitationId}
            className="bg-white rounded-lg p-4 shadow-sm mt-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src="/api/placeholder/80/80"
                alt={member.name}
                className="w-16 h-16 rounded-full mb-16 bg-gray-200"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h2>

                <RelationShipSelect
                  value={relationshipMap[member.invitationId] || ""}
                  onChange={(value) =>
                    handleRelationshipChange(member.invitationId, value)
                  }
                  className="mt-2 w-full border rounded-lg p-3 text-gray-500"
                />

                <div className="flex mt-2 gap-4">
                  <Button
                    variant="primary"
                    size="small"
                    className="w-full"
                    onClick={() => handleInviteFamily(member.invitationId)}
                  >
                    승인
                  </Button>

                  <Button
                    variant="dangerOutline"
                    size="small"
                    className="w-full"
                    onClick={() => handleRejectFamily(member.invitationId)}
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
