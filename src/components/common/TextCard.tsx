import React from "react";

interface TextCardItem {
  label: string;
  value: string;
  valueColor?: string;
}

interface TextCardProps {
  items: TextCardItem[];
  className?: string;
}

const TextCard: React.FC<TextCardProps> = ({ items, className }) => {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span className="text-gray-600">{item.label}</span>
            <span
              className={item.valueColor ? item.valueColor : "text-gray-900"}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCard;
