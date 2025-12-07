/**
 * Cursor Component
 * 
 * Interactive cursor style selector that allows users to customize the terminal
 * cursor appearance from a variety of options.
 * 
 * Features:
 * - 10 different cursor styles (block, underscore, pipe, etc.)
 * - Visual preview of each cursor symbol
 * - Active cursor highlighting
 * - Click to select or use numeric shortcuts
 * - Theme-aware styling
 * 
 * @component
 * @example
 * ```tsx
 * <Cursor 
 *   onCursorChange={(type) => setCursor(type)} 
 *   currentCursor="block" 
 * />
 * ```
 */

'use client'

import React from "react";
import {useThemeColors} from "@/hooks/useThemeColors";

/**
 * Props for the Cursor component
 */
interface CursorProps {
    /** Callback function to change cursor type */
    onCursorChange: (cursorType: string) => void;
    /** Currently active cursor type */
    currentCursor: string;
}

/**
 * Available cursor options with their symbols and names
 */
const cursorOptions = [
    {type: "block", symbol: "█", name: "Block (macOS Default)"},
    {type: "pipe", symbol: "|", name: "Pipe (Vertical Line)"},
    {type: "beam", symbol: "I", name: "I-Beam (Text Editor)"},
    {type: "dot", symbol: "●", name: "Dot (Minimal)"},
    {type: "arrow", symbol: "▶", name: "Arrow (Pointer)"},
    {type: "diamond", symbol: "◆", name: "Diamond (Retro)"},
    {type: "star", symbol: "★", name: "Star (Fun)"},
    {type: "heart", symbol: "♥", name: "Heart (Love)"},
    {type: "lightning", symbol: "⚡", name: "Lightning (Power)"}
];

/**
 * Renders the cursor selection interface
 * 
 * @param {CursorProps} props - Component props
 * @returns {JSX.Element} Cursor selector interface
 */
export default function Cursor({onCursorChange, currentCursor}: CursorProps) {
    const colors = useThemeColors();

    return (
        <div>
            <div style={{marginBottom: "16px"}}>
                <strong>🖱️ Terminal Cursor Styles</strong>
            </div>
            <div style={{marginBottom: "12px", opacity: 0.8}}>
                Current cursor: <span
                style={{color: colors.accent}}>{cursorOptions.find(c => c.type === currentCursor)?.name || "Block"}</span>
            </div>
            <div style={{marginBottom: "16px"}}>
                Available cursors:
            </div>
            {cursorOptions && cursorOptions.length > 0 ? cursorOptions.map((option, index) => (
                <div key={option?.type || index} style={{marginBottom: "8px"}}>
          <span
              style={{
                  cursor: "pointer",
                  color: currentCursor === option?.type ? colors.accent : colors.textSecondary,
                  textDecoration: currentCursor === option?.type ? "underline" : "none"
              }}
              onClick={() => option?.type && onCursorChange(option.type)}
          >
            [{index + 1}] {option?.name || "Unknown Cursor"}
          </span>
                    <span style={{marginLeft: "8px", fontSize: "16px"}}>{option?.symbol || "?"}</span>
                    {currentCursor === option?.type &&
                        <span style={{marginLeft: "8px", color: colors.accent}}>← Active</span>}
                </div>
            )) : (
                <div>No cursor options available</div>
            )}
            <div style={{marginTop: "16px", opacity: 0.7, fontSize: "12px"}}>
                Type 'cursor [number]' to switch cursors quickly
            </div>
        </div>
    );
}

export {cursorOptions};