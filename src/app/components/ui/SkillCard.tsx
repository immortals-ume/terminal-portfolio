/**
 * SkillCard Component
 *
 * Displays an individual skill with proficiency level, progress bar, and hover effects.
 * Features theme-aware styling, smooth animations, and visual distinction for daily stack skills.
 *
 * @component
 * @example
 * ```tsx
 * <SkillCard
 *   skill={{
 *     name: "TypeScript",
 *     proficiency: "Advanced",
 *     yearsOfExperience: 3,
 *     description: "Type-safe development"
 *   }}
 *   index={0}
 *   isDaily={true}
 *   onHover={(name) => console.log(name)}
 * />
 * ```
 */

'use client';

import React, { useState, useCallback } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { proficiencyConfig } from '@/data/skillsDataEnhanced';
import type { Skill } from '@/lib/types';
import { ProgressBar } from './ProgressBar';
import { HoverTooltip } from './HoverTooltip';

/**
 * Props for the SkillCard component
 */
export interface SkillCardProps {
  /** The skill data to display */
  skill: Skill;
  /** Index of the skill in the list (for animation delay) */
  index: number;
  /** Whether this skill is part of the daily tech stack */
  isDaily?: boolean;
  /** Callback when hover state changes */
  onHover?: (skillName: string | null) => void;
}



/**
 * SkillCard component displays a single skill with proficiency indicators,
 * progress bar, and hover tooltip.
 *
 * Features:
 * - Proficiency level indicator with icon
 * - Animated progress bar
 * - Hover effects with elevation and glow
 * - Tooltip with years of experience and description
 * - Visual distinction for daily stack skills
 * - Staggered animation on mount
 * - Memoized for performance optimization
 *
 * @param props - Component props
 * @returns Rendered skill card
 */
const SkillCard: React.FC<SkillCardProps> = React.memo(({
  skill,
  index,
  isDaily = false,
  onHover
}) => {
  const colors = useThemeColors();
  const [isHovered, setIsHovered] = useState(false);

  const proficiencyInfo = proficiencyConfig[skill.proficiency];

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover?.(skill.name);
  }, [skill.name, onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHover?.(null);
  }, [onHover]);

  return (
    <div
      className={`skill-card p-4 rounded-lg transition-all duration-300 ease-out cursor-pointer relative animate-[fadeInUp_0.3s_ease-out_forwards] opacity-0 ${isHovered ? '-translate-y-0.5' : 'translate-y-0'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
      aria-label={`${skill.name} - ${proficiencyInfo.label} proficiency`}
      style={{
        borderWidth: isDaily ? '2px' : '1px',
        borderStyle: 'solid',
        borderColor: colors.accent,
        backgroundColor: colors.bgSecondary,
        boxShadow: isHovered ? `0 4px 12px ${colors.neonSoft}` : 'none',
        animationDelay: `${index * 0.05}s`,
        background: isDaily
          ? `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`
          : colors.bgSecondary,
      }}
    >
      {/* Skill Name and Icon */}
      <div
        className="text-base font-semibold mb-2 flex items-center gap-2"
        style={{
          color: colors.textPrimary,
        }}
      >
        <span className="text-[1.2rem]">
          {proficiencyInfo.icon}
        </span>
        <span>{skill.name}</span>
      </div>

      {/* Proficiency Badge */}
      <div
        className="inline-block py-1 px-2 rounded text-xs font-medium mb-3 uppercase tracking-wider"
        style={{
          backgroundColor: `${colors.accent}20`,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colors.accent,
          color: colors.accent,
        }}
      >
        {proficiencyInfo.label}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        proficiency={skill.proficiency}
        animated={true}
      />

      {/* Daily Stack Indicator */}
      {isDaily && (
        <div
          className="absolute top-2 right-2 text-base opacity-80"
          title="Daily Tech Stack"
          aria-label="Part of daily tech stack"
        >
          💼
        </div>
      )}

      {/* Hover Tooltip */}
      <HoverTooltip
        isVisible={isHovered}
        yearsOfExperience={skill.yearsOfExperience}
        description={skill.description}
        position="top"
      />
    </div>
  );
});

// Set display name for better debugging
SkillCard.displayName = 'SkillCard';

export { SkillCard };
