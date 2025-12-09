/**
 * Style Utilities
 * 
 * Common styling functions and CSS variable generators used across components.
 * Helps maintain consistent styling patterns and reduce code duplication.
 */

import { ThemeColors } from '@/hooks/useThemeColors';

/**
 * Creates CSS custom properties object from theme colors
 * 
 * @param colors - Theme colors object
 * @returns CSS properties object with custom variables
 */
export function createCSSVariables(colors: ThemeColors): React.CSSProperties {
  return {
    '--color-accent': colors.accent,
    '--color-text-primary': colors.textPrimary,
    '--color-text-secondary': colors.textSecondary,
    '--color-bg-primary': colors.bgPrimary,
    '--color-bg-secondary': colors.bgSecondary,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
  } as React.CSSProperties;
}

/**
 * Gets hover styles for card components
 * 
 * @param isHovered - Whether the card is currently hovered
 * @param colors - Theme colors object
 * @returns Style object for hover state
 */
export function getHoverStyles(isHovered: boolean, colors: ThemeColors) {
  return {
    backgroundColor: isHovered ? `${colors.accent}10` : `${colors.bgSecondary}80`,
    borderColor: isHovered ? colors.accent : `${colors.textSecondary}30`,
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isHovered ? `0 8px 16px ${colors.accent}20` : 'none',
  };
}

/**
 * Gets complete card styles including hover state
 * 
 * @param colors - Theme colors object
 * @param isHovered - Whether the card is currently hovered
 * @returns Complete style object for card
 */
export function getCardStyles(colors: ThemeColors, isHovered: boolean) {
  return {
    ...getHoverStyles(isHovered, colors),
    transition: 'all 0.3s ease',
  };
}

/**
 * Creates animation delay style for staggered animations
 * 
 * @param index - Index of the item in the list
 * @param delayMs - Delay in milliseconds per item (default: 50ms)
 * @returns Style object with animation delay
 */
export function getAnimationDelay(index: number, delayMs: number = 50): React.CSSProperties {
  return {
    animationDelay: `${index * delayMs}ms`,
  } as React.CSSProperties;
}

/**
 * Creates a gradient background style
 * 
 * @param color1 - First color
 * @param color2 - Second color
 * @param angle - Gradient angle in degrees (default: 135)
 * @returns Style object with gradient background
 */
export function createGradient(color1: string, color2: string, angle: number = 135): React.CSSProperties {
  return {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  } as React.CSSProperties;
}

/**
 * Adds opacity to a hex color
 * 
 * @param hex - Hex color code (e.g., "#FF0000")
 * @param opacity - Opacity value between 0 and 1
 * @returns Hex color with opacity
 */
export function addOpacity(hex: string, opacity: number): string {
  const alpha = Math.round(opacity * 255);
  const alphaHex = alpha.toString(16).padStart(2, '0');
  return `${hex}${alphaHex}`;
}
