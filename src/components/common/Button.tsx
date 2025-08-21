import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "secondaryOutline"
    | "outline"
    | "danger"
    | "dangerOutline"
    | "text";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";

  const variantClasses = {
    primary:
      "bg-[#018941] hover:bg-[#017a3a] text-white focus:ring-[#016b33] shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300 shadow-sm hover:shadow-md",
    secondaryOutline:
      "bg-white text-gray-600 border-2 border-gray-400 hover:bg-gray-200 focus:ring-gray-400 shadow-sm hover:shadow-md",
    outline:
      "border-2 border-[#018941] text-[#018941] hover:bg-[#018941]/5 focus:ring-[#016b33] shadow-sm hover:shadow-md",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 shadow-sm hover:shadow-md",
    dangerOutline:
      "bg-white text-red-500 border-2 border-red-500 hover:bg-red-50 focus:ring-red-400 shadow-sm hover:shadow-md",
    text: "bg-transparent text-gray-500 hover:text-gray-700 focus:ring-gray-500 shadow-none px-0 py-0",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-6 py-3 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed active:scale-100"
    : "cursor-pointer";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
