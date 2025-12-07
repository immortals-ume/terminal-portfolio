/**
 * Projects Component
 *
 * Displays GitHub projects in an enhanced card-based grid layout with hover effects,
 * status indicators, and comprehensive project information.
 *
 * @component
 * @example
 * ```tsx
 * <Projects />
 * ```
 *
 * Features:
 * - Fetches repositories from GitHub API
 * - Displays projects in a responsive grid
 * - Hover effects and animations
 * - Loading and error states with accessibility support
 * - Empty state handling
 *
 */

'use client'

import React, { useEffect, useState, useCallback } from "react";
import { createGitHubService } from "@/lib/github";
import { GitHubRepo } from "@/lib/types";
import { projectService } from "@/lib/projectService";
import { useThemeColors } from "@/hooks/useThemeColors";
import ProjectCard from "../ui/ProjectCard";
import { FaRocket, FaSync, FaExclamationTriangle, FaInbox, FaLightbulb } from 'react-icons/fa';

/**
 * Props for the Projects component
 * Empty object type as component fetches its own data
 */
export type ProjectsProps = Record<string, never>;



/**
 * Projects component displays a grid of GitHub repositories with comprehensive
 * project information, hover effects, and proper loading/error states.
 *
 * The component:
 * - Fetches repositories from GitHub API on mount
 * - Displays loading state with accessibility announcements
 * - Handles errors gracefully with user-friendly messages
 * - Shows empty state when no repositories are available
 * - Renders projects in a responsive grid with hover effects
 * - Provides keyboard navigation support
 *
 * @returns Rendered projects grid or appropriate state (loading/error/empty)
 */
const Projects: React.FC<ProjectsProps> = () => {
  const colors = useThemeColors();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const loadProjects = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const github = createGitHubService();
        const repositories = await github.getRepositories();
        setRepos(repositories);
        projectService.setProjects(repositories);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load projects from GitHub: ${errorMessage}`);
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredProject(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center gap-2 text-base text-[var(--color-accent)]"
        style={{
          '--color-accent': colors.accent,
        } as React.CSSProperties}
        role="status"
        aria-live="polite"
        aria-label="Loading projects from GitHub"
      >
        <FaSync className="animate-spin" aria-hidden="true" />
        <span>Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col gap-3 text-[var(--color-text-primary)]"
        style={{
          '--color-text-primary': colors.textPrimary,
          '--color-text-secondary': colors.textSecondary,
        } as React.CSSProperties}
        role="alert"
        aria-live="assertive"
      >
        <div className="text-xl flex items-center gap-2">
          <FaExclamationTriangle aria-hidden="true" />
          <span>Error Loading Projects</span>
        </div>
        <div className="text-sm opacity-85 text-[var(--color-text-secondary)]">
          {error}
        </div>
        <div className="text-sm opacity-85 text-[var(--color-text-secondary)]">
          Please check your internet connection and try refreshing the page.
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div
        className="flex flex-col gap-2 text-[var(--color-text-primary)]"
        style={{
          '--color-text-primary': colors.textPrimary,
          '--color-text-secondary': colors.textSecondary,
        } as React.CSSProperties}
        role="status"
        aria-live="polite"
      >
        <div className="text-xl mb-2 flex items-center gap-2">
          <FaInbox aria-hidden="true" /> No projects available
        </div>
        <div className="text-sm opacity-75 text-[var(--color-text-secondary)]">
          Projects will appear here when GitHub repositories are available.
        </div>
      </div>
    );
  }

  return (
    <div 
      className="projects-container"
      style={{
        '--color-accent': colors.accent,
        '--color-text-secondary': colors.textSecondary,
      } as React.CSSProperties}
    >
      <div className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--color-accent)]">
        <FaRocket aria-hidden="true" />
        <span>Projects Portfolio</span>
        <span className="text-sm opacity-70 font-normal">
          ({repos.length} {repos.length === 1 ? 'repository' : 'repositories'})
        </span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8"
        role="list"
        aria-label={`${repos.length} GitHub repositories`}
      >
        {repos.map((repo, index) => (
          <ProjectCard
            key={repo?.id || index}
            repo={repo}
            index={index}
            colors={colors}
            isHovered={hoveredProject === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      <div
        className="pt-4 text-xs opacity-75 border-t text-[var(--color-text-secondary)]"
        style={{
          borderTopColor: `${colors.accent}20`,
        }}
        aria-label="Usage tip"
      >
        <FaLightbulb className="inline mr-1" /> Hover over projects for enhanced view • Type 'project [N]' for detailed information
      </div>
    </div>
  );
};

export default React.memo(Projects);
