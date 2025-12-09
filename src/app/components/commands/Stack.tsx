/**
 * Stack Component
 * 
 * Displays the daily tech stack - technologies used on a regular basis.
 * Shows a card-based grid layout matching the Skills component style.
 * 
 * Features:
 * - Card-based grid layout
 * - Hover effects
 * - Theme-aware styling
 * - Category icons
 * - Quick reference for current tech stack
 * 
 * @component
 * @example
 * ```tsx
 * <Stack />
 * ```
 */

'use client'

import React from 'react';
import {skills} from '@/data/portfolio'
import {useThemeColors} from '@/hooks/useThemeColors'
import { useHoverState } from '@/hooks/useHoverState';
import { 
  FaBrain, 
  FaCog, 
  FaPalette, 
  FaCloud, 
  FaDatabase, 
  FaTools, 
  FaLightbulb,
  FaLayerGroup
} from 'react-icons/fa';

const Stack: React.FC = React.memo(() => {
    const colors = useThemeColors()
    const { handleEnter, handleLeave, isHovered } = useHoverState<number>();
    const dailyStack = skills.filter(skill => skill.rating >= 8).map(skill => skill.name);

    const getCategoryInfo = (stackItem: string) => {
        const name = stackItem.toLowerCase();
        
        if (name.includes('java') || name.includes('javascript') || name.includes('typescript') || name.includes('python')) {
            return { icon: FaBrain, category: 'Language', color: colors.accent };
        }
        if (name.includes('spring') || name.includes('kafka') || name.includes('graphql') || name.includes('api')) {
            return { icon: FaCog, category: 'Backend', color: colors.success };
        }
        if (name.includes('react') || name.includes('html') || name.includes('css') || name.includes('tailwind') || name.includes('next')) {
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

    return (
        <div 
            className="stack-container"
            style={{
                '--color-accent': colors.accent,
                '--color-text-secondary': colors.textSecondary,
            } as React.CSSProperties}
        >
            <div className="text-xl font-bold mb-6 flex items-center gap-2 text-(--color-accent)">
                <FaLayerGroup aria-hidden="true" />
                <span>Daily Tech Stack</span>
                <span className="text-sm opacity-70 font-normal">
                    ({dailyStack.length} technologies)
                </span>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8"
                role="list"
                aria-label={`${dailyStack.length} daily technologies`}
            >
                {dailyStack.map((stackItem, index) => {
                    const stackIsHovered = isHovered(index);
                    const categoryInfo = getCategoryInfo(stackItem);

                    return (
                        <div
                            key={stackItem}
                            role="listitem"
                            className="stack-card relative p-4 rounded-lg border transition-all duration-300 cursor-pointer"
                            style={{
                                backgroundColor: stackIsHovered ? `${colors.accent}10` : `${colors.bgSecondary}80`,
                                borderColor: stackIsHovered ? colors.accent : `${colors.textSecondary}30`,
                                transform: stackIsHovered ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: stackIsHovered ? `0 8px 16px ${colors.accent}20` : 'none',
                            }}
                            onMouseEnter={() => handleEnter(index)}
                            onMouseLeave={handleLeave}
                            tabIndex={0}
                            aria-label={stackItem}
                        >
                            <div className="flex items-center gap-3">
                                <categoryInfo.icon 
                                    className="text-2xl" 
                                    style={{ color: categoryInfo.color }}
                                    aria-hidden="true" 
                                />
                                <div className="flex-1">
                                    <div 
                                        className="font-semibold text-base"
                                        style={{ color: colors.textPrimary }}
                                    >
                                        {stackItem}
                                    </div>
                                    <div 
                                        className="text-xs mt-1"
                                        style={{ color: categoryInfo.color }}
                                    >
                                        {categoryInfo.category}
                                    </div>
                                </div>
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
                <FaLightbulb className="inline mr-1" /> Technologies I use daily in my work
            </div>
        </div>
    )
});

Stack.displayName = 'Stack';

export default Stack;
