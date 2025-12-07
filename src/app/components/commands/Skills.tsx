/**
 * Skills Component
 *
 * Displays technical skills in an interactive card-based grid layout with hover effects
 * showing where each skill was used in work experience.
 *
 * Features:
 * - Card-based grid layout similar to Projects
 * - Hover effects showing skill usage in companies/projects
 * - Proficiency rating visualization
 * - Category-based organization
 * - Theme-aware styling
 * - Memoized for performance
 *
 * @component
 * @example
 * ```tsx
 * <Skills />
 * ```
 */

'use client'

import React, { useState, useCallback } from 'react';
import { skills as skillsData, workExperience } from '@/data/portfolio';
import { useThemeColors } from '@/hooks/useThemeColors';
import { 
  FaBrain, 
  FaCog, 
  FaPalette, 
  FaCloud, 
  FaDatabase, 
  FaTools, 
  FaLightbulb,
  FaBullseye,
  FaMapMarkerAlt
} from 'react-icons/fa';

interface SkillUsage {
  company: string;
  role: string;
  period: string;
  projects?: string[];
}

const Skills: React.FC = React.memo(() => {
  const colors = useThemeColors();
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const getSkillUsage = useCallback((skillName: string): SkillUsage[] => {
    const usage: SkillUsage[] = [];
    const normalizedSkillName = skillName.toLowerCase();

    workExperience.forEach((exp) => {
      if (!exp.technologies) return;

      const isUsed = exp.technologies.some((tech) =>
        tech.toLowerCase().includes(normalizedSkillName) ||
        normalizedSkillName.includes(tech.toLowerCase())
      );

      if (isUsed && exp.company) {
        usage.push({
          company: exp.company,
          role: exp.role || '',
          period: exp.period,
          projects: exp.projects?.map(p => p.name)
        });
      }
    });

    return usage;
  }, []);


  const getRatingColor = (rating: number): string => {
    if (rating >= 9) return colors.success;
    if (rating >= 7) return colors.accent;
    if (rating >= 5) return colors.warning;
    return colors.textSecondary;
  };
  const getCategoryInfo = (skillName: string) => {
    const name = skillName.toLowerCase();
    
    if (name.includes('java') || name.includes('javascript') || name.includes('typescript') || name.includes('python')) {
      return { icon: FaBrain, category: 'Language', color: colors.accent };
    }
    if (name.includes('spring') || name.includes('kafka') || name.includes('graphql') || name.includes('api')) {
      return { icon: FaCog, category: 'Backend', color: colors.success };
    }
    if (name.includes('react') || name.includes('html') || name.includes('css') || name.includes('tailwind')) {
      return { icon: FaPalette, category: 'Frontend', color: colors.warning };
    }
    if (name.includes('aws') || name.includes('azure') || name.includes('docker') || name.includes('kubernetes') || name.includes('terraform')) {
      return { icon: FaCloud, category: 'DevOps', color: '#00d4ff' };
    }
    if (name.includes('postgres') || name.includes('mysql') || name.includes('mongo') || name.includes('redis')) {
      return { icon: FaDatabase, category: 'Database', color: '#ff6b6b' };
    }
    if (name.includes('git') || name.includes('ci/cd') || name.includes('sonar') || name.includes('jest') || name.includes('junit')) {
      return { icon: FaTools, category: 'Tools', color: '#a78bfa' };
    }
    
    return { icon: FaLightbulb, category: 'Other', color: colors.textSecondary };
  };

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredSkill(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  return (
    <div 
      className="skills-container"
      style={{
        '--color-accent': colors.accent,
        '--color-text-secondary': colors.textSecondary,
      } as React.CSSProperties}
    >
      <div className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--color-accent)]">
        <FaBullseye aria-hidden="true" />
        <span>Technical Skills</span>
        <span className="text-sm opacity-70 font-normal">
          ({skillsData.length} skills)
        </span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8"
        role="list"
        aria-label={`${skillsData.length} technical skills`}
      >
        {skillsData.map((skill, index) => {
          const usage = getSkillUsage(skill.name);
          const isHovered = hoveredSkill === index;
          const categoryInfo = getCategoryInfo(skill.name);
          const ratingColor = getRatingColor(skill.rating);

          return (
            <div
              key={skill.name}
              role="listitem"
              className="skill-card relative p-4 rounded-lg border transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: isHovered ? `${colors.accent}10` : `${colors.background}80`,
                borderColor: isHovered ? colors.accent : `${colors.textSecondary}30`,
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 8px 16px ${colors.accent}20` : 'none',
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              aria-label={`${skill.name}, proficiency ${skill.rating} out of 10`}
            >
              {/* Skill Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <categoryInfo.icon className="text-xl" aria-hidden="true" />
                  <div className="flex-1">
                    <div 
                      className="font-semibold text-base"
                      style={{ color: colors.textPrimary }}
                    >
                      {skill.name}
                    </div>
                    <div 
                      className="text-xs mt-1"
                      style={{ color: categoryInfo.color }}
                    >
                      {categoryInfo.category}
                    </div>
                  </div>
                </div>
                
                {/* Rating Badge */}
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm"
                  style={{
                    backgroundColor: `${ratingColor}20`,
                    color: ratingColor,
                    border: `2px solid ${ratingColor}`,
                  }}
                  aria-label={`Rating: ${skill.rating} out of 10`}
                >
                  {skill.rating}
                </div>
              </div>

              {/* Rating Bar */}
              <div className="mb-3">
                <div 
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${colors.textSecondary}20` }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(skill.rating / 10) * 100}%`,
                      backgroundColor: ratingColor,
                    }}
                  />
                </div>
              </div>

              {/* Hover Content - Usage Information */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isHovered ? '200px' : '0',
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {usage.length > 0 ? (
                  <div className="pt-2 border-t" style={{ borderColor: `${colors.accent}30` }}>
                    <div 
                      className="text-xs font-semibold mb-2 flex items-center gap-1"
                      style={{ color: colors.accent }}
                    >
                      <FaMapMarkerAlt className="text-xs" />
                      <span>Used at:</span>
                    </div>
                    <div className="space-y-2">
                      {usage.map((use, idx) => (
                        <div 
                          key={idx}
                          className="text-xs"
                          style={{ color: colors.textPrimary }}
                        >
                          <div className="font-medium">{use.company}</div>
                          <div 
                            className="opacity-75"
                            style={{ color: colors.textSecondary }}
                          >
                            {use.period}
                          </div>
                          {use.projects && use.projects.length > 0 && (
                            <div 
                              className="text-xs mt-1 opacity-70"
                              style={{ color: colors.textSecondary }}
                            >
                              • {use.projects[0]}
                              {use.projects.length > 1 && ` +${use.projects.length - 1} more`}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div 
                    className="pt-2 text-xs opacity-70"
                    style={{ color: colors.textSecondary }}
                  >
                    Personal projects & continuous learning
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="pt-4 text-xs opacity-75 border-t text-[var(--color-text-secondary)]"
        style={{
          borderTopColor: `${colors.accent}20`,
        }}
        aria-label="Usage tip"
      >
        <FaLightbulb className="inline mr-1" /> Hover over skills to see where they were used
      </div>
    </div>
  );
});

Skills.displayName = 'Skills';

export default Skills;
