import React from "react";
import clsx from "clsx";

export function Button({
  children,
  onClick,
  variant = "default",
  disabled = false,
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    //default: "mt-5 text-center bg-gradient-to-r from-amber-500 to-amber-700 text-black font-semibold py-2 rounded-xl hover:opacity-90 transition",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800 focus:ring-gray-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}
