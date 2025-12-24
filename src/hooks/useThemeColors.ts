import {useTheme} from '@/app/components/ThemeProvider';
import {useMemo} from 'react';
import {themeColors, type ThemeColors} from '@/lib/themeColors';

/**
 * Default theme ID used as fallback
 */
const DEFAULT_THEME = 'essence_01';

/**
 * Validates if a theme ID exists in the theme colors configuration
 * @param themeId The theme ID to validate
 * @returns true if the theme exists, false otherwise
 */
function isValidTheme(themeId: string): boolean {
    return themeId in themeColors;
}

/**
 * React hook that provides theme-specific color values for component styling.
 *
 * Features:
 * - Returns all required color properties for the current theme
 * - Memoizes values to prevent unnecessary re-renders
 * - Falls back to default theme for invalid themes
 * - Handles missing theme definitions gracefully
 *
 * @returns ThemeColors object containing all color properties for the current theme
 * @throws Error if used outside ThemeProvider context
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const colors = useThemeColors();
 *   return <div style={{ color: colors.textPrimary }}>Hello</div>;
 * }
 * ```
 */
export function useThemeColors(): ThemeColors {
    const {theme} = useTheme();

    return useMemo(() => {
        const normalizedTheme = (theme || DEFAULT_THEME).trim();
        if (!isValidTheme(normalizedTheme)) {
            console.warn(
                `Theme "${normalizedTheme}" not found in theme configuration. ` +
                `Falling back to default theme "${DEFAULT_THEME}".`
            );
            return themeColors[DEFAULT_THEME];
        }

        const palette = themeColors[normalizedTheme];

        if (!palette) {
            console.error(
                `Theme palette missing for "${normalizedTheme}". ` +
                `This should not happen. Falling back to default theme.`
            );
            return themeColors[DEFAULT_THEME];
        }

        return palette;
    }, [theme]);
}
export type {ThemeColors};
