import React from "react";
import clsx from "clsx";

export function Card({ children, className = "" }) {
  return (
    <div
      className={clsx(
        "bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={clsx("px-4 py-3 border-b border-gray-100", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={clsx("px-4 py-3", className)}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={clsx("px-4 py-3 border-t border-gray-100", className)}>
      {children}
    </div>
  );
}
