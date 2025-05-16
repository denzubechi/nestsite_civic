import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  label?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'text-primary', className, label = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  return (
    <div role="status" className={cn('inline-block', sizeClasses[size], className)}>
      <svg
        className={`animate-spin ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4zM12 4a8 8 0 018 8h-8V4z"
        />
      </svg>
      <VisuallyHidden>{label}</VisuallyHidden>
    </div>
  );
};

export default Spinner;
