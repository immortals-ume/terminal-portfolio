/**
 * SkillTag Component
 *
 * A simple skill tag with hover tooltip showing where the technology was used.
 */

'use client';

import React from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { SimpleSkill, getTechIcon } from '@/data/skillsData';
import { getTechIcon as getIcon } from '@/data/skillsData';

export interface SkillTagProps {
  skill: SimpleSkill;
  className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, className = '' }) => {
  const colors = useThemeColors();
  const techIcon = getIcon(skill.name, colors.textSecondary);

  return (
    <div
      className={`relative inline-block p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      style={{
        backgroundColor: colors.bgSecondary,
        borderColor: colors.accent,
        color: colors.textPrimary
      }}
      title={skill.role}
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
      
      {/* Hover tooltip */}
      {skill.role && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-md text-sm opacity-0 pointer-events-none transition-opacity duration-300 hover:opacity-100 z-10 whitespace-nowrap max-w-xs"
          style={{
            backgroundColor: colors.bgPrimary,
            color: colors.textPrimary,
            border: `1px solid ${colors.accent}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          {skill.role}
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: colors.bgPrimary }}
          />
        </div>
      )}
    </div>
  );
};

export { SkillTag };