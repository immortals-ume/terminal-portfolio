import { GET, POST } from '@/app/api/credly/route';

// Mock fetch
global.fetch = jest.fn();

describe('/api/credly', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  describe('GET', () => {
    it('returns 400 when userId is missing', async () => {
      const request = {
        nextUrl: {
          searchParams: new URLSearchParams()
        }
      };
      const response = await GET(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('User ID is required');
    });

    it('fetches data from Credly API successfully', async () => {
      const mockCredlyResponse = {
        data: [
          {
            id: 'cert-1',
            name: 'Test Certification',
            issuer: { name: 'Test Issuer' },
          },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCredlyResponse,
      });

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams('userId=test-user')
        }
      };
      const response = await GET(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toEqual(mockCredlyResponse.data);
      expect(data.metadata.total_count).toBe(1);
    });

    it('handles Credly API failure gracefully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams('userId=test-user')
        }
      };
      const response = await GET(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toEqual([]);
      expect(data.metadata.total_count).toBe(0);
      expect(data.error).toContain('Unable to fetch from Credly API');
    });

    it('handles network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams('userId=test-user')
        }
      };
      const response = await GET(request as any);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to connect to Credly API');
    });

    it('transforms response data correctly', async () => {
      const mockCredlyResponse = {
        data: [
          { id: '1', name: 'Cert 1' },
          { id: '2', name: 'Cert 2' },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCredlyResponse,
      });

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams('userId=test-user')
        }
      };
      const response = await GET(request as any);
      const data = await response.json();

      expect(data.data).toHaveLength(2);
      expect(data.metadata.total_count).toBe(2);
    });
  });

  describe('POST', () => {
    it('handles refresh requests', async () => {
      const mockCredlyResponse = {
        data: [{ id: 'cert-1', name: 'Test Certification' }],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCredlyResponse,
      });

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams('userId=test-user')
        }
      };
      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toEqual(mockCredlyResponse.data);
    });
  });
});