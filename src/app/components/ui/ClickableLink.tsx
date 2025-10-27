'use client'

import React from 'react';

interface ClickableLinkProps {
  url: string;
  text?: string;
  className?: string;
}

export default function ClickableLink({ url, text, className = "" }: ClickableLinkProps) {
  const displayText = text || url;

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer text-green-400 hover:text-green-300 hover:underline transition-colors ${className}`}
      style={{
        textDecoration: 'none',
        borderBottom: '1px dotted rgba(0, 255, 156, 0.5)'
      }}
      title={`Click to open: ${url}`}
    >
      {displayText}
    </span>
  );
}