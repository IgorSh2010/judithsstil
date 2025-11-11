import clsx from "clsx";
export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 text-black shadow-md hover:brightness-150 active:scale-[0.97] focus:ring-amber-400",
    secondary:
      "bg-gray-900 border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-all active:scale-[0.97] focus:ring-gray-600",
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
