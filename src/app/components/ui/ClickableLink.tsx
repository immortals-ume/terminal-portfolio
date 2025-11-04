'use client'

import React from 'react';

interface ClickableLinkProps {
  url: string;
  text?: string;
  className?: string;
}

export default function ClickableLink({ url, text, className = "" }: ClickableLinkProps) {
  if (!url) {
    return <span className={className}>Invalid link</span>;
  }

  const displayText = text || url;

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer hover:underline transition-colors ${className}`}
      style={{
        color: 'var(--accent)',
        textDecoration: 'none',
        borderBottom: '1px dotted var(--accent)',
        opacity: 0.9
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.filter = 'brightness(1.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.9';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      title={`Click to open: ${url}`}
    >
      {displayText}
    </span>
  );
}