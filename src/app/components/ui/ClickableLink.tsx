/**
 * ClickableLink Component
 * 
 * A styled, interactive link component that opens URLs in a new tab with
 * hover effects and theme-aware styling.
 * 
 * Features:
 * - Opens links in new tab with security attributes (noopener, noreferrer)
 * - Hover effects with brightness and opacity changes
 * - Dotted underline for visual distinction
 * - Theme-aware accent color
 * - Fallback for invalid URLs
 * - Keyboard navigation support (Enter key)
 * - URL validation using shared utility
 * - Memoized event handlers for performance
 * 
 * @component
 * @example
 * ```tsx
 * <ClickableLink url="https://github.com/user" text="GitHub Profile" />
 * <ClickableLink url="mailto:email@example.com" ariaLabel="Email contact" />
 * ```
 */

'use client'

import React, { useCallback } from 'react';
import { isValidUrl } from '@/lib/utils';

/**
 * Props for the ClickableLink component
 */
interface ClickableLinkProps {
    /** The URL to open when clicked */
    url: string;
    /** Optional display text (defaults to URL if not provided) */
    text?: string;
    /** Optional additional CSS classes */
    className?: string;
    /** Optional ARIA label for accessibility */
    ariaLabel?: string;
}

/**
 * Renders a clickable link with hover effects
 * 
 * @param {ClickableLinkProps} props - Component props
 * @returns {JSX.Element} Styled clickable link element
 */
export default function ClickableLink({url, text, className = "", ariaLabel}: ClickableLinkProps) {
    // Validate URL using shared utility
    const urlIsValid = isValidUrl(url);
    
    // Handle edge cases: empty or invalid URL
    if (!urlIsValid) {
        return (
            <span 
                className={className}
                role="text"
                aria-label={ariaLabel || "Invalid link"}
            >
                {text || 'Invalid link'}
            </span>
        );
    }

    const displayText = text || url;

    // Memoize click handler to prevent recreation on each render
    const handleClick = useCallback(() => {
        if (urlIsValid) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }, [url, urlIsValid]);

    // Memoize keyboard handler for Enter key support
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    return (
        <span
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`cursor-pointer no-underline border-b border-dotted opacity-90 hover:opacity-100 hover:brightness-110 transition-all duration-200 ${className}`}
            style={{
                color: 'var(--accent)',
                borderColor: 'var(--accent)',
            }}
            role="link"
            tabIndex={0}
            aria-label={ariaLabel || `Open link: ${displayText}`}
            title={`Click to open: ${url}`}
        >
      {displayText}
    </span>
    );
}