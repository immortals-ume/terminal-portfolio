/**
 * Theme Component
 * 
 * Interactive theme selector that allows users to customize the terminal's
 * color scheme from 10 different essence themes.
 * 
 * Features:
 * - 10 unique color themes with descriptive names
 * - Visual indication of active theme
 * - Click to select or use numeric shortcuts
 * - Theme descriptions for easy identification
 * - Real-time theme switching
 * 
 * @component
 * @example
 * ```tsx
 * <Theme 
 *   onThemeChange={(theme) => setTheme(theme)} 
 *   currentTheme="essence_01" 
 * />
 * ```
 */

"use client";
import React from "react";
import {useThemeColors} from "@/hooks/useThemeColors";

/**
 * Available theme options with IDs, names, and descriptions
 */
const themes = [
    {id: "essence_01", name: "Essence 01", description: "Blue - Celestial Waters (DEFAULT)"},
    {id: "essence_02", name: "Essence 02", description: "Black - Void of Silence"},
    {id: "essence_03", name: "Essence 03", description: "Pink - Crimson Whispers"},
    {id: "essence_04", name: "Essence 04", description: "Golden - Radiant Dawn"},
    {id: "essence_05", name: "Essence 05", description: "Red - Scarlet Flame"},
    {id: "essence_06", name: "Essence 06", description: "Dark Red - Shadow's Edge"},
    {id: "essence_07", name: "Essence 07", description: "Grey - Twilight Mist"},
    {id: "essence_08", name: "Essence 08", description: "Yellow - Solar Glow"},
    {id: "essence_09", name: "Essence 09", description: "Green - Emerald Pulse"},
    {id: "essence_10", name: "Essence 10", description: "Golden - Lotus Bloom"},
];

/**
 * Props for the Theme component
 */
interface ThemeProps {
    /** Callback function to change theme */
    onThemeChange: (theme: string) => void;
    /** Currently active theme ID */
    currentTheme: string;
}

/**
 * Renders the theme selection interface
 * 
 * @param {ThemeProps} props - Component props
 * @returns {JSX.Element} Theme selector interface
 */
export default function Theme({onThemeChange, currentTheme}: ThemeProps) {
    const colors = useThemeColors();

    return (
        <div>
            <div style={{marginBottom: "16px"}}>
                <strong>🎨 Terminal Themes</strong>
            </div>
            <div style={{marginBottom: "12px", opacity: 0.8}}>
                Current theme: <span
                style={{color: colors.accent}}>{themes.find(t => t.id === currentTheme)?.name || "Essence 01"}</span>
            </div>
            <div style={{marginBottom: "16px"}}>
                Available themes:
            </div>
            {themes && themes.length > 0 ? themes.map((theme, index) => (
                <div key={theme?.id || index} style={{marginBottom: "8px"}}>
          <span
              style={{
                  cursor: "pointer",
                  color: currentTheme === theme?.id ? colors.accent : colors.textSecondary,
                  textDecoration: currentTheme === theme?.id ? "underline" : "none"
              }}
              onClick={() => theme?.id && onThemeChange(theme.id)}
          >
            [{index + 1}] {theme?.name || "Unknown Theme"}
          </span>
                    <span style={{opacity: 0.6, marginLeft: "8px"}}>- {theme?.description || "No description"}</span>
                </div>
            )) : (
                <div>No themes available</div>
            )}
            <div style={{marginTop: "16px", opacity: 0.7, fontSize: "12px"}}>
                💡 Type 'theme [number]' to switch themes quickly
            </div>
        </div>
    );
}

export {themes};