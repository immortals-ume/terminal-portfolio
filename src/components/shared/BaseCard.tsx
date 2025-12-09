/**
 * BaseCard Component
 * 
 * Reusable card component with hover effects, animations, and consistent styling.
 * Reduces duplication across ProjectCard, SkillCard, CertificationCard, etc.
 */

'use client';

import React, { ReactNode } from 'react';
import { ThemeColors } from '@/lib/themeColors';

export interface BaseCardProps {
  /** Card content */
  children: ReactNode;
  /** Index for staggered animation */
  index?: number;
  /** Whether card is hovered */
  isHovered?: boolean;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Theme colors */
  colors: ThemeColors;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Border width (1 or 2) */
  borderWidth?: 1 | 2;
  /** Whether to show gradient background */
  gradient?: boolean;
  /** ARIA role */
  role?: string;
  /** ARIA label */
  ariaLabel?: string;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  index = 0,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  colors,
  className = '',
  style = {},
  borderWidth = 1,
  gradient = false,
  role = 'listitem',
  ariaLabel,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={role}
      aria-label={ariaLabel}
      className={`
        p-4 rounded-lg transition-all duration-300 ease-out cursor-pointer relative
        animate-[fadeInUp_0.3s_ease-out_forwards] opacity-0
        ${isHovered ? '-translate-y-0.5' : 'translate-y-0'}
        ${className}
      `}
      style={{
        borderWidth: `${borderWidth}px`,
        borderStyle: 'solid',
        borderColor: colors.accent,
        backgroundColor: colors.bgSecondary,
        boxShadow: isHovered ? `0 4px 12px ${colors.neonSoft}` : 'none',
        animationDelay: `${index * 0.05}s`,
        background: gradient
          ? `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`
          : colors.bgSecondary,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
