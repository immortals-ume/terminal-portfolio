import React from "react";

interface CursorProps {
  onCursorChange: (cursorType: string) => void;
  currentCursor: string;
}

const cursorOptions = [
  { type: "block", symbol: "█", name: "Block (macOS Default)" },
  { type: "underscore", symbol: "_", name: "Underscore (Classic)" },
  { type: "pipe", symbol: "|", name: "Pipe (Vertical Line)" },
  { type: "beam", symbol: "I", name: "I-Beam (Text Editor)" },
  { type: "dot", symbol: "●", name: "Dot (Minimal)" },
  { type: "arrow", symbol: "▶", name: "Arrow (Pointer)" },
  { type: "diamond", symbol: "◆", name: "Diamond (Retro)" },
  { type: "star", symbol: "★", name: "Star (Fun)" },
  { type: "heart", symbol: "♥", name: "Heart (Love)" },
  { type: "lightning", symbol: "⚡", name: "Lightning (Power)" }
];

export default function Cursor({ onCursorChange, currentCursor }: CursorProps) {
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <strong>🖱️ Terminal Cursor Styles</strong>
      </div>
      <div style={{ marginBottom: "12px", opacity: 0.8 }}>
        Current cursor: <span style={{ color: "var(--accent)" }}>{cursorOptions.find(c => c.type === currentCursor)?.name || "Block"}</span>
      </div>
      <div style={{ marginBottom: "16px" }}>
        Available cursors:
      </div>
      {cursorOptions && cursorOptions.length > 0 ? cursorOptions.map((option, index) => (
        <div key={option?.type || index} style={{ marginBottom: "8px" }}>
          <span 
            style={{ 
              cursor: "pointer", 
              color: currentCursor === option?.type ? "var(--accent)" : "var(--text-secondary)",
              textDecoration: currentCursor === option?.type ? "underline" : "none"
            }}
            onClick={() => option?.type && onCursorChange(option.type)}
          >
            [{index + 1}] {option?.name || "Unknown Cursor"}
          </span>
          <span style={{ marginLeft: "8px", fontSize: "16px" }}>{option?.symbol || "?"}</span>
          {currentCursor === option?.type && <span style={{ marginLeft: "8px", color: "var(--accent)" }}>← Active</span>}
        </div>
      )) : (
        <div>No cursor options available</div>
      )}
      <div style={{ marginTop: "16px", opacity: 0.7, fontSize: "12px" }}>
        💡 Type 'cursor [number]' to switch cursors quickly
      </div>
    </div>
  );
}

export { cursorOptions };