/**
 * Education Component
 *
 * Displays educational background including degrees, institutions, duration,
 * GPA, and relevant coursework in a card-based layout.
 *
 * Features:
 * - Card-based layout for each degree using EducationCard component
 * - Institution and duration information
 * - Academic standing (GPA) display
 * - Relevant courses listing
 * - Theme-aware styling
 * - Empty state handling with screen reader support
 * - Memoized for performance optimization
 * - Accessible with proper ARIA roles
 *
 * @component
 * @example
 * ```tsx
 * <Education />
 * ```
 */

'use client'

import React from "react";
import { education } from "@/data/portfolio";
import { useThemeColors } from "@/hooks/useThemeColors";
import EducationCard from "./EducationCard";
import type { Education as EducationType } from "@/lib/types";

/**
 * Props for the Education component
 * Empty object type as it uses data from portfolio
 */
export type EducationProps = Record<string, never>;

/**
 * Education component - displays educational background
 * Memoized to prevent unnecessary re-renders
 */
const Education: React.FC<EducationProps> = React.memo(() => {
  const colors = useThemeColors();

  // Type-safe education data
  const educationData: EducationType[] = education || [];
  const hasEducation = educationData.length > 0;

  return (
    <div 
      className="space-y-4"
      style={{
        '--color-accent': colors.accent,
        '--color-warning': colors.warning,
        '--color-text-secondary': colors.textSecondary,
      } as React.CSSProperties}
    >
      <div 
        className="font-semibold text-[var(--color-accent)]"
        role="heading"
        aria-level={2}
      >
        🎓 Educational Background
      </div>

      {hasEducation ? (
        <div 
          className="space-y-4" 
          role="list"
          aria-label="Educational qualifications"
        >
          {educationData.map((edu, index) => (
            <EducationCard
              key={`education-${index}-${edu.degree}`}
              education={edu}
              index={index}
              colors={colors}
            />
          ))}
        </div>
      ) : (
        <div 
          className="text-[var(--color-warning)]"
          role="status"
          aria-live="polite"
        >
          No education data available. Add your educational background to showcase your academic achievements.
        </div>
      )}

      <div 
        className="text-sm mt-4 text-[var(--color-text-secondary)]"
        role="note"
      >
        💡 Use 'certifications' for professional certifications and 'projects' for project portfolio
      </div>
    </div>
  );
});

Education.displayName = 'Education';

export default Education;