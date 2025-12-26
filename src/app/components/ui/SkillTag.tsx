/**
 * SkillTag Component
 *
 * A simple skill tag displaying technology skills in an ATS-friendly format.
 */

'use client';

import React from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { Skill } from '@/data/skillsData';
import { getTechIcon as getIcon } from '@/data/skillsData';

export interface SkillTagProps {
  skill: Skill;
  className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, className = '' }) => {
  const colors = useThemeColors();
  const techIcon = getIcon(skill.name, colors.textSecondary);

  return (
    <div
      className={`inline-block p-3 rounded-lg border-2 ${className}`}
      style={{
        backgroundColor: colors.bgSecondary,
        borderColor: colors.accent,
        color: colors.textPrimary
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <techIcon.icon 
          className="text-lg" 
          style={{ color: techIcon.color }}
          aria-hidden="true"
        />
        <div className="font-semibold">{skill.name}</div>
      </div>
      <div className="text-sm opacity-75 ml-6">
        {skill.level} • {skill.years}
      </div>
      <div className="text-xs opacity-60 ml-6" style={{ color: techIcon.color }}>
        {techIcon.category}
      </div>
    </div>
  );
};

export { SkillTag };