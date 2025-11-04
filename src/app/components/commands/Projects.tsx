'use client'

import React, { useEffect, useState } from "react";
import { createGitHubService, GitHubRepo } from "../../../lib/github";
import { projectService } from "../../../lib/projectService";
import ClickableLink from "../ui/ClickableLink";

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const github = createGitHubService();
        const repositories = await github.getRepositories();
        setRepos(repositories);
        // Register projects with the service for dynamic commands
        projectService.setProjects(repositories);
      } catch (err) {
        setError('Failed to load projects from GitHub');
        console.error('GitHub API error:', err);
        // Fallback to static data
        const fallbackRepos = [
          {
            id: 1,
            name: "terminal-portfolio",
            full_name: "immortals-ume/terminal-portfolio",
            description: "Interactive terminal-style portfolio with command-line interface built with Next.js and React",
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
        ] as GitHubRepo[];
        setRepos(fallbackRepos);
        // Register fallback projects with the service
        projectService.setProjects(fallbackRepos);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        <div>🔄 Loading projects from GitHub...</div>
        <div className="text-green-400">Fetching repository data...</div>
      </div>
    );
  }

  if (error && repos.length === 0) {
    return (
      <div className="space-y-2">
        <div className="text-red-400">⚠️ Error loading projects: {error}</div>
        <div className="text-yellow-400">Please check your GitHub configuration.</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
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
      <div>🚀 GitHub Projects ({repos.length} repositories):</div>
      {error && (
        <div className="text-yellow-400">⚠️ Using cached data due to API limitations</div>
      )}
      <br />
      
      {repos && repos.length > 0 ? (
        <div className="space-y-4">
          {repos.map((repo, index) => (
            <div key={repo?.id || index} className="p-3 border border-gray-600 rounded bg-gray-800/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl">
                    {repo?.language === 'TypeScript' ? '🔷' : 
                     repo?.language === 'JavaScript' ? '🟨' :
                     repo?.language === 'Python' ? '🐍' :
                     repo?.language === 'Java' ? '☕' : '📁'}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-blue-300">
                    [{index + 1}] {repo?.name || "Unnamed Project"}
                  </div>
                  
                  <div className="text-gray-300 mt-1">
                    {repo?.description || "No description available"}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                    <span>📝 {repo?.language || "Mixed"}</span>
                    {repo?.stargazers_count > 0 && (
                      <span>⭐ {repo.stargazers_count}</span>
                    )}
                    {repo?.forks_count > 0 && (
                      <span>🍴 {repo.forks_count}</span>
                    )}
                    {repo?.updated_at && (
                      <span>{getProjectStatus(repo.updated_at)} • {formatDate(repo.updated_at)}</span>
                    )}
                  </div>

                  {repo?.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {repo.topics.slice(0, 5).map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mt-3">
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-yellow-400">No projects available to display.</div>
      )}
      
      <br />
      <div className="border-t border-gray-600 pt-4">
        <div className="text-blue-300 font-semibold mb-3">
          🎯 Interactive Project Commands
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
            <div className="text-green-400 font-medium mb-2">📋 Project Details</div>
            <div className="text-sm space-y-1">
              <div className="text-gray-300">• <span className="text-yellow-300">project[N]</span> or <span className="text-yellow-300">p[N]</span> - View project details</div>
              <div className="text-gray-400 text-xs mt-2">Shows: description, tech stack, stats, links</div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
            <div className="text-blue-400 font-medium mb-2">🚀 Quick Actions</div>
            <div className="text-sm space-y-1">
              <div className="text-gray-300">• <span className="text-yellow-300">open project[N]</span> or <span className="text-yellow-300">op[N]</span> - GitHub repo</div>
              <div className="text-gray-300">• <span className="text-yellow-300">open demo[N]</span> or <span className="text-yellow-300">od[N]</span> - Live demo</div>
              <div className="text-gray-400 text-xs mt-2">Opens in new tab automatically</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 p-3 rounded border border-blue-500/30">
          <div className="text-cyan-400 font-medium mb-2">⚡ Quick Access Links</div>
          <div className="flex flex-wrap gap-2">
            {repos.slice(0, 4).map((repo, index) => (
              <div key={repo.id} className="flex gap-2">
                <ClickableLink
                  url={repo.html_url}
                  text={`📂 ${repo.name}`}
                />
                {repo.homepage && (
                  <ClickableLink
                    url={repo.homepage}
                    text={`🌐 Demo`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-gray-400 text-sm">
            💡 <span className="text-blue-300">Pro tip:</span> Use shorthand commands like <span className="text-yellow-300">p[N]</span>, <span className="text-yellow-300">op[N]</span>, <span className="text-yellow-300">od[N]</span> for faster navigation
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Type <span className="text-green-400">help</span> for all available commands
          </div>
        </div>
      </div>
    </div>
  );
}