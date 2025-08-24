import { create } from "zustand";

export interface Payment {
  id: number;
  label: string;
  cardNumber: string;
  isBasic: boolean;
  iconColor: string;
  date: string;
}

interface PaymentState {
  payments: Payment[];
  inviteCode: string;
  setPayments: (payments: Payment[]) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  inviteCode: "",
  payments: [
    {
      id: 1,
      label: "신한카드",
      cardNumber: "**** - **** - **** - 1234",
      isBasic: true,
      iconColor: "#018941",
      date: "08/29",
    },
    {
      id: 2,
      label: "국민카드",
      cardNumber: "**** - **** - **** - 5678",
      isBasic: false,
      iconColor: "#016b33",
      date: "09/10",
    },
    {
      id: 3,
      label: "카카오뱅크 카드",
      cardNumber: "**** - **** - **** - 9012",
      isBasic: false,
      iconColor: "#feca1b",
      date: "09/15",
    },
  ],
  setPayments: (payments) => set({ payments }),
}));
