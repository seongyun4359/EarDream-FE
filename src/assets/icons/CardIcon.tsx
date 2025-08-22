import React from "react";

const CardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="w-10 h-8 text-[#018941]"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 64 40"
    {...props}
  >
    <rect
      x="1"
      y="1"
      width="62"
      height="38"
      rx="6"
      ry="6"
      className="stroke-current"
    />
    <line x1="4" y1="8" x2="60" y2="8" className="stroke-current" />
    <rect
      x="48"
      y="24"
      width="8"
      height="8"
      rx="1"
      className="stroke-current"
    />
  </svg>
);

export default CardIcon;
