/**
 * Contact Component
 * 
 * Displays professional contact information including name, email, phone,
 * location, and social media links with clickable elements.
 * 
 * Features:
 * - Conditional rendering of available contact fields
 * - Clickable email, website, and social media links
 * - Styled with Tailwind utility classes
 * - Theme-aware through CSS custom properties
 * - Memoized for performance optimization
 * - ARIA labels for improved accessibility
 * 
 * @component
 * @example
 * ```tsx
 * <Contact />
 * ```
 */

'use client'

import React, { memo } from "react";
import { personalInfo } from "@/data/portfolio";
import { ContactInfo } from "@/lib/types";
import ClickableLink from "../ui/ClickableLink";
import { useThemeColors } from "@/hooks/useThemeColors";

/**
 * Contact item configuration for rendering
 */
interface ContactItemConfig {
  label: string;
  value: string;
  type: 'text' | 'link';
  url?: string;
  ariaLabel?: string;
}

/**
 * Helper function to render a single contact item
 * @param config - Configuration for the contact item
 * @param colors - Theme colors for styling
 * @returns JSX element for the contact item or null if value is missing
 */
function renderContactItem(config: ContactItemConfig, colors: any): React.ReactElement | null {
  const { label, value, type, url, ariaLabel } = config;
  
  if (!value) return null;
  
  return (
    <div 
      role="listitem"
      aria-label={ariaLabel || `${label}: ${value}`}
      style={{
        color: colors.textPrimary
      }}
    >
      - {label}:{' '}
      {type === 'link' && url ? (
        <ClickableLink 
          url={url} 
          text={value}
          ariaLabel={ariaLabel || `${label} link: ${value}`}
        />
      ) : (
        value
      )}
    </div>
  );
}

/**
 * Contact Component - Displays professional contact information
 * Memoized to prevent unnecessary re-renders
 */
const Contact = memo(function Contact() {
  const colors = useThemeColors();
  
  // Type the personal info with ContactInfo interface
  const info: ContactInfo = personalInfo;
  
  // Define contact items configuration
  const contactItems: ContactItemConfig[] = [
    {
      label: 'Name',
      value: info.name || '',
      type: 'text',
      ariaLabel: info.name ? `Name: ${info.name}` : undefined
    },
    {
      label: 'Email',
      value: info.email || '',
      type: 'link',
      url: info.email ? `mailto:${info.email}` : undefined,
      ariaLabel: info.email ? `Email address: ${info.email}` : undefined
    },
    {
      label: 'Phone',
      value: info.phone || '',
      type: 'text',
      ariaLabel: info.phone ? `Phone number: ${info.phone}` : undefined
    },
    {
      label: 'Location',
      value: info.location || '',
      type: 'text',
      ariaLabel: info.location ? `Location: ${info.location}` : undefined
    },
    {
      label: 'Portfolio',
      value: info.website || '',
      type: 'link',
      url: info.website,
      ariaLabel: info.website ? `Portfolio website: ${info.website}` : undefined
    },
    {
      label: 'GitHub',
      value: info.github || '',
      type: 'link',
      url: info.github ? `https://github.com/${info.github}` : undefined,
      ariaLabel: info.github ? `GitHub profile: ${info.github}` : undefined
    },
    {
      label: 'LinkedIn',
      value: info.linkedin || '',
      type: 'link',
      url: info.linkedin ? `https://linkedin.com/in/${info.linkedin}` : undefined,
      ariaLabel: info.linkedin ? `LinkedIn profile: ${info.linkedin}` : undefined
    },
    {
      label: 'LeetCode',
      value: info.leetcode || '',
      type: 'link',
      url: info.leetcode ? `https://leetcode.com/u/${info.leetcode}/` : undefined,
      ariaLabel: info.leetcode ? `LeetCode profile: ${info.leetcode}` : undefined
    }
  ];
  
  return (
    <div className="leading-[1.6]">
      <div 
        className="font-bold mb-2.5"
        role="heading"
        aria-level={2}
        style={{
          color: colors.accent
        }}
      >
        Professional Contact Information:
      </div>
      <div role="list" aria-label="Contact information list">
        {contactItems.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            {renderContactItem(item, colors)}
          </React.Fragment>
        ))}
      </div>
      <br/>
      <div 
        className="text-sm"
        aria-live="polite"
        style={{
          color: colors.textSecondary
        }}
      >
        Hint: Use `contact` to view again, or `help` for more commands.
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
