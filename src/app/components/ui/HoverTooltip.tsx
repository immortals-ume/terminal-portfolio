/**
 * HoverTooltip Component
 *
 * Displays additional skill information on hover, including years of experience
 * and skill description. Features smooth fade-in/fade-out animations and smart
 * positioning above or below the parent element.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

'use client';

import {useThemeColors} from '@/hooks/useThemeColors';
import {useEffect, useState} from 'react';

export interface HoverTooltipProps {
    /** Whether the tooltip should be visible */
    isVisible: boolean;
    /** Years of experience to display */
    yearsOfExperience?: number;
    /** Skill description to display */
    description?: string;
    /** Position preference: 'top' or 'bottom' (default: 'top') */
    position?: 'top' | 'bottom';
    /** Additional CSS classes */
    className?: string;
}

/**
 * HoverTooltip component that shows additional skill details on hover
 *
 * @param isVisible - Controls tooltip visibility
 * @param yearsOfExperience - Years of experience with the skill
 * @param description - Detailed description of the skill
 * @param position - Preferred position relative to parent (top or bottom)
 * @param className - Additional CSS classes for styling
 */
export function HoverTooltip({
                                 isVisible,
                                 yearsOfExperience,
                                 description,
                                 position = 'top',
                                 className = ''
                             }: HoverTooltipProps) {
    const colors = useThemeColors();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!yearsOfExperience && !description) {
        return null;
    }

    if (!isMounted || !isVisible) {
        return null;
    }

    const positionStyles = position === 'top'
        ? {
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
        }
        : {
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
        };

    const arrowStyles = position === 'top'
        ? {
            top: '100%',
            borderTop: `6px solid ${colors.accent}`,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
        }
        : {
            bottom: '100%',
            borderBottom: `6px solid ${colors.accent}`,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
        };

    return (
        <div
            className={`hover-tooltip ${className}`}
            style={{
                position: 'absolute',
                ...positionStyles,
                zIndex: 1000,
                minWidth: '200px',
                maxWidth: '300px',
                padding: '0.75rem',
                backgroundColor: colors.bgPrimary,
                border: `1px solid ${colors.accent}`,
                borderRadius: '0.375rem',
                boxShadow: `0 4px 12px ${colors.neonSoft}, 0 0 20px ${colors.neonSoft}40`,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out',
                pointerEvents: 'none',
            }}
        >
            {yearsOfExperience !== undefined && (
                <div
                    style={{
                        color: colors.accent,
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: description ? '0.5rem' : '0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem'
                    }}
                >
                    <span>⏱️</span>
                    <span>{yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'} of experience</span>
                </div>
            )}
            {description && (
                <div
                    style={{
                        color: colors.textSecondary,
                        fontSize: '0.8125rem',
                        lineHeight: '1.5',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word'
                    }}
                >
                    {description}
                </div>
            )}

            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    ...arrowStyles
                }}
            />
        </div>
    );
}
