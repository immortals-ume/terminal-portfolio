/**
 * ErrorState Component
 * 
 * Reusable error state component with accessibility support.
 * Displays error message with icon and optional help text.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorState 
 *   title="Error Loading Projects"
 *   message={error}
 *   helpText="Please check your internet connection and try again."
 * />
 * ```
 */

import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useThemeColors } from '@/hooks/useThemeColors';

interface ErrorStateProps {
  title?: string;
  message: string;
  helpText?: string;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Error',
  message,
  helpText,
  className = ''
}) => {
  const colors = useThemeColors();

  return (
    <div
      className={`flex flex-col gap-3 text-(--color-text-primary) ${className}`}
      style={{
        '--color-text-primary': colors.textPrimary,
        '--color-text-secondary': colors.textSecondary,
      } as React.CSSProperties}
      role="alert"
      aria-live="assertive"
    >
      <div className="text-xl flex items-center gap-2">
        <FaExclamationTriangle aria-hidden="true" />
        <span>{title}</span>
      </div>
      <div className="text-sm opacity-85 text-[var(--color-text-secondary)]">
        {message}
      </div>
      {helpText && (
        <div className="text-sm opacity-85 text-(--color-text-secondary)">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default React.memo(ErrorState);
