/**
 * LoadingState Component
 * 
 * Reusable loading state component with accessibility support.
 * Displays a spinner and customizable loading message.
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingState message="Loading projects..." />
 * ```
 */

import React from 'react';
import { FaSync } from 'react-icons/fa';
import { useThemeColors } from '@/hooks/useThemeColors';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  className = '' 
}) => {
  const colors = useThemeColors();

  return (
    <div
      className={`flex items-center gap-2 text-base text-[var(--color-accent)] ${className}`}
      style={{
        '--color-accent': colors.accent,
      } as React.CSSProperties}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <FaSync className="animate-spin" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

export default React.memo(LoadingState);
