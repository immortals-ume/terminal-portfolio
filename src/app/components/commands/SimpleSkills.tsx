/**
 * SimpleSkills Component
 *
 * A simple list of skills without categories, with hover tooltips showing usage.
 */

'use client'

import React from 'react';
import { simpleSkillsData } from '@/data/skillsData';
import { useThemeColors } from '@/hooks/useThemeColors';
import { SkillTag } from '@/app/components/ui/SkillTag';

interface SimpleSkillsProps {
  className?: string;
}

const SimpleSkills: React.FC<SimpleSkillsProps> = ({ className = '' }) => {
  const colors = useThemeColors();
  
  // Flatten all skills from all categories into one simple list
  const allSkills = simpleSkillsData.categories.flatMap(category => category.skills);

  return (
    <div className={`w-full ${className}`}>
      <h1 
        className="text-2xl font-bold mb-6"
        style={{ color: colors.textPrimary }}
      >
        Technical Skills
      </h1>
      
      <div className="flex flex-wrap gap-3">
        {allSkills.map((skill) => (
          <SkillTag key={skill.name} skill={skill} />
        ))}
      </div>
      
      <div 
        className="mt-6 text-sm text-center opacity-75"
        style={{ color: colors.textSecondary }}
      >
        💡 Hover over skills to see where they were used
      </div>
    </div>
  );
};

export default SimpleSkills;