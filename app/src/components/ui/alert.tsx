import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "default" | "destructive" | "success";
  className?: string;
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  variant = "default",
  className,
  title,
  description,
  children,
}) => {
  const baseClasses = cn(
    "relative w-full rounded-md border",
    "p-4",
    "focus:outline-none",
    "transition-colors duration-200",
    {
      "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100":
        variant === "default",
      "border-red-500 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-900 dark:text-red-100":
        variant === "destructive",
      "border-green-500 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-100":
        variant === "success", // Styling for success
    },
    className
  );

  return (
    <div className={baseClasses} role="alert">
      {title && (
        <h4
          className={cn("mb-1 font-semibold", {
            "text-red-800 dark:text-red-100": variant === "destructive",
            "text-green-800 dark:text-green-100": variant === "success", //success variant
            "text-gray-800 dark:text-gray-100": variant === "default",
          })}
        >
          {title}
        </h4>
      )}
      {description && (
        <div
          className={cn("text-sm", {
            "text-red-700 dark:text-red-200": variant === "destructive",
            "text-green-700 dark:text-green-200": variant === "success", // success variant
            "text-gray-700 dark:text-gray-300": variant === "default",
          })}
        >
          {description}
        </div>
      )}
      {children}
    </div>
  );
};

const AlertTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);
const AlertDescription: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export { Alert, AlertTitle, AlertDescription };
