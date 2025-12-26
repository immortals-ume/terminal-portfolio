/**
 * Skills Component
 *
 * A simple list of skills without categories, with hover tooltips showing usage.
 */

'use client'

import React from 'react';
import { getAllSkills } from '@/data/skillsData';
import { useThemeColors } from '@/hooks/useThemeColors';
import { SkillTag } from '@/app/components/ui/SkillTag';

interface SimpleSkillsProps {
  className?: string;
}

const Skills: React.FC<SimpleSkillsProps> = ({ className = '' }) => {
  const colors = useThemeColors();

  return (
    <div className={`w-full ${className}`}>
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: colors.textPrimary }}
      >
        Technical Skills
      </h1>

      <div className="flex flex-wrap gap-3">
        {getAllSkills().map(skill => (
          <SkillTag key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;