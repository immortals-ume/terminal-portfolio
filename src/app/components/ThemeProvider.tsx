"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {themeCSSVariables} from '@/lib/themeColors';

const DEFAULT_THEME = "essence_01";
const THEME_STORAGE_KEY = "portfolio_theme";

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Safely loads theme from localStorage with error handling
 * @returns The stored theme or DEFAULT_THEME on error
 */
function loadThemeFromStorage(): string {
    try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        return DEFAULT_THEME;
    } catch (error) {
        console.error('Failed to load theme from storage:', error);
        return DEFAULT_THEME;
    }
}

/**
 * Safely saves theme to localStorage with error handling
 * @param theme The theme to save
 */
function saveThemeToStorage(theme: string): void {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        if (error instanceof Error && error.name === 'QuotaExceededError') {
            console.warn('Storage quota exceeded, theme will not persist');
        } else {
            console.error('Failed to save theme to storage:', error);
        }
    }
}

/**
 * Updates CSS variables on the document root to match the theme
 * @param theme The theme to apply
 */
function updateCSSVariables(theme: string): void {
    const palette = themeCSSVariables[theme] || themeCSSVariables[DEFAULT_THEME];
    const root = document.documentElement;

    Object.entries(palette).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}

export function ThemeProvider({children}: ThemeProviderProps) {
    // Initialize theme from storage before first render to prevent flashing
    const [theme, setThemeState] = useState(() => {
        // Only access storage on client side
        if (typeof window !== 'undefined') {
            const initialTheme = loadThemeFromStorage();
            // Set theme attribute and CSS variables immediately before render
            document.documentElement.setAttribute("data-theme", initialTheme);
            updateCSSVariables(initialTheme);
            return initialTheme;
        }
        return DEFAULT_THEME;
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        updateCSSVariables(newTheme);
        saveThemeToStorage(newTheme);
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}