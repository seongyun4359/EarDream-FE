import { create } from "zustand";

export interface FamilyMember {
  invitationId: number;
  userId: number;
  name: string;
  profileImageUrl: string;
  requestedAt: string;
}

interface FamilyState {
  inviteCode: string;
  invitedFamilyMembers: FamilyMember[];
  setInviteCode: (code: string) => void;
  setInvitedFamilyMembers: (members: FamilyMember[]) => void;
}

export const useFamilyStore = create<FamilyState>((set) => ({
  inviteCode: "",
  invitedFamilyMembers: [
    {
      invitationId: 101,
      userId: 1,
      name: "김아빠",
      profileImageUrl: "/api/placeholder/80/80",
      requestedAt: "2025-08-24T12:00:00.000Z",
    },
    {
      invitationId: 102,
      userId: 2,
      name: "이엄마",
      profileImageUrl: "/api/placeholder/80/80",
      requestedAt: "2025-08-24T12:05:00.000Z",
    },
    {
      invitationId: 103,
      userId: 3,
      name: "김동생",
      profileImageUrl: "/api/placeholder/80/80",
      requestedAt: "2025-08-24T12:10:00.000Z",
    },
  ],
  setInviteCode: (code) => set({ inviteCode: code }),
  setInvitedFamilyMembers: (members) => set({ invitedFamilyMembers: members }),
}));
