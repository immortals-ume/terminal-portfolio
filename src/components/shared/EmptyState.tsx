/**
 * EmptyState Component
 * 
 * Reusable empty state component with accessibility support.
 * Displays when no data is available with customizable icon and message.
 * 
 * @component
 * @example
 * ```tsx
 * <EmptyState 
 *   icon={FaInbox}
 *   title="No projects available"
 *   message="Projects will appear here when repositories are available."
 * />
 * ```
 */

import React from 'react';
import { IconType } from 'react-icons';
import { FaInbox } from 'react-icons/fa';
import { useThemeColors } from '@/hooks/useThemeColors';

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  message?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon = FaInbox,
  title,
  message,
  className = ''
}) => {
  const colors = useThemeColors();

  return (
    <div
      className={`flex flex-col gap-2 text-(--color-text-primary) ${className}`}
      style={{
        '--color-text-primary': colors.textPrimary,
        '--color-text-secondary': colors.textSecondary,
      } as React.CSSProperties}
      role="status"
      aria-live="polite"
    >
      <div className="text-xl mb-2 flex items-center gap-2">
        <Icon aria-hidden="true" /> {title}
      </div>
      {message && (
        <div className="text-sm opacity-75 text-(--color-text-secondary)">
          {message}
        </div>
      )}
    </div>
  );
};

export default React.memo(EmptyState);
