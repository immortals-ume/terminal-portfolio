/**
 * ProgressBar Component
 *
 * A visual progress indicator that displays proficiency levels with smooth animations
 * and theme-aware styling. Maps proficiency levels to percentage fills.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

'use client';

import {useThemeColors} from '@/hooks/useThemeColors';
import {proficiencyConfig} from '@/data/skillsDataEnhanced';
import type {ProficiencyLevel} from '@/lib/types';
import {useEffect, useState} from 'react';

export interface ProgressBarProps {
    proficiency: ProficiencyLevel;
    animated?: boolean;
    className?: string;
}

/**
 * ProgressBar component that visualizes skill proficiency levels
 *
 * @param proficiency - The proficiency level (Expert, Advanced, Intermediate, Beginner)
 * @param animated - Whether to animate the fill on mount (default: true)
 * @param className - Additional CSS classes for styling
 */
export function ProgressBar({
                                proficiency,
                                animated = true,
                                className = ''
                            }: ProgressBarProps) {
    const colors = useThemeColors();
    const [isMounted, setIsMounted] = useState(false);
    const percentage = proficiencyConfig[proficiency].percentage;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fillWidth = (animated && !isMounted) ? 0 : percentage;

    return (
        <div
            className={`progress-bar-container h-1 rounded-sm overflow-hidden w-full relative ${className}`}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${proficiency} proficiency: ${percentage}%`}
            style={{
                backgroundColor: colors.bgPrimary,
            }}
        >
            <div
                className={`progress-bar-fill h-full rounded-sm relative ${animated ? 'transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]' : ''}`}
                style={{
                    width: `${fillWidth}%`,
                    backgroundColor: colors.accent,
                    boxShadow: `0 0 8px ${colors.neonSoft}`,
                }}
            />
        </div>
    );
}
