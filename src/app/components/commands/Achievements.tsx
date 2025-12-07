/**
 * Achievements Component
 *
 * Displays professional achievements and milestones in a grid layout
 * with hover effects, similar to Projects and Certifications components.
 *
 * Features:
 * - Responsive grid layout
 * - Hover effects with animations
 * - Achievement categories and metrics
 * - Theme-aware styling
 * - Memoized for performance
 *
 * @component
 * @example
 * ```tsx
 * <Achievements />
 * ```
 */

'use client'

import React from "react";
import {useThemeColors} from "@/hooks/useThemeColors";
import {achievements} from "@/data/portfolio";
import { 
  FaRocket, 
  FaBolt, 
  FaLock, 
  FaBroadcastTower, 
  FaCreditCard, 
  FaCheckCircle,
  FaTrophy,
  FaChartBar,
  FaCalendar,
  FaLightbulb
} from 'react-icons/fa';

// Icon mapping
const iconMap: Record<string, React.ComponentType> = {
  FaRocket,
  FaBolt,
  FaLock,
  FaBroadcastTower,
  FaCreditCard,
  FaCheckCircle
};

const Achievements: React.FC = React.memo(() => {
    const colors = useThemeColors();

    return (
        <div className="achievements-container">
            <div
                className="text-xl font-bold mb-6 flex items-center gap-2"
                style={{color: colors.accent}}
            >
                <FaTrophy aria-hidden="true" />
                <span>Key Achievements</span>
                <span className="text-sm opacity-70 font-normal">
          ({achievements.length} milestones)
        </span>
            </div>

            <div
                className="skills-grid mb-8"
                role="list"
                aria-label={`${achievements.length} professional achievements`}
            >
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="group p-4 rounded-lg border transition-all duration-300 ease-out cursor-pointer relative animate-[fadeInUp_0.3s_ease-out_forwards] opacity-0 flex flex-col gap-3 hover:-translate-y-0.5"
                        style={{
                            borderColor: colors.accent,
                            backgroundColor: colors.bgSecondary,
                            animationDelay: `${index * 0.05}s`,
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 4px 12px ${colors.neonSoft}`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        role="listitem"
                    >
                        <div
                            className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-xs font-semibold border"
                            style={{
                                backgroundColor: `${colors.accent}20`,
                                borderColor: colors.accent,
                                color: colors.accent,
                            }}
                        >
                            #{index + 1}
                        </div>

                        <div className="text-[2rem] mb-2">
                            {React.createElement(iconMap[achievement.icon] || FaCheckCircle)}
                        </div>

                        <div
                            className="text-base font-semibold pr-10"
                            style={{color: colors.textPrimary}}
                        >
                            {achievement.title}
                        </div>

                        <div
                            className="text-[0.7rem] px-1.5 py-0.5 rounded inline-block border"
                            style={{
                                color: colors.accent,
                                backgroundColor: `${colors.accent}10`,
                                borderColor: `${colors.accent}30`,
                            }}
                        >
                            {achievement.category}
                        </div>

                        <div
                            className="text-sm leading-6 flex-1"
                            style={{color: colors.textSecondary}}
                        >
                            {achievement.description}
                        </div>

                        <div
                            className="text-sm font-semibold pt-2 border-t flex items-center gap-1"
                            style={{
                                color: colors.accent,
                                borderTopColor: `${colors.accent}20`,
                            }}
                        >
                            <FaChartBar /> {achievement.impact}
                        </div>

                        {/* Optional date */}
                        {achievement.date && (
                            <div
                                className="text-[0.7rem] opacity-80 flex items-center gap-1"
                                style={{color: colors.textSecondary}}
                            >
                                <FaCalendar /> {achievement.date}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div
                className="pt-4 text-xs opacity-75 border-t"
                style={{
                    borderTopColor: `${colors.accent}20`,
                    color: colors.textSecondary,
                }}
                aria-label="Usage tip"
            >
                <FaLightbulb className="inline mr-1" /> Hover over achievements for enhanced view • Type 'help' for more commands
            </div>
        </div>
    );
});

Achievements.displayName = 'Achievements';

export default Achievements;
