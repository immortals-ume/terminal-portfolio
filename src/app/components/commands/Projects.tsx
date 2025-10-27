'use client'

import React, { useEffect, useState } from "react";
import { createGitHubService, GitHubRepo } from "../../../lib/github";
import ClickableLink from "../ui/ClickableLink";

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const github = createGitHubService();
        const featuredRepos = process.env.NEXT_PUBLIC_FEATURED_REPOS?.split(',') || [];
        const repositories = await github.getRepositories(featuredRepos);
        setRepos(repositories);
      } catch (err) {
        setError('Failed to load projects from GitHub');
        console.error('GitHub API error:', err);
        // Fallback to static data - only public projects
        setRepos([
          {
            id: 1,
            name: "terminal-portfolio",
            full_name: "immortals-ume/terminal-portfolio",
            description: "Interactive Matrix-themed portfolio with command-line interface built with Next.js and React",
            html_url: "https://github.com/immortals-ume/terminal-portfolio",
            homepage: "https://kapilsrivastava.dev",
            language: "TypeScript",
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString(),
            topics: ["portfolio", "react", "nextjs", "terminal"],
            size: 1024,
            fork: false,
            private: false,
            owner: { login: "immortals-ume" }
          }
        ] as GitHubRepo[]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <>
        Loading projects from GitHub...
        {"\n"}Fetching repository data...
      </>
    );
  }

  if (error && repos.length === 0) {
    return (
      <>
        Error loading projects: {error}
        {"\n"}Please check your GitHub configuration.
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProjectStatus = (updatedAt: string) => {
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceUpdate < 7) return "🟢 Active";
    if (daysSinceUpdate < 30) return "🟡 Recent";
    return "🔵 Stable";
  };

  return (
    <div className="space-y-2">
      <div>My GitHub Projects:</div>
      {error && (
        <div>⚠️  Using cached data due to API limitations</div>
      )}
      
      {repos.map((repo, index) => (
        <div key={repo.id} className="border-l-2 border-green-400 pl-4 ml-2">
          <div className="font-bold text-green-300">[{index + 1}] {repo.name}</div>
          <div>    Description: {repo.description || "No description available"}</div>
          <div>    Language: {repo.language || "Mixed"}</div>
          <div>    Stars: ⭐ {repo.stargazers_count} | Forks: 🍴 {repo.forks_count}</div>
          <div>    Status: {getProjectStatus(repo.updated_at)}</div>
          <div>    Updated: {formatDate(repo.updated_at)}</div>
          <div>    GitHub: <ClickableLink url={repo.html_url} /></div>
          {repo.homepage && (
            <div>    Live Demo: <ClickableLink url={repo.homepage} /></div>
          )}
          {repo.topics.length > 0 && (
            <div>    Topics: {repo.topics.join(", ")}</div>
          )}
        </div>
      ))}
      
      <div>Use 'open project1', 'open project2', etc. to view details.</div>
      <div>Total repositories: {repos.length}</div>
    </div>
  );
}