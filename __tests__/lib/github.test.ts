import { GitHubService, createGitHubService } from '@/lib/github';

// Mock fetch
global.fetch = jest.fn();

describe('GitHubService', () => {
  let service: GitHubService;
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GitHubService('testuser', 'testtoken');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('creates service with username and token', () => {
      const service = new GitHubService('user', 'token');
      expect(service).toBeInstanceOf(GitHubService);
    });

    it('creates service without token', () => {
      const service = new GitHubService('user');
      expect(service).toBeInstanceOf(GitHubService);
    });
  });

  describe('getUser', () => {
    it('fetches user data successfully', async () => {
      const mockUser = {
        login: 'testuser',
        name: 'Test User',
        bio: 'Test bio',
        location: 'Test Location',
        email: 'test@example.com',
        blog: 'https://test.com',
        twitter_username: 'testuser',
        public_repos: 10,
        followers: 100,
        following: 50,
        created_at: '2020-01-01T00:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const result = await service.getUser();
      
      expect(result).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/testuser',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App',
            'Authorization': 'Bearer testtoken',
          }),
        })
      );
    });

    it('handles 404 error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(service.getUser()).rejects.toThrow(
        'GitHub user not found. Please check your username.'
      );
    });

    it('handles 403 rate limit error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      } as Response);

      await expect(service.getUser()).rejects.toThrow(
        'GitHub API rate limit exceeded. Please add a GitHub token.'
      );
    });

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Network error'));

      await expect(service.getUser()).rejects.toThrow(
        'Network error. Please check your internet connection.'
      );
    });

    it('handles other HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(service.getUser()).rejects.toThrow(
        'GitHub API error: 500 Internal Server Error'
      );
    });
  });

  describe('getRepositories', () => {
    const mockRepos = [
      {
        id: 1,
        name: 'repo1',
        full_name: 'testuser/repo1',
        description: 'Test repo 1',
        html_url: 'https://github.com/testuser/repo1',
        homepage: null,
        language: 'JavaScript',
        stargazers_count: 10,
        forks_count: 2,
        updated_at: '2023-01-01T00:00:00Z',
        topics: ['test'],
        size: 1000,
        fork: false,
        private: false,
        owner: { login: 'testuser' },
      },
      {
        id: 2,
        name: 'repo2',
        full_name: 'testuser/repo2',
        description: 'Test repo 2',
        html_url: 'https://github.com/testuser/repo2',
        homepage: null,
        language: 'TypeScript',
        stargazers_count: 5,
        forks_count: 1,
        updated_at: '2023-02-01T00:00:00Z',
        topics: [],
        size: 500,
        fork: false,
        private: false,
        owner: { login: 'testuser' },
      },
      {
        id: 3,
        name: 'forked-repo',
        full_name: 'testuser/forked-repo',
        description: 'Forked repo',
        html_url: 'https://github.com/testuser/forked-repo',
        homepage: null,
        language: 'Python',
        stargazers_count: 0,
        forks_count: 0,
        updated_at: '2023-03-01T00:00:00Z',
        topics: [],
        size: 100,
        fork: true,
        private: false,
        owner: { login: 'testuser' },
      },
    ];

    it('fetches and filters repositories', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      } as Response);

      const result = await service.getRepositories();
      
      expect(result).toHaveLength(2); // Excludes forked repo
      expect(result[0].name).toBe('repo1');
      expect(result[1].name).toBe('repo2');
    });

    it('prioritizes featured repositories', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      } as Response);

      const result = await service.getRepositories(['repo2']);
      
      expect(result[0].name).toBe('repo2'); // Featured repo comes first
      expect(result[1].name).toBe('repo1');
    });

    it('sorts by stars and update time', async () => {
      const reposWithDifferentStars = [
        { ...mockRepos[0], stargazers_count: 1 },
        { ...mockRepos[1], stargazers_count: 10 },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => reposWithDifferentStars,
      } as Response);

      const result = await service.getRepositories();
      
      expect(result[0].stargazers_count).toBe(10);
      expect(result[1].stargazers_count).toBe(1);
    });

    it('limits results to 6 repositories', async () => {
      const manyRepos = Array.from({ length: 10 }, (_, i) => ({
        ...mockRepos[0],
        id: i + 1,
        name: `repo${i + 1}`,
      }));

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => manyRepos,
      } as Response);

      const result = await service.getRepositories();
      
      expect(result).toHaveLength(6);
    });
  });

  describe('getLanguageStats', () => {
    it('aggregates language statistics', async () => {
      const mockRepos = [
        { language: 'JavaScript', size: 1000 },
        { language: 'TypeScript', size: 500 },
        { language: 'JavaScript', size: 300 },
        { language: null, size: 200 },
      ];

      // Mock getRepositories method
      jest.spyOn(service, 'getRepositories').mockResolvedValueOnce(mockRepos as any);

      const result = await service.getLanguageStats();
      
      expect(result).toEqual({
        JavaScript: 1300,
        TypeScript: 500,
      });
    });

    it('handles repositories without language', async () => {
      const mockRepos = [
        { language: null, size: 1000 },
        { language: undefined, size: 500 },
      ];

      jest.spyOn(service, 'getRepositories').mockResolvedValueOnce(mockRepos as any);

      const result = await service.getLanguageStats();
      
      expect(result).toEqual({});
    });
  });

  describe('caching', () => {
    it('caches API responses', async () => {
      const mockUser = { login: 'testuser', name: 'Test User' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      // First call
      await service.getUser();
      
      // Second call should use cache
      const result = await service.getUser();
      
      expect(result).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('expires cache after duration', async () => {
      const mockUser = { login: 'testuser', name: 'Test User' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockUser,
      } as Response);

      // Mock Date.now to simulate time passing
      const originalNow = Date.now;
      let currentTime = 1000000;
      Date.now = jest.fn(() => currentTime);

      // First call
      await service.getUser();
      
      // Advance time beyond cache duration
      currentTime += 6 * 60 * 1000; // 6 minutes
      
      // Second call should fetch again
      await service.getUser();
      
      expect(mockFetch).toHaveBeenCalledTimes(2);
      
      Date.now = originalNow;
    });
  });

  describe('authentication', () => {
    it('includes Authorization header when token provided', async () => {
      const serviceWithToken = new GitHubService('testuser', 'testtoken');
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await serviceWithToken.getUser();
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer testtoken',
          }),
        })
      );
    });

    it('omits Authorization header when no token provided', async () => {
      const serviceWithoutToken = new GitHubService('testuser');
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await serviceWithoutToken.getUser();
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.any(String),
          }),
        })
      );
    });
  });
});

describe('createGitHubService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('creates service with environment variables', () => {
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = 'envuser';
    process.env.GITHUB_TOKEN = 'envtoken';

    const service = createGitHubService();
    
    expect(service).toBeInstanceOf(GitHubService);
  });

  it('uses default username when env var not set', () => {
    delete process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    delete process.env.GITHUB_TOKEN;

    const service = createGitHubService();
    
    expect(service).toBeInstanceOf(GitHubService);
  });
});