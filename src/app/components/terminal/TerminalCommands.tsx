"use client";
import React from "react";
import Help from "../commands/Help";
import Skills from "../commands/Skills";
import Contact from "../commands/Contact";
import Home from "../commands/Home";
import Projects from "../commands/Projects";
import Education from "../commands/Education";
import Timeline from "../commands/Timeline";
import System from "../commands/System";
import GitHub from "../commands/GitHub";

import Certifications from "../commands/Certifications";
import Cursor, { cursorOptions } from "../commands/Cursor";
import Theme, { themes } from "../commands/Theme";
import { projectService } from "../../../lib/projectService";

export type OutputItem =
  | { type: "text"; value: string }
  | { type: "component"; key: string; element: React.ReactNode };

export type CommandAction = () => OutputItem[] | "__CLEAR__";
export type CommandDef = { description: string; action: CommandAction };
export type CommandsMap = Record<string, CommandDef>;

export const createCommands = (
  setCursorType: (type: string) => void, 
  cursorType: string,
  setTheme: (theme: string) => void,
  currentTheme: string
): CommandsMap => {
  // Get dynamic project commands
  const projectCommands = projectService.getProjectCommands();
  
  return {
  home: {
    description: "About and quick start",
    action: () => [{ type: "component", key: "home", element: <Home /> }],
  },
  help: {
    description: "Show available commands",
    action: () => [{ type: "component", key: "help", element: <Help /> }],
  },
  "show skills": {
    description: "List skills",
    action: () => [{ type: "component", key: "skills", element: <Skills /> }],
  },
  projects: {
    description: "List projects with GitHub links",
    action: () => [{ type: "component", key: "projects", element: <Projects /> }],
  },
  education: {
    description: "Education details",
    action: () => [{ type: "component", key: "education", element: <Education /> }],
  },
  timeline: {
    description: "Work/career timeline",
    action: () => [{ type: "component", key: "timeline", element: <Timeline /> }],
  },
  // Dynamic project commands will be added below
  contact: {
    description: "Contact information",
    action: () => [{ type: "component", key: "contact", element: <Contact /> }],
  },
  github: {
    description: "Show GitHub profile statistics",
    action: () => [{ type: "component", key: "github", element: <GitHub /> }],
  },

  system: {
    description: "Show system information",
    action: () => [{ type: "component", key: "system", element: <System /> }],
  },
  certifications: {
    description: "Show professional certifications",
    action: () => [{ type: "component", key: "certifications", element: <Certifications /> }],
  },
  cursor: {
    description: "Change cursor style",
    action: () => [{ type: "component", key: "cursor", element: <Cursor onCursorChange={setCursorType} currentCursor={cursorType} /> }],
  },
  theme: {
    description: "Change terminal theme",
    action: () => [{ type: "component", key: "theme", element: <Theme onThemeChange={setTheme} currentTheme={currentTheme} /> }],
  },
  "cursor-select-0": {
    description: "Select block cursor",
    action: () => { setCursorType("block"); return [{ type: "text", value: "Cursor changed to: Block █" }]; },
  },
  "cursor-select-1": {
    description: "Select underscore cursor",
    action: () => { setCursorType("underscore"); return [{ type: "text", value: "Cursor changed to: Underscore _" }]; },
  },
  "cursor-select-2": {
    description: "Select pipe cursor",
    action: () => { setCursorType("pipe"); return [{ type: "text", value: "Cursor changed to: Pipe |" }]; },
  },
  "cursor-select-3": {
    description: "Select dot cursor",
    action: () => { setCursorType("dot"); return [{ type: "text", value: "Cursor changed to: Dot ●" }]; },
  },
  "cursor-select-4": {
    description: "Select arrow cursor",
    action: () => { setCursorType("arrow"); return [{ type: "text", value: "Cursor changed to: Arrow ▶" }]; },
  },
  "cursor-select-5": {
    description: "Select diamond cursor",
    action: () => { setCursorType("diamond"); return [{ type: "text", value: "Cursor changed to: Diamond ◆" }]; },
  },
  "cursor-select-6": {
    description: "Select star cursor",
    action: () => { setCursorType("star"); return [{ type: "text", value: "Cursor changed to: Star ★" }]; },
  },
  "cursor-select-7": {
    description: "Select star cursor",
    action: () => { setCursorType("star"); return [{ type: "text", value: "Cursor changed to: Star ★" }]; },
  },
  "cursor-select-8": {
    description: "Select heart cursor",
    action: () => { setCursorType("heart"); return [{ type: "text", value: "Cursor changed to: Heart ♥" }]; },
  },
  "cursor-select-9": {
    description: "Select lightning cursor",
    action: () => { setCursorType("lightning"); return [{ type: "text", value: "Cursor changed to: Lightning ⚡" }]; },
  },
  "theme-select-0": {
    description: "Select Matrix theme",
    action: () => { setTheme("matrix"); return [{ type: "text", value: "Theme changed to: Matrix Green 🟢" }]; },
  },
  "theme-select-1": {
    description: "Select Basic theme",
    action: () => { setTheme("basic"); return [{ type: "text", value: "Theme changed to: Basic ⚪" }]; },
  },
  "theme-select-2": {
    description: "Select Pro theme",
    action: () => { setTheme("pro"); return [{ type: "text", value: "Theme changed to: Pro 🔵" }]; },
  },
  "theme-select-3": {
    description: "Select Ocean theme",
    action: () => { setTheme("ocean"); return [{ type: "text", value: "Theme changed to: Ocean 🌊" }]; },
  },
  "theme-select-4": {
    description: "Select Red Sands theme",
    action: () => { setTheme("red-sands"); return [{ type: "text", value: "Theme changed to: Red Sands 🏜️" }]; },
  },
  "theme-select-5": {
    description: "Select Silver theme",
    action: () => { setTheme("silver"); return [{ type: "text", value: "Theme changed to: Silver Aerogel ⚪" }]; },
  },
  clear: {
    description: "Clear the screen",
    action: () => "__CLEAR__",
  },
  // Merge dynamic project commands
  ...projectCommands,
};
};

export function parseCommand(input: string): string {
  const normalized = input.trim().toLowerCase();

  const cursorMatch = normalized.match(/^cursor\s+(\d+)$/);
  if (cursorMatch && cursorMatch[1]) {
    const cursorIndex = parseInt(cursorMatch[1]) - 1;
    if (cursorOptions && cursorIndex >= 0 && cursorIndex < cursorOptions.length) {
      return `cursor-select-${cursorIndex}`;
    }
  }

  const themeMatch = normalized.match(/^theme\s+(\d+)$/);
  if (themeMatch && themeMatch[1]) {
    const themeIndex = parseInt(themeMatch[1]) - 1;
    if (themes && themeIndex >= 0 && themeIndex < themes.length) {
      return `theme-select-${themeIndex}`;
    }
  }

  // Handle dynamic project commands
  const projectMatch = normalized.match(/^(open\s+)?(project|demo)(\d+)$/);
  if (projectMatch) {
    const [, openPrefix, type, num] = projectMatch;
    if (openPrefix || type === 'project') {
      return `open ${type}${num}`;
    }
    return `${type}${num}`;
  }

  // Handle shorthand project commands
  const shorthandMatch = normalized.match(/^(p|op|od)(\d+)$/);
  if (shorthandMatch) {
    const [, command, num] = shorthandMatch;
    switch (command) {
      case 'p': return `project${num}`;
      case 'op': return `open project${num}`;
      case 'od': return `open demo${num}`;
    }
  }

  const aliases: Record<string, string> = {
    "skills": "show skills",
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
    "cls": "clear",
    "clr": "clear",
    "themes": "theme",
    "colors": "theme",
    "style": "theme"
  };

  return aliases[normalized] || normalized;
}