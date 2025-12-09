/**
 * Terminal Commands Module
 * 
 * Defines all available terminal commands, their actions, and command parsing logic.
 * Handles command aliases, theme/cursor selection, and project shortcuts.
 * 
 * @module TerminalCommands
 */

"use client";
import React, { lazy, Suspense } from "react";
import Help from "../commands/Help";
import Contact from "../commands/Contact";
import Home from "../commands/Home";
import Cursor, {cursorOptions} from "../commands/Cursor";
import Theme, {themes} from "../commands/Theme";
import {projectService} from "../../../lib/projectService";

const Projects = lazy(() => import("../commands/Projects"));
const Education = lazy(() => import("../commands/Education"));
const Timeline = lazy(() => import("../commands/Timeline"));
const Certifications = lazy(() => import("../commands/Certifications"));
const Achievements = lazy(() => import("../commands/Achievements"));
const Blog = lazy(() => import("../commands/Blog"));
const Stack = lazy(() => import("../commands/Stack"));
const Skills = lazy(() => import("../commands/Skills"));

/** Fallback theme count if import fails */
const THEME_COUNT = 10;

/**
 * Represents a single output item that can be either text or a React component
 */
export type OutputItem =
    | { type: "text"; value: string }
    | { type: "component"; key: string; element: React.ReactNode };

/**
 * Function type for command actions
 * @returns Array of output items or "__CLEAR__" to clear the terminal
 */
export type CommandAction = () => OutputItem[] | "__CLEAR__";

/**
 * Definition of a single command with description and action
 */
export type CommandDef = { description: string; action: CommandAction };

/**
 * Map of command names to their definitions
 */
export type CommandsMap = Record<string, CommandDef>;

/**
 * Creates the complete command map with all available commands
 * 
 * @param {Function} setCursorType - Function to update cursor type
 * @param {string} cursorType - Current cursor type
 * @param {Function} setTheme - Function to update theme
 * @param {string} currentTheme - Current theme ID
 * @returns {CommandsMap} Complete map of all available commands
 * 
 * @example
 * ```tsx
 * const commands = createCommands(setCursor, 'block', setTheme, 'essence_01');
 * const helpCommand = commands['help'];
 * const output = helpCommand.action();
 * ```
 */
export const createCommands = (
    setCursorType: (type: string) => void,
    cursorType: string,
    setTheme: (theme: string) => void,
    currentTheme: string
): CommandsMap => {
    const projectCommands = projectService.getProjectCommands();
    const themeErrorCommands: CommandsMap = {};
    for (let i = -10; i <= 100; i++) {
        if (i < 1 || i > themes.length) {
            themeErrorCommands[`theme-error-${i}`] = {
                description: "Invalid theme index",
                action: () => [{
                    type: "text",
                    value: `❌ Invalid theme index: ${i}. Please choose a number between 1 and ${themes.length}. Type 'theme' to see available themes.`
                }],
            };
        }
    }

    return {
        home: {
            description: "About and quick start",
            action: () => [{type: "component", key: "home", element: <Home/>}],
        },
        help: {
            description: "Show available commands",
            action: () => [{type: "component", key: "help", element: <Help/>}],
        },
        skills: {
            description: "Show technical skills by category",
            action: () => [{
                type: "component", 
                key: "skills", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading skills...</div>}>
                        <Skills/>
                    </Suspense>
                )
            }],
        },
        stack: {
            description: "Show daily tech stack",
            action: () => [{
                type: "component", 
                key: "stack", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading stack...</div>}>
                        <Stack/>
                    </Suspense>
                )
            }],
        },
        projects: {
            description: "List projects with GitHub links",
            action: () => [{
                type: "component", 
                key: "projects", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading projects...</div>}>
                        <Projects/>
                    </Suspense>
                )
            }],
        },
        education: {
            description: "Education details",
            action: () => [{
                type: "component", 
                key: "education", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading education...</div>}>
                        <Education/>
                    </Suspense>
                )
            }],
        },
        timeline: {
            description: "Work/career timeline",
            action: () => [{
                type: "component", 
                key: "timeline", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading timeline...</div>}>
                        <Timeline/>
                    </Suspense>
                )
            }],
        },
        contact: {
            description: "Contact information",
            action: () => [{type: "component", key: "contact", element: <Contact/>}],
        },
        certifications: {
            description: "Show professional certifications",
            action: () => [{
                type: "component", 
                key: "certifications", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading certifications...</div>}>
                        <Certifications/>
                    </Suspense>
                )
            }],
        },
        achievements: {
            description: "Show key achievements and milestones",
            action: () => [{
                type: "component", 
                key: "achievements", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading achievements...</div>}>
                        <Achievements/>
                    </Suspense>
                )
            }],
        },
        blog: {
            description: "View blog posts and articles",
            action: () => [{
                type: "component", 
                key: "blog", 
                element: (
                    <Suspense fallback={<div className="text-sm opacity-75">Loading blog...</div>}>
                        <Blog/>
                    </Suspense>
                )
            }],
        },
        cursor: {
            description: "Change cursor style",
            action: () => [{
                type: "component",
                key: "cursor",
                element: <Cursor onCursorChange={setCursorType} currentCursor={cursorType}/>
            }],
        },
        theme: {
            description: "Change terminal theme",
            action: () => [{
                type: "component",
                key: "theme",
                element: <Theme onThemeChange={setTheme} currentTheme={currentTheme}/>
            }],
        },
        "cursor-select-0": {
            description: "Select block cursor",
            action: () => {
                setCursorType("block");
                return [{type: "text", value: "Cursor changed to: Block █"}];
            },
        },
        "cursor-select-1": {
            description: "Select underscore cursor",
            action: () => {
                setCursorType("underscore");
                return [{type: "text", value: "Cursor changed to: Underscore _"}];
            },
        },
        "cursor-select-2": {
            description: "Select pipe cursor",
            action: () => {
                setCursorType("pipe");
                return [{type: "text", value: "Cursor changed to: Pipe |"}];
            },
        },
        "cursor-select-3": {
            description: "Select dot cursor",
            action: () => {
                setCursorType("dot");
                return [{type: "text", value: "Cursor changed to: Dot ●"}];
            },
        },
        "cursor-select-4": {
            description: "Select arrow cursor",
            action: () => {
                setCursorType("arrow");
                return [{type: "text", value: "Cursor changed to: Arrow ▶"}];
            },
        },
        "cursor-select-5": {
            description: "Select diamond cursor",
            action: () => {
                setCursorType("diamond");
                return [{type: "text", value: "Cursor changed to: Diamond ◆"}];
            },
        },
        "cursor-select-6": {
            description: "Select star cursor",
            action: () => {
                setCursorType("star");
                return [{type: "text", value: "Cursor changed to: Star ★"}];
            },
        },
        "cursor-select-7": {
            description: "Select star cursor",
            action: () => {
                setCursorType("star");
                return [{type: "text", value: "Cursor changed to: Star ★"}];
            },
        },
        "cursor-select-8": {
            description: "Select heart cursor",
            action: () => {
                setCursorType("heart");
                return [{type: "text", value: "Cursor changed to: Heart ♥"}];
            },
        },
        "cursor-select-9": {
            description: "Select lightning cursor",
            action: () => {
                setCursorType("lightning");
                return [{type: "text", value: "Cursor changed to: Lightning ⚡"}];
            },
        },
        "theme-select-1": {
            description: "Select Essence 01 theme",
            action: () => {
                setTheme("essence_01");
                return [{type: "text", value: "✅ Theme changed to: Essence 01 - Celestial Waters"}];
            },
        },
        "theme-select-2": {
            description: "Select Essence 02 theme",
            action: () => {
                setTheme("essence_02");
                return [{type: "text", value: "✅ Theme changed to: Essence 02 - Void of Silence"}];
            },
        },
        "theme-select-3": {
            description: "Select Essence 03 theme",
            action: () => {
                setTheme("essence_03");
                return [{type: "text", value: "✅ Theme changed to: Essence 03 - Crimson Whispers"}];
            },
        },
        "theme-select-4": {
            description: "Select Essence 04 theme",
            action: () => {
                setTheme("essence_04");
                return [{type: "text", value: "✅ Theme changed to: Essence 04 - Radiant Dawn"}];
            },
        },
        "theme-select-5": {
            description: "Select Essence 05 theme",
            action: () => {
                setTheme("essence_05");
                return [{type: "text", value: "✅ Theme changed to: Essence 05 - Scarlet Flame"}];
            },
        },
        "theme-select-6": {
            description: "Select Essence 06 theme",
            action: () => {
                setTheme("essence_06");
                return [{type: "text", value: "✅ Theme changed to: Essence 06 - Shadow's Edge"}];
            },
        },
        "theme-select-7": {
            description: "Select Essence 07 theme",
            action: () => {
                setTheme("essence_07");
                return [{type: "text", value: "✅ Theme changed to: Essence 07 - Twilight Mist"}];
            },
        },
        "theme-select-8": {
            description: "Select Essence 08 theme",
            action: () => {
                setTheme("essence_08");
                return [{type: "text", value: "✅ Theme changed to: Essence 08 - Solar Glow"}];
            },
        },
        "theme-select-9": {
            description: "Select Essence 09 theme",
            action: () => {
                setTheme("essence_09");
                return [{type: "text", value: "✅ Theme changed to: Essence 09 - Emerald Pulse"}];
            },
        },
        "theme-select-10": {
            description: "Select Essence 10 theme",
            action: () => {
                setTheme("essence_10");
                return [{type: "text", value: "✅ Theme changed to: Essence 10 - Lotus Bloom"}];
            },
        },
        clear: {
            description: "Clear the screen",
            action: () => "__CLEAR__",
        },
        ...projectCommands,
        ...themeErrorCommands,
    };
};

/**
 * Parses user input and converts it to a command key
 * 
 * Handles:
 * - Command aliases (e.g., "skills" → "show skills")
 * - Numeric shortcuts (e.g., "cursor 3" → "cursor-select-2")
 * - Theme selection (e.g., "theme 5" → "theme-select-5")
 * - Project shortcuts (e.g., "p1" → "project1")
 * - Case-insensitive matching
 * 
 * @param {string} input - Raw user input from terminal
 * @returns {string} Parsed command key that matches a command in CommandsMap
 * 
 * @example
 * ```tsx
 * parseCommand("skills") // Returns "show skills"
 * parseCommand("theme 3") // Returns "theme-select-3"
 * parseCommand("p1") // Returns "project1"
 * parseCommand("HELP") // Returns "help"
 * ```
 */
export function parseCommand(input: string): string {
    const normalized = input.trim().toLowerCase();

    const cursorMatch = normalized.match(/^cursor\s+(\d+)$/);
    if (cursorMatch && cursorMatch[1]) {
        const cursorIndex = parseInt(cursorMatch[1]) - 1;
        if (cursorOptions && cursorIndex >= 0 && cursorIndex < cursorOptions.length) {
            return `cursor-select-${cursorIndex}`;
        }
    }

    const themeMatch = normalized.match(/^(theme|themes|colors|style)\s+(-?\d+)$/);
    if (themeMatch && themeMatch[2]) {
        const themeNumber = parseInt(themeMatch[2]);
        const maxThemes = themes?.length || THEME_COUNT;
        if (themeNumber >= 1 && themeNumber <= maxThemes) {
            return `theme-select-${themeNumber}`;
        }
        return `theme-error-${themeNumber}`;
    }

    const projectMatch = normalized.match(/^(open\s+)?(project|demo)(\d+)$/);
    if (projectMatch) {
        const [, openPrefix, type, num] = projectMatch;
        if (openPrefix || type === 'project') {
            return `open ${type}${num}`;
        }
        return `${type}${num}`;
    }

    const shorthandMatch = normalized.match(/^(p|op|od)(\d+)$/);
    if (shorthandMatch) {
        const [, command, num] = shorthandMatch;
        switch (command) {
            case 'p':
                return `project${num}`;
            case 'op':
                return `open project${num}`;
            case 'od':
                return `open demo${num}`;
        }
    }

    const aliases: Record<string, string> = {
        "about": "home",
        "info": "home",
        "whoami": "home",
        "ls": "help",
        "dir": "help",
        "gh": "github",
        "git": "github",
        "exp": "timeline",
        "experience": "timeline",
        "work": "timeline",
        "edu": "education",
        "school": "education",
        "contact-info": "contact",
        "reach": "contact",
        "certs": "certifications",
        "badges": "certifications",
        "credentials": "certifications",
        "wins": "achievements",
        "milestones": "achievements",
        "articles": "blog",
        "posts": "blog",
        "writing": "blog",
        "cls": "clear",
        "clr": "clear",
        "themes": "theme",
        "colors": "theme",
        "style": "theme"
    };

    return aliases[normalized] || normalized;
}