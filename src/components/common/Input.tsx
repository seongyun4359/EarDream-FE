import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "tel" | "date";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  const baseClasses =
    "w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#016b33] transition-all duration-300 resize-none";
  const stateClasses = error
    ? "border-red-200 focus:border-red-400 bg-red-50"
    : "border-gray-200 focus:border-[#018941] bg-white hover:border-gray-300";
  const disabledClasses = disabled
    ? "bg-gray-50 cursor-not-allowed border-gray-100"
    : "";

  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={classes}
      />
      {error && (
        <p className="text-sm text-red-500 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
