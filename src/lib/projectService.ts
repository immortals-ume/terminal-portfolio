import { GitHubRepo } from './github';

class ProjectService {
  private static instance: ProjectService;
  private projects: GitHubRepo[] = [];

  private constructor() { }

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  setProjects(projects: GitHubRepo[]): void {
    this.projects = projects;
  }

  getProjects(): GitHubRepo[] {
    return this.projects;
  }

  getProject(index: number): GitHubRepo | null {
    return this.projects[index - 1] || null;
  }

  getProjectCommands(): Record<string, { description: string; action: () => any[] }> {
    const commands: Record<string, { description: string; action: () => any[] }> = {};

    this.projects.forEach((project, index) => {
      const projectNum = index + 1;
      commands[`open project${projectNum}`] = {
        description: `Open ${project.name} on GitHub`,
        action: () => {
          if (typeof window !== 'undefined') {
            window.open(project.html_url, '_blank');
          }
          return [{
            type: "text",
            value: `🚀 Opening ${project.name} on GitHub...\n${project.description || 'No description available'}\n🔗 ${project.html_url}`
          }];
        }
      };
      if (project.homepage) {
        commands[`open demo${projectNum}`] = {
          description: `Open ${project.name} live demo`,
          action: () => {
            if (typeof window !== 'undefined') {
              window.open(project.homepage!, '_blank');
            }
            return [{
              type: "text",
              value: `🌐 Opening ${project.name} live demo...\n${project.description || 'No description available'}\n🔗 ${project.homepage}`
            }];
          }
        };
      }
      commands[`project${projectNum}`] = {
        description: `Show ${project.name} details`,
        action: () => {
          const info = [
            `📁 Project: ${project.name}`,
            `📝 Description: ${project.description || 'No description available'}`,
            `💻 Language: ${project.language || 'Mixed'}`,
            `⭐ Stars: ${project.stargazers_count}`,
            `🍴 Forks: ${project.forks_count}`,
            `📅 Updated: ${new Date(project.updated_at).toLocaleDateString()}`,
          ];

          if (project.topics && project.topics.length > 0) {
            info.push(`🏷️ Topics: ${project.topics.join(', ')}`);
          }

          info.push(`🔗 GitHub: ${project.html_url}`);

          if (project.homepage) {
            info.push(`🌐 Live Demo: ${project.homepage}`);
          }

          return [{ type: "text", value: info.join('\n') }];
        }
      };
    });

    return commands;
  }
}

export const projectService = ProjectService.getInstance();