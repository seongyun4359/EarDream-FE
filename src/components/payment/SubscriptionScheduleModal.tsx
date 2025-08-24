import React from "react";
import type { SubscriptionSchedule } from "../../types/payment";

interface SubscriptionScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (schedule: SubscriptionSchedule) => void;
  currentSchedule: SubscriptionSchedule;
}

const SubscriptionScheduleModal: React.FC<SubscriptionScheduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentSchedule,
}) => {
  const [schedule, setSchedule] =
    React.useState<SubscriptionSchedule>(currentSchedule);

  const handleConfirm = () => {
    onConfirm(schedule);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-[#2c2c2c] mb-4">
          구독 주기 변경
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            주차 선택
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setSchedule((prev) => ({
                  ...prev,
                  week: "2nd",
                }))
              }
              className={`px-4 py-2 rounded-lg border transition-colors ${
                schedule.week === "2nd"
                  ? "border-[#018941] bg-[#018941] text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              2째주
            </button>
            <button
              type="button"
              onClick={() =>
                setSchedule((prev) => ({
                  ...prev,
                  week: "4th",
                }))
              }
              className={`px-4 py-2 rounded-lg border transition-colors ${
                schedule.week === "4th"
                  ? "border-[#018941] bg-[#018941] text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              4째주
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            요일 선택
          </label>
          <div className="px-4 py-2 rounded-lg border border-[#018941] bg-[#018941] text-white">
            일요일
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-[#018941] text-white rounded-lg hover:bg-[#016b31] transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScheduleModal;
