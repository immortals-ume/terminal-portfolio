/**
 * CertificationCard Component
 *
 * Displays a single professional certification in a box/card format similar to ProjectCard.
 * This component is extracted from the Certifications component for better reusability
 * and maintainability.
 *
 * Features:
 * - Box-based layout with hover effects
 * - Displays certification name, issuer, and issue date
 * - Shows credential ID if available
 * - Displays associated skills as badges
 * - Provides verification link if available
 * - Theme-aware styling with animations
 * - Memoized for performance optimization
 *
 * @component
 * @example
 * ```tsx
 * <CertificationCard
 *   certification={{
 *     name: "AWS Certified Solutions Architect",
 *     issuer: "Amazon Web Services",
 *     month: "January",
 *     year: "2024",
 *     credentialId: "ABC123",
 *     skills: ["AWS", "Cloud Architecture"],
 *     url: "https://example.com/cert"
 *   }}
 *   index={0}
 *   colors={colors}
 *   isHovered={false}
 *   onMouseEnter={() => {}}
 *   onMouseLeave={() => {}}
 * />
 * ```
 */

'use client'

import React from "react";
import type { Certification } from "@/lib/types";
import type { ThemeColors } from "@/lib/themeColors";
import ClickableLink from "../ui/ClickableLink";

/**
 * Props for the CertificationCard component
 */
export interface CertificationCardProps {
  /** The certification data to display */
  certification: Certification;
  /** Index of the certification in the list (for animation delay and badge) */
  index: number;
  /** Theme colors for styling */
  colors: ThemeColors;
  /** Whether the card is currently hovered */
  isHovered: boolean;
  /** Callback when mouse enters the card */
  onMouseEnter: () => void;
  /** Callback when mouse leaves the card */
  onMouseLeave: () => void;
}

/**
 * CertificationCard component - displays a single professional certification
 * in a box format with hover effects similar to ProjectCard
 * Memoized to prevent unnecessary re-renders when props haven't changed
 */
const CertificationCard: React.FC<CertificationCardProps> = React.memo(({ 
  certification, 
  index, 
  colors,
  isHovered,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        p-4 rounded-lg transition-all duration-300 ease-out cursor-pointer
        relative animate-[fadeInUp_0.3s_ease-out_forwards] opacity-0
        flex flex-col gap-3
        ${isHovered ? '-translate-y-0.5' : 'translate-y-0'}
      `}
      style={{
        '--color-accent': colors.accent,
        '--color-bg-secondary': colors.bgSecondary,
        '--color-text-primary': colors.textPrimary,
        '--color-text-secondary': colors.textSecondary,
        '--color-neon-soft': colors.neonSoft,
        borderColor: colors.accent,
        backgroundColor: colors.bgSecondary,
        boxShadow: isHovered ? `0 4px 12px ${colors.neonSoft}` : 'none',
        animationDelay: `${index * 0.05}s`
      } as React.CSSProperties}
      role="listitem"
    >
      {/* Certification Number Badge */}
      <div
        className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-xs font-semibold"
        style={{
          backgroundColor: `${colors.accent}20`,
          borderColor: colors.accent,
          color: colors.accent,
          border: `1px solid ${colors.accent}`
        }}
      >
        #{index + 1}
      </div>

      {/* Certification Name */}
      <div
        className="text-base font-semibold pr-10 break-words"
        style={{ color: colors.textPrimary }}
      >
        {certification.name}
      </div>

      {/* Issuer */}
      <div
        className="text-sm flex items-center gap-1"
        style={{ color: colors.textSecondary }}
      >
        <span>🏢</span>
        <span>{certification.issuer}</span>
      </div>

      {/* Issue Date */}
      <div
        className="text-xs flex items-center gap-1"
        style={{ color: colors.textSecondary }}
      >
        <span>📅</span>
        <span>{certification.month} {certification.year}</span>
      </div>

      {/* Credential ID */}
      {certification.credentialId && (
        <div
          className="text-[0.7rem] opacity-80 font-mono"
          style={{ color: colors.textSecondary }}
        >
          ID: {certification.credentialId}
        </div>
      )}

      {/* Skills */}
      {certification.skills && certification.skills.length > 0 && (
        <div
          className="pt-2 border-t"
          style={{ borderTopColor: `${colors.accent}20` }}
        >
          <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
            {certification.skills.slice(0, 5).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-1.5 py-0.5 rounded"
                style={{
                  color: colors.accent,
                  backgroundColor: `${colors.accent}10`,
                  border: `1px solid ${colors.accent}30`
                }}
              >
                {skill}
              </span>
            ))}
            {certification.skills.length > 5 && (
              <span 
                className="self-center"
                style={{ color: colors.textSecondary }}
              >
                +{certification.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Verification Link */}
      {certification.url && (
        <div className="pt-2 text-[0.8125rem]">
          <ClickableLink
            url={certification.url}
            text="🔗 View Certificate"
            ariaLabel={`View certificate for ${certification.name}`}
          />
        </div>
      )}
    </div>
  );
});

// Set display name for better debugging
CertificationCard.displayName = 'CertificationCard';

export default CertificationCard;
