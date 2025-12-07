/**
 * ProjectCard Component
 *
 * Displays a single GitHub project in a card format with hover effects,
 * status indicators, and comprehensive project information.
 *
 * @component
 * @example
 * ```tsx
 * <ProjectCard
 *   repo={githubRepo}
 *   index={0}
 *   colors={themeColors}
 *   isHovered={false}
 *   onMouseEnter={() => setHovered(true)}
 *   onMouseLeave={() => setHovered(false)}
 * />
 * ```
 */

'use client'

import React from "react";
import { GitHubRepo, ProjectStatus } from "@/lib/types";
import { ThemeColors } from "@/lib/themeColors";
import { formatDate, getProjectStatus } from "@/lib/utils";
import ClickableLink from "./ClickableLink";

/**
 * Props for the ProjectCard component
 */
export interface ProjectCardProps {
  /** GitHub repository data */
  repo: GitHubRepo;
  /** Index of the card in the list (for animation delay) */
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
 * ProjectCard component displays a single GitHub repository with all its metadata
 * in a visually appealing card format with hover effects and animations.
 *
 * Features:
 * - Hover effects with elevation and glow
 * - Status indicator (Active/Recent/Stable)
 * - Language, stars, and forks display
 * - Topic tags
 * - Links to GitHub and live demo
 * - Staggered animation on mount
 *
 * @param props - Component props
 * @returns Rendered project card
 */
const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  repo,
  index,
  colors,
  isHovered,
  onMouseEnter,
  onMouseLeave
}) => {
  const status: ProjectStatus = getProjectStatus(repo?.updated_at || '', colors);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        p-4 rounded-lg transition-all duration-300 ease-out cursor-pointer relative
        animate-[fadeInUp_0.3s_ease-out_forwards] opacity-0 flex flex-col gap-3
        ${isHovered ? '-translate-y-0.5' : 'translate-y-0'}
      `}
      style={{
        '--color-accent': colors.accent,
        '--color-bg-secondary': colors.bgSecondary,
        '--color-neon-soft': colors.neonSoft,
        '--color-text-primary': colors.textPrimary,
        '--color-text-secondary': colors.textSecondary,
        '--color-status': status.color,
        borderColor: colors.accent,
        backgroundColor: colors.bgSecondary,
        boxShadow: isHovered ? `0 4px 12px ${colors.neonSoft}` : 'none',
        animationDelay: `${index * 0.05}s`
      } as React.CSSProperties}
    >
      {/* Project Number Badge */}
      <div
        className="absolute top-2 right-2 rounded px-1.5 py-0.5 text-xs font-semibold border"
        style={{
          backgroundColor: `${colors.accent}20`,
          borderColor: colors.accent,
          color: colors.accent
        }}
      >
        #{index + 1}
      </div>

      {/* Project Title */}
      <div
        className="text-base font-semibold pr-10 break-words"
        style={{ color: colors.textPrimary }}
      >
        {repo?.name || "Unnamed Project"}
      </div>

      {/* Project Description */}
      <div
        className="text-sm leading-6 flex-1 min-h-[2.5rem]"
        style={{ color: colors.textSecondary }}
      >
        {repo?.description || "No description available"}
      </div>

      {/* Status and Date */}
      <div
        className="flex justify-between items-center text-xs pt-2 border-t"
        style={{ borderTopColor: `${colors.accent}20` }}
      >
        <span 
          className="flex items-center gap-1 font-medium"
          style={{ color: status.color }}
        >
          <span>{status.icon}</span>
          <span>{status.label}</span>
        </span>
        <span style={{ color: colors.textSecondary }}>
          {formatDate(repo?.updated_at || '')}
        </span>
      </div>

      {/* Language and Stats */}
      <div
        className="flex flex-wrap gap-2 text-xs"
        style={{ color: colors.textSecondary }}
      >
        {repo?.language && (
          <span
            className="px-2 py-0.5 rounded flex items-center gap-1"
            style={{ backgroundColor: `${colors.accent}15` }}
          >
            <span>📝</span>
            <span>{repo.language}</span>
          </span>
        )}
        {repo?.stargazers_count !== undefined && repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>{repo.stargazers_count}</span>
          </span>
        )}
        {repo?.forks_count !== undefined && repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <span>🍴</span>
            <span>{repo.forks_count}</span>
          </span>
        )}
      </div>

      {/* Topics */}
      {repo?.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 text-[0.7rem]">
          {repo.topics.slice(0, 4).map((topic, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 rounded border"
              style={{
                color: colors.accent,
                backgroundColor: `${colors.accent}10`,
                borderColor: `${colors.accent}30`
              }}
            >
              #{topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span 
              className="self-center"
              style={{ color: colors.textSecondary }}
            >
              +{repo.topics.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3 text-[0.8125rem] pt-2">
        {repo?.html_url && (
          <ClickableLink
            url={repo.html_url}
            text="📂 GitHub"
          />
        )}
        {repo?.homepage && (
          <ClickableLink
            url={repo.homepage}
            text="🌐 Live Demo"
          />
        )}
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
