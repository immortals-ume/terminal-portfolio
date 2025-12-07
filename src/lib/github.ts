export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
    size: number;
    fork: boolean;
    private: boolean;
    owner?: {
        login: string;
    };
}

export interface GitHubUser {
    login: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    email: string | null;
    blog: string | null;
    twitter_username: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
    private readonly username: string;
    private readonly token?: string;
    private cache: Map<string, { data: any; timestamp: number }> = new Map();
    private readonly CACHE_DURATION = 5 * 60 * 1000;

    constructor(username: string, token?: string) {
        this.username = username;
        this.token = token;
    }

    async getUser(): Promise<GitHubUser> {
        return this.fetchGitHub(`/users/${this.username}`);
    }

    async getRepositories(featured?: string[]): Promise<GitHubRepo[]> {
        const repos = await this.fetchGitHub(`/users/${this.username}/repos?sort=updated&per_page=100&type=public`);

        const filteredRepos = repos
            .filter((repo: GitHubRepo) => {
                return !repo.fork &&
                    !repo.private &&
                    repo.size > 0 &&
                    repo.description &&
                    repo.description.trim().length > 0 &&
                    repo.name !== repo.owner?.login &&
                    !repo.name.toLowerCase().includes('config') &&
                    !repo.name.toLowerCase().includes('dotfiles');
            })
            .sort((a: GitHubRepo, b: GitHubRepo) => {
                if (featured && featured.length > 0) {
                    const aFeatured = featured.includes(a.name);
                    const bFeatured = featured.includes(b.name);
                    if (aFeatured && !bFeatured) return -1;
                    if (!aFeatured && bFeatured) return 1;
                }

                const aScore = (a.stargazers_count * 3) + (a.forks_count * 2) +
                    (new Date(a.updated_at).getTime() / 1000000000000);
                const bScore = (b.stargazers_count * 3) + (b.forks_count * 2) +
                    (new Date(b.updated_at).getTime() / 1000000000000);
                return bScore - aScore;
            });

        return filteredRepos.slice(0, 8);
    }

    async getLanguageStats(): Promise<Record<string, number>> {
        const repos = await this.getRepositories();
        const languages: Record<string, number> = {};

        for (const repo of repos) {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + repo.size;
            }
        }

        return languages;
    }

    private getCachedData(key: string): any | null {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }
        return null;
    }

    private setCachedData(key: string, data: any): void {
        this.cache.set(key, {data, timestamp: Date.now()});
    }

    private async fetchGitHub(endpoint: string): Promise<any> {
        const cachedData = this.getCachedData(endpoint);
        if (cachedData) {
            return cachedData;
        }

        const headers: Record<string, string> = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
                headers,
                next: {revalidate: 300}
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API rate limit exceeded. Please add a GitHub token.');
                }
                if (response.status === 404) {
                    throw new Error('GitHub user not found. Please check your username.');
                }
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.setCachedData(endpoint, data);
            return data;
        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    }
}

import {personalInfo} from '@/data/portfolio';

export const createGitHubService = () => {
    const username = personalInfo.github;
    const token = process.env.GITHUB_TOKEN;

    return new GitHubService(username, token);
};