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

import React, { useEffect, useState } from "react";
import { createGitHubService } from "@/lib/github";
import { GitHubRepo } from "@/lib/types";
import { projectService } from "@/lib/projectService";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useHoverState } from "@/hooks/useHoverState";
import { useLoadingState } from "@/hooks/useLoadingState";
import { usePreload } from "@/hooks/usePreload";
import ProjectCard from "../ui/ProjectCard";
import LoadingState from "@/components/shared/LoadingState";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import { FaRocket, FaInbox, FaLightbulb } from 'react-icons/fa';

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
  const { loading, error, setLoading, setError } = useLoadingState();
  const { handleEnter, handleLeave, isHovered } = useHoverState<number>();
  const { preconnect } = usePreload();

  useEffect(() => {
  
    preconnect('https://api.github.com');

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
  }, [preconnect]);

  if (loading) {
    return <LoadingState message="Loading projects from GitHub..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error Loading Projects"
        message={error}
        helpText="Please check your internet connection and try refreshing the page."
      />
    );
  }

  if (repos.length === 0) {
    return (
      <EmptyState
        icon={FaInbox}
        title="No projects available"
        message="Projects will appear here when GitHub repositories are available."
      />
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
            isHovered={isHovered(index)}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={handleLeave}
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
