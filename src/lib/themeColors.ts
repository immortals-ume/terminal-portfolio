/**
 * Centralized theme color definitions
 * Single source of truth for all theme colors across the application
 */
export const themeCSSVariables: Record<string, Record<string, string>> = {
    essence_01: {
        '--bg-primary': '#0a1a2e',
        '--bg-secondary': '#1a2a3e',
        '--text-primary': '#00d4ff',
        '--text-secondary': '#88d4ff',
        '--accent': '#00d4ff',
        '--success': '#00d4ff',
        '--warning': '#0099cc',
        '--error': '#ff3b30',
        '--neon': '#00d4ff',
        '--neon-soft': 'rgba(0, 212, 255, 0.2)',
        '--panel-bg': 'rgba(10,26,46,0.9)',
        '--text-soft': '#88d4ff',
    },
    essence_02: {
        '--bg-primary': '#000000',
        '--bg-secondary': '#1a1a1a',
        '--text-primary': '#ffffff',
        '--text-secondary': '#cccccc',
        '--accent': '#ffffff',
        '--success': '#ffffff',
        '--warning': '#cccccc',
        '--error': '#ff3b30',
        '--neon': '#ffffff',
        '--neon-soft': 'rgba(255, 255, 255, 0.15)',
        '--panel-bg': 'rgba(0,0,0,0.9)',
        '--text-soft': '#cccccc',
    },
    essence_03: {
        '--bg-primary': '#1a0a1a',
        '--bg-secondary': '#2a1a2a',
        '--text-primary': '#ff1493',
        '--text-secondary': '#ff85c1',
        '--accent': '#ff1493',
        '--success': '#ff69b4',
        '--warning': '#ff85c1',
        '--error': '#ff3b30',
        '--neon': '#ff1493',
        '--neon-soft': 'rgba(255, 20, 147, 0.2)',
        '--panel-bg': 'rgba(26,10,26,0.9)',
        '--text-soft': '#ff85c1',
    },
    essence_04: {
        '--bg-primary': '#1a1a0a',
        '--bg-secondary': '#2a2a1a',
        '--text-primary': '#ffd700',
        '--text-secondary': '#ffeb99',
        '--accent': '#ffd700',
        '--success': '#ffed4e',
        '--warning': '#ffeb99',
        '--error': '#ff3b30',
        '--neon': '#ffd700',
        '--neon-soft': 'rgba(255, 215, 0, 0.2)',
        '--panel-bg': 'rgba(26,26,10,0.9)',
        '--text-soft': '#ffeb99',
    },
    essence_05: {
        '--bg-primary': '#1a0a0a',
        '--bg-secondary': '#2a1a1a',
        '--text-primary': '#ff3333',
        '--text-secondary': '#ff9999',
        '--accent': '#ff3333',
        '--success': '#ff6666',
        '--warning': '#ff9999',
        '--error': '#ff3333',
        '--neon': '#ff3333',
        '--neon-soft': 'rgba(255, 51, 51, 0.2)',
        '--panel-bg': 'rgba(26,10,10,0.9)',
        '--text-soft': '#ff9999',
    },
    essence_06: {
        '--bg-primary': '#0f0520',
        '--bg-secondary': '#1a0a30',
        '--text-primary': '#a855f7',
        '--text-secondary': '#c084fc',
        '--accent': '#a855f7',
        '--success': '#8b5cf6',
        '--warning': '#c084fc',
        '--error': '#ff3b30',
        '--neon': '#a855f7',
        '--neon-soft': 'rgba(168, 85, 247, 0.2)',
        '--panel-bg': 'rgba(26,8,8,0.9)',
        '--text-soft': '#dd7777',
    },
    essence_07: {
        '--bg-primary': '#1a1a1a',
        '--bg-secondary': '#2a2a2a',
        '--text-primary': '#c0c0c0',
        '--text-secondary': '#d0d0d0',
        '--accent': '#c0c0c0',
        '--success': '#909090',
        '--warning': '#d0d0d0',
        '--error': '#ff3b30',
        '--neon': '#c0c0c0',
        '--neon-soft': 'rgba(192, 192, 192, 0.2)',
        '--panel-bg': 'rgba(26,26,26,0.9)',
        '--text-soft': '#d0d0d0',
    },
    essence_08: {
        '--bg-primary': '#1a1a00',
        '--bg-secondary': '#2a2a1a',
        '--text-primary': '#ffff00',
        '--text-secondary': '#ffffcc',
        '--accent': '#ffff00',
        '--success': '#ffff99',
        '--warning': '#ffffcc',
        '--error': '#ff3b30',
        '--neon': '#ffff00',
        '--neon-soft': 'rgba(255, 255, 0, 0.2)',
        '--panel-bg': 'rgba(26,26,0,0.9)',
        '--text-soft': '#ffffcc',
    },
    essence_09: {
        '--bg-primary': '#0a1a0a',
        '--bg-secondary': '#1a2a1a',
        '--text-primary': '#00ff00',
        '--text-secondary': '#99ff99',
        '--accent': '#00ff00',
        '--success': '#00cc00',
        '--warning': '#99ff99',
        '--error': '#ff3b30',
        '--neon': '#00ff00',
        '--neon-soft': 'rgba(0, 255, 0, 0.2)',
        '--panel-bg': 'rgba(10,26,10,0.9)',
        '--text-soft': '#99ff99',
    },
    essence_10: {
        '--bg-primary': '#1a1408',
        '--bg-secondary': '#2a2418',
        '--text-primary': '#ffb347',
        '--text-secondary': '#ffc966',
        '--accent': '#ffb347',
        '--success': '#ffd699',
        '--warning': '#ffc966',
        '--error': '#ff3b30',
        '--neon': '#ffb347',
        '--neon-soft': 'rgba(255, 179, 71, 0.2)',
        '--panel-bg': 'rgba(26,20,8,0.9)',
        '--text-soft': '#ffc966',
    },
};

/**
 * Converts CSS variable name to camelCase property name
 * Example: '--bg-primary' -> 'bgPrimary'
 */
function cssVarToCamelCase(cssVar: string): string {
    return cssVar
        .replace(/^--/, '')
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Theme colors interface for useThemeColors hook
 */
export interface ThemeColors {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    neon: string;
    neonSoft: string;
}

/**
 * Derives themeColors from themeCSSVariables
 * This ensures we have a single source of truth
 */
export const themeColors: Record<string, ThemeColors> = Object.entries(themeCSSVariables).reduce(
    (acc, [themeId, cssVars]) => {
        acc[themeId] = {
            bgPrimary: cssVars['--bg-primary'],
            bgSecondary: cssVars['--bg-secondary'],
            textPrimary: cssVars['--text-primary'],
            textSecondary: cssVars['--text-secondary'],
            accent: cssVars['--accent'],
            success: cssVars['--success'],
            warning: cssVars['--warning'],
            error: cssVars['--error'],
            neon: cssVars['--neon'],
            neonSoft: cssVars['--neon-soft'],
        };
        return acc;
    },
    {} as Record<string, ThemeColors>
);

export const themeColorPalettes = {
    essence_01: {
        Expert: {
            color: '#00d4ff',
            border: '#00d4ff',
            hover: 'rgba(0, 212, 255, 0.2)',
            shadow: '0 0 15px rgba(0, 212, 255, 0.5)'
        },
        Advanced: {
            color: '#0099cc',
            border: '#0099cc',
            hover: 'rgba(0, 153, 204, 0.15)',
            shadow: '0 0 10px rgba(0, 153, 204, 0.4)'
        },
        Intermediate: {
            color: '#88d4ff',
            border: '#88d4ff',
            hover: 'rgba(136, 212, 255, 0.1)',
            shadow: '0 0 8px rgba(136, 212, 255, 0.3)'
        }
    },
    essence_02: {
        Expert: {
            color: '#ffffff',
            border: '#ffffff',
            hover: 'rgba(255, 255, 255, 0.15)',
            shadow: '0 0 15px rgba(255, 255, 255, 0.3)'
        },
        Advanced: {
            color: '#cccccc',
            border: '#cccccc',
            hover: 'rgba(204, 204, 204, 0.15)',
            shadow: '0 0 10px rgba(204, 204, 204, 0.3)'
        },
        Intermediate: {
            color: '#808080',
            border: '#808080',
            hover: 'rgba(128, 128, 128, 0.1)',
            shadow: '0 0 8px rgba(128, 128, 128, 0.2)'
        }
    },
    essence_03: {
        Expert: {
            color: '#ff1493',
            border: '#ff1493',
            hover: 'rgba(255, 20, 147, 0.2)',
            shadow: '0 0 15px rgba(255, 20, 147, 0.5)'
        },
        Advanced: {
            color: '#ff69b4',
            border: '#ff69b4',
            hover: 'rgba(255, 105, 180, 0.15)',
            shadow: '0 0 10px rgba(255, 105, 180, 0.4)'
        },
        Intermediate: {
            color: '#ff85c1',
            border: '#ff85c1',
            hover: 'rgba(255, 133, 193, 0.1)',
            shadow: '0 0 8px rgba(255, 133, 193, 0.3)'
        }
    },
    essence_04: {
        Expert: {
            color: '#ffd700',
            border: '#ffd700',
            hover: 'rgba(255, 215, 0, 0.2)',
            shadow: '0 0 15px rgba(255, 215, 0, 0.5)'
        },
        Advanced: {
            color: '#ffed4e',
            border: '#ffed4e',
            hover: 'rgba(255, 237, 78, 0.15)',
            shadow: '0 0 10px rgba(255, 237, 78, 0.4)'
        },
        Intermediate: {
            color: '#ffeb99',
            border: '#ffeb99',
            hover: 'rgba(255, 235, 153, 0.1)',
            shadow: '0 0 8px rgba(255, 235, 153, 0.3)'
        }
    },
    essence_05: {
        Expert: {
            color: '#ff3333',
            border: '#ff3333',
            hover: 'rgba(255, 51, 51, 0.2)',
            shadow: '0 0 15px rgba(255, 51, 51, 0.5)'
        },
        Advanced: {
            color: '#ff6666',
            border: '#ff6666',
            hover: 'rgba(255, 102, 102, 0.15)',
            shadow: '0 0 10px rgba(255, 102, 102, 0.4)'
        },
        Intermediate: {
            color: '#ff9999',
            border: '#ff9999',
            hover: 'rgba(255, 153, 153, 0.1)',
            shadow: '0 0 8px rgba(255, 153, 153, 0.3)'
        }
    },
    essence_06: {
        Expert: {
            color: '#cc3333',
            border: '#cc3333',
            hover: 'rgba(204, 51, 51, 0.2)',
            shadow: '0 0 15px rgba(204, 51, 51, 0.5)'
        },
        Advanced: {
            color: '#994444',
            border: '#994444',
            hover: 'rgba(153, 68, 68, 0.15)',
            shadow: '0 0 10px rgba(153, 68, 68, 0.4)'
        },
        Intermediate: {
            color: '#dd7777',
            border: '#dd7777',
            hover: 'rgba(221, 119, 119, 0.1)',
            shadow: '0 0 8px rgba(221, 119, 119, 0.3)'
        }
    },
    essence_07: {
        Expert: {
            color: '#c0c0c0',
            border: '#c0c0c0',
            hover: 'rgba(192, 192, 192, 0.2)',
            shadow: '0 0 15px rgba(192, 192, 192, 0.4)'
        },
        Advanced: {
            color: '#909090',
            border: '#909090',
            hover: 'rgba(144, 144, 144, 0.15)',
            shadow: '0 0 10px rgba(144, 144, 144, 0.3)'
        },
        Intermediate: {
            color: '#d0d0d0',
            border: '#d0d0d0',
            hover: 'rgba(208, 208, 208, 0.1)',
            shadow: '0 0 8px rgba(208, 208, 208, 0.2)'
        }
    },
    essence_08: {
        Expert: {
            color: '#ffff00',
            border: '#ffff00',
            hover: 'rgba(255, 255, 0, 0.2)',
            shadow: '0 0 15px rgba(255, 255, 0, 0.5)'
        },
        Advanced: {
            color: '#ffff99',
            border: '#ffff99',
            hover: 'rgba(255, 255, 153, 0.15)',
            shadow: '0 0 10px rgba(255, 255, 153, 0.4)'
        },
        Intermediate: {
            color: '#ffffcc',
            border: '#ffffcc',
            hover: 'rgba(255, 255, 204, 0.1)',
            shadow: '0 0 8px rgba(255, 255, 204, 0.3)'
        }
    },
    essence_09: {
        Expert: {
            color: '#00ff00',
            border: '#00ff00',
            hover: 'rgba(0, 255, 0, 0.2)',
            shadow: '0 0 15px rgba(0, 255, 0, 0.5)'
        },
        Advanced: {
            color: '#00cc00',
            border: '#00cc00',
            hover: 'rgba(0, 204, 0, 0.15)',
            shadow: '0 0 10px rgba(0, 204, 0, 0.4)'
        },
        Intermediate: {
            color: '#99ff99',
            border: '#99ff99',
            hover: 'rgba(153, 255, 153, 0.1)',
            shadow: '0 0 8px rgba(153, 255, 153, 0.3)'
        }
    },
    essence_10: {
        Expert: {
            color: '#ffb347',
            border: '#ffb347',
            hover: 'rgba(255, 179, 71, 0.2)',
            shadow: '0 0 15px rgba(255, 179, 71, 0.5)'
        },
        Advanced: {
            color: '#ffd699',
            border: '#ffd699',
            hover: 'rgba(255, 214, 153, 0.15)',
            shadow: '0 0 10px rgba(255, 214, 153, 0.4)'
        },
        Intermediate: {
            color: '#ffc966',
            border: '#ffc966',
            hover: 'rgba(255, 201, 102, 0.1)',
            shadow: '0 0 8px rgba(255, 201, 102, 0.3)'
        }
    },
    matrix: {
        Expert: {
            color: '#00ff9c',
            border: '#00ff9c',
            hover: 'rgba(0, 255, 156, 0.2)',
            shadow: '0 0 15px rgba(0, 255, 156, 0.5)'
        },
        Advanced: {
            color: '#00cc7a',
            border: '#00cc7a',
            hover: 'rgba(0, 204, 122, 0.15)',
            shadow: '0 0 10px rgba(0, 204, 122, 0.4)'
        },
        Intermediate: {
            color: '#66ffb3',
            border: '#66ffb3',
            hover: 'rgba(102, 255, 179, 0.1)',
            shadow: '0 0 8px rgba(102, 255, 179, 0.3)'
        }
    },
    basic: {
        Expert: {
            color: '#ffffff',
            border: '#ffffff',
            hover: 'rgba(255, 255, 255, 0.15)',
            shadow: '0 0 15px rgba(255, 255, 255, 0.3)'
        },
        Advanced: {
            color: '#cccccc',
            border: '#cccccc',
            hover: 'rgba(204, 204, 204, 0.15)',
            shadow: '0 0 10px rgba(204, 204, 204, 0.3)'
        },
        Intermediate: {
            color: '#999999',
            border: '#999999',
            hover: 'rgba(153, 153, 153, 0.1)',
            shadow: '0 0 8px rgba(153, 153, 153, 0.2)'
        }
    },
    pro: {
        Expert: {
            color: '#007aff',
            border: '#007aff',
            hover: 'rgba(0, 122, 255, 0.2)',
            shadow: '0 0 15px rgba(0, 122, 255, 0.5)'
        },
        Advanced: {
            color: '#0051d5',
            border: '#0051d5',
            hover: 'rgba(0, 81, 213, 0.15)',
            shadow: '0 0 10px rgba(0, 81, 213, 0.4)'
        },
        Intermediate: {
            color: '#5eb3ff',
            border: '#5eb3ff',
            hover: 'rgba(94, 179, 255, 0.1)',
            shadow: '0 0 8px rgba(94, 179, 255, 0.3)'
        }
    },
    ocean: {
        Expert: {
            color: '#00d4ff',
            border: '#00d4ff',
            hover: 'rgba(0, 212, 255, 0.2)',
            shadow: '0 0 15px rgba(0, 212, 255, 0.5)'
        },
        Advanced: {
            color: '#0099cc',
            border: '#0099cc',
            hover: 'rgba(0, 153, 204, 0.15)',
            shadow: '0 0 10px rgba(0, 153, 204, 0.4)'
        },
        Intermediate: {
            color: '#88d4ff',
            border: '#88d4ff',
            hover: 'rgba(136, 212, 255, 0.1)',
            shadow: '0 0 8px rgba(136, 212, 255, 0.3)'
        }
    },
    'red-sands': {
        Expert: {
            color: '#ff6b35',
            border: '#ff6b35',
            hover: 'rgba(255, 107, 53, 0.2)',
            shadow: '0 0 15px rgba(255, 107, 53, 0.5)'
        },
        Advanced: {
            color: '#cc5522',
            border: '#cc5522',
            hover: 'rgba(204, 85, 34, 0.15)',
            shadow: '0 0 10px rgba(204, 85, 34, 0.4)'
        },
        Intermediate: {
            color: '#ff9966',
            border: '#ff9966',
            hover: 'rgba(255, 153, 102, 0.1)',
            shadow: '0 0 8px rgba(255, 153, 102, 0.3)'
        }
    },
    silver: {
        Expert: {
            color: '#c0c0c0',
            border: '#c0c0c0',
            hover: 'rgba(192, 192, 192, 0.2)',
            shadow: '0 0 15px rgba(192, 192, 192, 0.4)'
        },
        Advanced: {
            color: '#909090',
            border: '#909090',
            hover: 'rgba(144, 144, 144, 0.15)',
            shadow: '0 0 10px rgba(144, 144, 144, 0.3)'
        },
        Intermediate: {
            color: '#d0d0d0',
            border: '#d0d0d0',
            hover: 'rgba(208, 208, 208, 0.1)',
            shadow: '0 0 8px rgba(208, 208, 208, 0.2)'
        }
    }
};

export type ThemeId = keyof typeof themeColorPalettes;
export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate';

export const getThemeColors = (level: SkillLevel, currentTheme: string) => {
    const normalizedTheme = (currentTheme || 'essence_01').toLowerCase().trim();
    const palette = themeColorPalettes[normalizedTheme as ThemeId] || themeColorPalettes.essence_01;
    const levelColors = palette[level] || palette.Intermediate;

    return {
        borderColor: levelColors.border,
        color: levelColors.color,
        hoverBg: levelColors.hover,
        hoverShadow: levelColors.shadow
    };
};
