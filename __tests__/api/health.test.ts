import { GET } from '@/app/api/health/route';

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns healthy status with correct data structure', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'healthy');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
    expect(data).toHaveProperty('environment');
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('memory');
    expect(data).toHaveProperty('services');

    expect(data.memory).toHaveProperty('used');
    expect(data.memory).toHaveProperty('total');
    expect(typeof data.memory.used).toBe('number');
    expect(typeof data.memory.total).toBe('number');

    expect(data.services).toHaveProperty('github');
    expect(data.services).toHaveProperty('credly');
  });

  it('returns service configuration status', async () => {
    process.env.NEXT_PUBLIC_GITHUB_USERNAME = 'test-user';
    process.env.NEXT_PUBLIC_CREDLY_USER_ID = 'test-credly';

    const response = await GET();
    const data = await response.json();

    expect(data.services.github).toBe('configured');
    expect(data.services.credly).toBe('configured');
  });

  it('returns not configured when env vars are missing', async () => {
    delete process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    delete process.env.NEXT_PUBLIC_CREDLY_USER_ID;

    const response = await GET();
    const data = await response.json();

    expect(data.services.github).toBe('not configured');
    expect(data.services.credly).toBe('not configured');
  });

  it('handles errors gracefully', async () => {
    // Mock process.uptime to throw an error
    const originalUptime = process.uptime;
    process.uptime = jest.fn(() => {
      throw new Error('Test error');
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty('status', 'unhealthy');
    expect(data).toHaveProperty('error', 'Test error');
    expect(data).toHaveProperty('timestamp');

    // Restore original function
    process.uptime = originalUptime;
  });

  it('returns correct timestamp format', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});