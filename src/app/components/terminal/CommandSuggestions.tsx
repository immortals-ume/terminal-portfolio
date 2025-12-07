'use client'

import React from 'react';

interface CommandSuggestionsProps {
    suggestions: string[];
    onSuggestionSelect: (suggestion: string) => void;
    isVisible: boolean;
}

export default function CommandSuggestions({suggestions, onSuggestionSelect, isVisible}: CommandSuggestionsProps) {
    if (!isVisible || suggestions.length === 0) {
        return null;
    }

    return (
        <div
            className="absolute bottom-full left-0 mb-1 rounded p-2 min-w-64 z-10"
            style={{
                background: 'var(--bg-secondary)',
                border: `1px solid var(--accent)`
            }}
        >
            <div className="text-xs mb-1" style={{color: 'var(--accent)'}}>Suggestions:</div>
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    onClick={() => onSuggestionSelect(suggestion)}
                    className="text-sm cursor-pointer px-2 py-1 rounded"
                    style={{
                        color: 'var(--text-primary)',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--neon-soft)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
}