'use client'

import React from 'react';

interface CommandSuggestionsProps {
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
  isVisible: boolean;
}

export default function CommandSuggestions({ suggestions, onSuggestionSelect, isVisible }: CommandSuggestionsProps) {
  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-full left-0 mb-1 bg-black border border-green-400 rounded p-2 min-w-64 z-10">
      <div className="text-green-400 text-xs mb-1">Suggestions:</div>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSuggestionSelect(suggestion)}
          className="text-green-300 text-sm cursor-pointer hover:bg-green-900 hover:bg-opacity-20 px-2 py-1 rounded"
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
}