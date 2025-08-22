import React from "react";

interface RelationShipSelectProps {
  value: string;
  className: string;
  onChange: (value: string) => void;
}

const RelationShipSelect: React.FC<RelationShipSelectProps> = ({
  value,
  className,
  onChange,
}) => {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        <option value="">관계를 선택해주세요</option>
        <option value="부모">부모</option>
        <option value="배우자">배우자</option>
        <option value="자녀">자녀</option>
        <option value="형제자매">형제/자매</option>
        <option value="할머니">할머니</option>
        <option value="할아버지">할아버지</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
};

export default RelationShipSelect;
