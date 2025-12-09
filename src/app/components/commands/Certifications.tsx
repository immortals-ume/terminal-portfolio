/**
 * Certifications Component
 *
 * Displays professional certifications in a grid layout with hover effects,
 * similar to the Projects component.
 *
 * Features:
 * - Dynamic loading with SSR disabled for client-side hydration
 * - Theme-aware styling with color customization
 * - Responsive grid-based layout
 * - Hover effects and animations
 * - Extracted CertificationCard component for better reusability
 * - Memoized for performance optimization
 * - Accessible with proper ARIA attributes
 * - Improved empty state handling
 *
 * @component
 * @example
 * ```tsx
 * <Certifications />
 * ```
 */

"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { certifications } from "@/data/portfolio";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useHoverState } from "@/hooks/useHoverState";
import type { Certification } from "@/lib/types";
import CertificationCard from "./CertificationCard";
import EmptyState from "@/components/shared/EmptyState";
import LoadingState from "@/components/shared/LoadingState";
import { FaScroll } from 'react-icons/fa';

/**
 * Internal component that renders the certifications content
 * Handles mounting state to prevent hydration mismatches
 * Memoized for performance optimization
 *
 * @returns {JSX.Element} The certifications display
 */
const CertificationsContent: React.FC = React.memo(() => {
  const colors = useThemeColors();
  const [mounted, setMounted] = useState(false);
  const { handleEnter, handleLeave, isHovered } = useHoverState<number>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingState message="Initializing certifications..." />;
  }

  const certificationsList: Certification[] = certifications;
  const hasCertifications = certificationsList.length > 0;

  if (!hasCertifications) {
    return (
      <EmptyState
        icon={FaScroll}
        title="No certifications available"
        message="Check back later for professional certifications and achievements."
      />
    );
  }

  return (
    <div 
      className="certifications-container"
      style={{
        '--color-accent': colors.accent,
        '--color-text-secondary': colors.textSecondary
      } as React.CSSProperties}
    >
      <div className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--color-accent)]">
        <span aria-hidden="true">🏆</span>
        <span>Professional Certifications</span>
        <span className="text-sm opacity-70 font-normal">
          ({certificationsList.length} {certificationsList.length === 1 ? 'certification' : 'certifications'})
        </span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8"
        role="list"
        aria-label={`${certificationsList.length} professional certifications`}
      >
        {certificationsList.map((cert, index) => (
          <CertificationCard
            key={cert.credentialId || `cert-${index}`}
            certification={cert}
            index={index}
            colors={colors}
            isHovered={isHovered(index)}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={handleLeave}
          />
        ))}
      </div>

      <div
        className="pt-4 text-xs opacity-75 text-[var(--color-text-secondary)]"
        style={{
          borderTop: `1px solid ${colors.accent}20`
        }}
        aria-label="Usage tip"
      >
        💡 Hover over certifications for enhanced view • Use 'help' to see all commands
      </div>
    </div>
  );
});

CertificationsContent.displayName = "CertificationsContent";

/**
 * Dynamically loaded Certifications component with SSR disabled
 * Prevents server-side rendering to avoid hydration issues with theme colors
 *
 * @type {React.ComponentType}
 */
const Certifications: React.ComponentType = dynamic(
  () => Promise.resolve(CertificationsContent),{
    ssr: false,
    loading: () => (
      <div className="flex justify-center py-4" role="status" aria-live="polite">
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
          aria-label="Loading certifications"
        ></div>
      </div>
    )
  }
);

export default Certifications;
