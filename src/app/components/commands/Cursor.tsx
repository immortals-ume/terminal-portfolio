import React from "react";

interface CursorProps {
  onCursorChange: (cursorType: string) => void;
  currentCursor: string;
}

const cursorOptions = [
  { type: "block", symbol: "█", name: "Block (Default)" },
  { type: "underscore", symbol: "_", name: "Underscore" },
  { type: "pipe", symbol: "|", name: "Pipe" },
  { type: "dot", symbol: "●", name: "Dot" },
  { type: "arrow", symbol: "▶", name: "Arrow" },
  { type: "diamond", symbol: "◆", name: "Diamond" },
  { type: "star", symbol: "★", name: "Star" },
  { type: "heart", symbol: "♥", name: "Heart" }
];

export default function Cursor({ onCursorChange, currentCursor }: CursorProps) {
  return (
    <div className="space-y-2">
      <div>Available cursor styles:</div>
      <div className="space-y-1">
        {cursorOptions.map((option, index) => (
          <div
            key={option.type}
            className={`cursor-pointer hover:text-green-300 ${
              currentCursor === option.type ? 'text-green-200 font-bold' : 'text-green-400'
            }`}
            onClick={() => onCursorChange(option.type)}
          >
            [{index + 1}] {option.name} - {option.symbol}
            {currentCursor === option.type && <span className="ml-2">← Current</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 text-green-600 text-sm">
        Click on any cursor style to select it, or type 'cursor [number]'
      </div>
      <div className="text-green-600 text-sm">
        Example: 'cursor 2' to select underscore cursor
      </div>
    </div>
  );
}

export { cursorOptions };