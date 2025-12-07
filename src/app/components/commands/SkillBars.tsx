/**
 * SkillBars Component
 * 
 * Displays technical skills with visual proficiency bars in a terminal-style format.
 * Each skill is rated on a scale of 1-10 with ASCII bar visualization.
 * 
 * Features:
 * - ASCII progress bars (█ for filled, ░ for empty)
 * - Numeric rating display (X/10)
 * - Monospace font for alignment
 * - Theme-aware colors
 * - Top 10 skills showcase
 * 
 * @component
 * @example
 * ```tsx
 * <SkillBars />
 * ```
 */

'use client'

import {useThemeColors} from '@/hooks/useThemeColors'

export default function SkillBars() {
    const colors = useThemeColors()
    const skillBars = [
        {name: 'Java', rating: 10},
        {name: 'Spring Boot', rating: 9},
        {name: 'Kafka', rating: 9},
        {name: 'PostgreSQL', rating: 9},
        {name: 'Docker', rating: 8},
        {name: 'Kubernetes', rating: 7},
        {name: 'React', rating: 7},
        {name: 'AWS', rating: 7},
        {name: 'System Design', rating: 8},
        {name: 'DSA', rating: 8}
    ]

    /**
     * Generates an ASCII progress bar based on rating
     * 
     * @param {number} rating - Skill rating from 1-10
     * @returns {string} ASCII bar string with filled and empty blocks
     * @example
     * getBar(7) // Returns "[███████░░░]"
     */
    const getBar = (rating: number) => {
        const filled = '█'.repeat(rating)
        const empty = '░'.repeat(10 - rating)
        return `[${filled}${empty}]`
    }

    return (
        <div style={{color: colors.accent}} className="space-y-2 font-mono text-sm">
            <div className="font-bold mb-3">📊 SKILL PROFICIENCY</div>
            {skillBars.map((skill) => (
                <div key={skill.name} className="flex justify-between items-center">
                    <span style={{color: colors.textPrimary}}>{skill.name.padEnd(18)}</span>
                    <span style={{color: colors.accent}}>
            {getBar(skill.rating)} {skill.rating}/10
          </span>
                </div>
            ))}
        </div>
    )
}
