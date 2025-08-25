import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/common/Button";
import { useFamilyStore } from "../stores/useFamilyStore";
import { inviteFamily, getInvitations } from "../services/familyApi";
import { useUserStore } from "../stores/useUserStore";

const FamilyMembersPage: React.FC = () => {
  const navigate = useNavigate();
  /* TODO: 추후 false로 기본값 변경 후 관리자용인지 확인 필요 */
  const [isShowWaitList, setIsShowWaitList] = useState<boolean>(true);

  const familyId = useUserStore((state) => state.familyId);
  const userProfileImageUrl = useUserStore(
    (state) => state.userProfileImageUrl
  );
  const userEmail = useUserStore((state) => state.userEmail);
  const userName = useUserStore((state) => state.userName);
  const setInviteCode = useFamilyStore((state) => state.setInviteCode);
  const invitedFamilyMembers = useFamilyStore(
    (state) => state.invitedFamilyMembers
  );
  const setInvitedFamilyMembers = useFamilyStore(
    (state) => state.setInvitedFamilyMembers
  );

  /* 가족 구성원 프로필 편집 */
  const handleEditProfile = () => {
    navigate("/member/edit");
  };

  /* 가족 구성원 초대 */
  const handleInviteFamily = async () => {
    try {
      const response = await inviteFamily(familyId);

      if (response.success && response.data.inviteCode && response.data) {
        setInviteCode(response.data.inviteCode);
        console.log("초대코드", response.data.inviteCode);
      }
    } catch (error) {
      console.error("가족 초대 에러:", error);
    }

    navigate("/member/invite");
  };

  /* 가족 대기리스트 */
  const handleWaitList = () => {
    navigate("/member/wait-list");
  };

  const handleInvitedFamilyMembers = async () => {
    try {
      const response = await getInvitations(familyId);
      if (response.data && response.data.length > 0) {
        setInvitedFamilyMembers(response.data);
        setIsShowWaitList(true);
      }
    } catch (error) {
      console.error("가족 초대 요청 목록: ", error);
    }
  };

  useEffect(() => {
    handleInvitedFamilyMembers();
  }, []);

  return (
    <MainLayout>
      <Header title="가족 관리" />

      <div className="p-4 space-y-10">
        {/* 가족 관리자 */}
        <p className="font-bold mt-4">가족 관리자</p>
        <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={userProfileImageUrl || "/images/default-profile.png"}
              alt={userName}
              className="w-16 h-16 rounded-full bg-gray-200"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {userName}
              </h2>
              <p className="text-gray-600">{userEmail ?? ""}</p>
            </div>
          </div>
        </div>

        {/* 가족 구성원 */}
        <div className="flex items-center justify-between mt-10">
          <p className="font-bold">내 가족</p>

          {isShowWaitList && (
            <Button
              type="button"
              variant="text"
              size="medium"
              onClick={handleWaitList}
              className=""
            >
              대기리스트
            </Button>
          )}
        </div>

        {invitedFamilyMembers.map((member) => (
          <div
            key={member.invitationId}
            className="bg-white rounded-lg p-4 shadow-sm mt-4"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={member.profileImageUrl || "/images/default-profile.png"}
                alt={member.name}
                className="w-16 h-16 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h2>
              </div>

              <Button
                variant="outline"
                size="small"
                onClick={handleEditProfile}
              >
                편집
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-10">
          <Button
            type="button"
            variant="primary"
            size="medium"
            onClick={handleInviteFamily}
            className="w-full"
          >
            가족 초대하기
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default FamilyMembersPage;
