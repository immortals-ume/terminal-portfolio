/**
 * EducationCard Component
 *
 * Displays a single educational qualification in a card format.
 * This component is extracted from the Education component for better reusability
 * and maintainability.
 *
 * Features:
 * - Displays degree, institution, and duration
 * - Shows GPA if available
 * - Displays description if provided
 * - Lists relevant courses if available
 * - Theme-aware styling
 * - Memoized for performance optimization
 *
 * @component
 * @example
 * ```tsx
 * <EducationCard
 *   education={{
 *     degree: "Bachelor of Science in Computer Science",
 *     institution: "University Name",
 *     period: "2018 - 2022",
 *     gpa: "3.8/4.0",
 *     relevantCourses: ["Data Structures", "Algorithms"]
 *   }}
 *   index={0}
 *   colors={colors}
 * />
 * ```
 */

'use client'

import React from "react";
import type { Education } from "@/lib/types";
import type { ThemeColors } from "@/lib/themeColors";

/**
 * Props for the EducationCard component
 */
export interface EducationCardProps {
  /** The education data to display */
  education: Education;
  /** Index of the education item in the list (used for key prop) */
  index: number;
  /** Theme colors for styling */
  colors: ThemeColors;
}

/**
 * EducationCard component - displays a single educational qualification
 * Memoized to prevent unnecessary re-renders when props haven't changed
 */
const EducationCard: React.FC<EducationCardProps> = React.memo(({ education, index, colors }) => {
  return (
    <div
      key={index}
      className="p-3 md:p-4 rounded border border-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)]"
      style={{
        '--color-accent': colors.accent,
        '--color-text-primary': colors.textPrimary,
        '--color-text-secondary': colors.textSecondary,
        '--color-bg-secondary': colors.bgSecondary,
      } as React.CSSProperties}
      role="listitem"
    >
      <div className="mb-2 font-semibold text-base md:text-lg text-[var(--color-accent)]">
        {education.degree}
      </div>

      <div className="space-y-1 text-sm md:text-base">
        <div className="text-[var(--color-text-primary)]">
          🏫 <span className="font-medium">Institution:</span> {education.institution}
        </div>
        <div className="text-[var(--color-text-primary)]">
          📅 <span className="font-medium">Duration:</span> {education.period}
        </div>

        {education.gpa && (
          <div className="text-[var(--color-text-primary)]">
            📊 <span className="font-medium">Academic Standing:</span> {education.gpa}
          </div>
        )}

        {education.description && (
          <div className="mt-2 text-[var(--color-text-secondary)]">
            {education.description}
          </div>
        )}

        {education.relevantCourses && education.relevantCourses.length > 0 && (
          <div className="mt-3">
            <div className="font-medium mb-2 text-[var(--color-text-primary)]">
              📚 Key Courses:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {education.relevantCourses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  className="text-xs ml-4 text-[var(--color-text-secondary)]"
                >
                  • {course}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// Set display name for better debugging
EducationCard.displayName = 'EducationCard';

export default EducationCard;
