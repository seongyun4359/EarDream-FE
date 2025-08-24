import { create } from "zustand";

interface UserState {
  familyId: number;
  userId: number;
  userName?: string;
  userEmail?: string;
  userProfileImageUrl?: string;
  familyName: string;
  familyProfileImageUrl: string;
  monthlyDeadline: number;
  status: string;
  setUserState: (state: Partial<UserState>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  familyId: 47,
  userId: 5,
  userName: "김가족",
  userEmail: "family@example.com",
  userProfileImageUrl: "",
  familyName: "",
  familyProfileImageUrl: "",
  monthlyDeadline: 0,
  status: "",
  setUserState: (state) => set((prev) => ({ ...prev, ...state })),
}));
