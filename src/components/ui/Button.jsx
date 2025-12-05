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
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all focus:outline-none disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-900 shadow-md hover:bg-amber-500 hover:text-gray-200 active:scale-[0.97]",
    secondary:
      "bg-gray-900 border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-all active:scale-[0.97]",
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
