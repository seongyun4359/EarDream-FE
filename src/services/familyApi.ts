import axios from "axios";

export interface FamilyData {
  familyId: number;
  familyName: string;
  familyProfileImageUrl: string;
  monthlyDeadline: number;
  inviteCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyInvite {
  familyId: number;
  familyName: string;
  inviteCode: string;
}

export interface InvitationData {
  id: number;
  inviteCode: string;
  invitedUserId: number;
  status: string;
  expiresAt: string;
  createdAt: string;
  acceptedAt: string | null;
}

export interface FamilyMemberData {
  id: number;
  userId: number;
  name: string;
  profileImageUrl: string;
  relationship: string;
  role: string;
}

export interface FamilyInvitationRequestData {
  invitationId: number;
  userId: number;
  name: string;
  profileImageUrl: string;
  requestedAt: string;
}

export interface FamilyDetailData {
  familyId: number;
  familyName: string;
  familyProfileImageUrl: string;
  monthlyDeadline: number;
  inviteCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyDetailResponse {
  success: boolean;
  data: FamilyDetailData;
  message: string;
  errorCode: string | null;
  timestamp: string;
}

/* 각 API별 Response 타입 */
export interface FamilyDataResponse {
  success: boolean;
  data: FamilyData;
  message: string;
  errorCode: string | null;
  timestamp: string;
}

export interface FamilyInviteResponse {
  success: boolean;
  data: FamilyInvite;
  message: string;
  errorCode: string | null;
  timestamp: string;
}

export interface InvitationDataResponse {
  success: boolean;
  data: InvitationData;
  message: string;
  errorCode: string | null;
  timestamp: string;
}

export interface FamilyMembersResponse {
  success: boolean;
  data: FamilyMemberData[];
  message: string;
  errorCode: string | null;
  timestamp: string;
}

export interface FamilyInvitationRequestsResponse {
  success: boolean;
  data: FamilyInvitationRequestData[];
  message: string;
  errorCode: string | null;
  timestamp: string;
}

export interface FamilyDetailResponse {
  success: boolean;
  data: FamilyDetailData;
  message: string;
  errorCode: string | null;
  timestamp: string;
}

export interface EmptyDataResponse {
  success: boolean;
  data: {};
  message: string;
  errorCode: string | null;
  timestamp: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* POST - 초대 발급 */
export const inviteFamily = async (id: number) => {
  try {
    const response = await api.post<FamilyInviteResponse>(
      `/families/${id}/members/invite`
    );
    console.log(response.data);
    console.log("[POST] 초대 발급 성공 ", response.data);
    return response.data;
  } catch (error) {
    console.error("[POST] 초대 발급 에러 ", error);
    throw error;
  }
};

/* POST - 초대 수락 */
export const approveInvitation = async (
  id: number,
  invitationId: number,
  relationship: string
) => {
  try {
    const payload = {
      invitationId: invitationId,
      relationship: relationship,
    };
    const response = await api.post<FamilyInviteResponse>(
      `/families/${id}/invitations/approve`,
      payload
    );
    console.log(response.data);
    console.log("[POST] 초대 승인 성공 ", response.data);
    return response.data;
  } catch (error) {
    console.error("[POST] 초대 승인 에러 ", error);
    throw error;
  }
};

/* POST - 초대 참여 */
export const joinInvitation = async (inviteCode: string, userId: number) => {
  try {
    const payload = { inviteCode: inviteCode, userId: userId };
    const response = await api.post<FamilyDataResponse>(
      `/families/members/join`,
      payload
    );

    console.log("[POST] 초대 참여 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[POST] 초대 참여 에러:", error);
    throw error;
  }
};

/* POST - 초대 거부 */
export const rejectInvitation = async (invitationId: number) => {
  try {
    const response = await api.post<InvitationDataResponse>(
      `/families/invitations/${invitationId}/reject`
    );

    console.log("[POST] 초대 거부 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[POST] 초대 거부 에러:", error);
    throw error;
  }
};

/* GET - 멤버 목록 (리더용) */
export const getMembersList = async (id: number) => {
  try {
    const response = await api.get<FamilyMembersResponse>(
      `/families/${id}/members`
    );

    console.log("[GET] 멤버 목록 (리더용) 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[GET] 멤버 목록 (리더용) 에러:", error);
    throw error;
  }
};

/* GET - 초대 요청 목록 */
export const getInvitations = async (id: number) => {
  try {
    const response = await api.get<FamilyInvitationRequestsResponse>(
      `/families/${id}/invitations/pending`
    );

    console.log("[GET] 초대 요청 목록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[GET] 초대 요청 목록 에러:", error);
    throw error;
  }
};

/* GET - 가족 단건 조회 */
export const getUser = async (userId: number) => {
  try {
    const response = await api.get<FamilyDetailResponse>(
      `/families/user/${userId}`
    );

    if (!response.data.success || !response.data.data) {
      console.warn("[GET] 가족 단건 조회: 데이터 없음", response.data);
      return null;
    }

    console.log("[GET] 가족 단건 조회 성공:", response.data.data);
    return response.data.data as FamilyDetailData;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn("[GET] 가족 단건 조회 실패: 미존재 리소스");
      return null;
    }
    console.error("[GET] 가족 단건 조회 에러:", error);
    throw error;
  }
};

/* DELETE - 멤버 내보내기 */
export const deleteMember = async (id: number, userId: number) => {
  try {
    const response = await api.delete<EmptyDataResponse>(
      `/families/${id}/members/${userId}`
    );

    console.log("[DELETE] 멤버 내보내기 성공:", response.data.data);
    return response.data;
  } catch (error: any) {
    console.error("[DELETE] 멤버 내보내기 에러:", error);
    throw error;
  }
};
