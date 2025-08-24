import React from "react";

const OpenBoxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="w-10 h-10 text-[#018941]"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 64 64"
    {...props}
  >
    <path d="M8 20L32 8l24 12-24 12-24-12z" className="stroke-current" />
    <path d="M8 20v24l24 12 24-12V20" className="stroke-current" />
    <line x1="32" y1="32" x2="32" y2="56" className="stroke-current" />
  </svg>
);

export default OpenBoxIcon;
