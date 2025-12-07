'use client'

import {skillDetails} from '@/data/skillsData'
import {useThemeColors} from '@/hooks/useThemeColors'

interface SkillProps {
    skillName?: string
}

export default function Skill({skillName = 'springboot'}: SkillProps) {
    const colors = useThemeColors()
    const key = skillName.toLowerCase()
    const detail = skillDetails[key]

    if (!detail) {
        return (
            <div style={{color: colors.error}}>
                Skill "{skillName}" not found.
                <div style={{color: colors.textPrimary}} className="mt-2 text-sm">
                    Try: springboot, kafka, react, java, aws, docker, kubernetes, postgres
                </div>
            </div>
        )
    }

    return (
        <div style={{color: colors.accent}} className="space-y-2 whitespace-pre-line">
            {detail}
        </div>
    )
}
