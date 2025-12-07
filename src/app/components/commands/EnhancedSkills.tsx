/**
 * EnhancedSkills Component
 *
 * Displays skills in a responsive grid layout with proficiency indicators.
 * Features theme-aware styling, responsive design, and category organization.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

'use client';

import {useThemeColors} from '@/hooks/useThemeColors';
import {skillsDataEnhanced} from '@/data/skillsDataEnhanced';
import {SkillCard} from '@/app/components/ui/SkillCard';

export default function EnhancedSkills() {
    const colors = useThemeColors();

    return (
        <div className="enhanced-skills-container">
            {/* Header */}
            <div
                style={{
                    color: colors.accent,
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem'
                }}
            >
                🧠 Technical Skills
            </div>

            {/* Categories with Grid Layout */}
            {skillsDataEnhanced.categories.map((category, categoryIndex) => (
                <div key={category.name} style={{marginBottom: '2rem'}}>
                    {/* Category Header */}
                    <div
                        style={{
                            color: colors.accent,
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>{category.icon}</span>
                        <span>{category.name.toUpperCase()}</span>
                    </div>

                    {/* Skills Grid */}
                    <div className="skills-grid">
                        {category.skills.map((skill, skillIndex) => {
                            const globalIndex = categoryIndex * 10 + skillIndex;
                            return (
                                <SkillCard
                                    key={skill.name}
                                    skill={skill}
                                    index={globalIndex}
                                    isDaily={skill.isDaily}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Footer Help Text */}
            <div
                className="mt-6 pt-4"
                style={{
                    borderTop: `1px solid ${colors.accent}20`,
                    color: colors.textSecondary,
                    fontSize: '0.75rem',
                    opacity: 0.75
                }}
            >
                💡 Hover over skills for more details
            </div>
        </div>
    );
}
