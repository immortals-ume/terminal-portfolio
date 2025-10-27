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
import Performance from "../commands/Performance";
import Stats from "../commands/Stats";
import Certifications from "../commands/Certifications";
import Cursor, { cursorOptions } from "../commands/Cursor";

export type OutputItem =
  | { type: "text"; value: string }
  | { type: "component"; key: string; element: React.ReactNode };

export type CommandAction = () => OutputItem[] | "__CLEAR__";
export type CommandDef = { description: string; action: CommandAction };
export type CommandsMap = Record<string, CommandDef>;

export const createCommands = (setCursorType: (type: string) => void, cursorType: string): CommandsMap => ({
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
  "open project1": {
    description: "Open Project 1 details",
    action: () => [{ type: "text", value: "Opening Terminal Portfolio project...\nThis is the project you're currently viewing! Check out the source code on GitHub." }],
  },
  "open project2": {
    description: "Open Project 2 details",
    action: () => [{ type: "text", value: "Opening Project Alpha...\nFull-stack application with real-time chat, user authentication, and responsive design." }],
  },
  contact: {
    description: "Contact information",
    action: () => [{ type: "component", key: "contact", element: <Contact /> }],
  },
  github: {
    description: "Show GitHub profile statistics",
    action: () => [{ type: "component", key: "github", element: <GitHub /> }],
  },
  stats: {
    description: "Show coding statistics and achievements",
    action: () => [{ type: "component", key: "stats", element: <Stats /> }],
  },
  performance: {
    description: "Analyze portfolio performance metrics",
    action: () => [{ type: "component", key: "performance", element: <Performance /> }],
  },
  system: {
    description: "Show system information",
    action: () => [{ type: "component", key: "system", element: <System /> }],
  },
  certifications: {
    description: "Show professional certifications from Credly",
    action: () => [{ type: "component", key: "certifications", element: <Certifications /> }],
  },
  cursor: {
    description: "Change cursor style",
    action: () => [{ type: "component", key: "cursor", element: <Cursor onCursorChange={setCursorType} currentCursor={cursorType} /> }],
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
    description: "Select heart cursor",
    action: () => { setCursorType("heart"); return [{ type: "text", value: "Cursor changed to: Heart ♥" }]; },
  },
  clear: {
    description: "Clear the screen",
    action: () => "__CLEAR__",
  },
});

export function parseCommand(input: string): string {
  const normalized = input.trim().toLowerCase();

  const cursorMatch = normalized.match(/^cursor\s+(\d+)$/);
  if (cursorMatch) {
    const cursorIndex = parseInt(cursorMatch[1]) - 1;
    if (cursorIndex >= 0 && cursorIndex < cursorOptions.length) {
      return `cursor-select-${cursorIndex}`;
    }
  }

  const aliases: Record<string, string> = {
    "skills": "show skills",
    "project1": "open project1",
    "project2": "open project2",
    "about": "home",
    "info": "home",
    "whoami": "home",
    "ls": "help",
    "dir": "help",
    "perf": "performance",
    "metrics": "performance",
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
    "clr": "clear"
  };

  return aliases[normalized] || normalized;
}