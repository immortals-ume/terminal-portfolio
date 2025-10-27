require('@testing-library/jest-dom');

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname: () => '/',
}));

// Mock environment variables
process.env.NEXT_PUBLIC_GITHUB_USERNAME = 'test-user';
process.env.NEXT_PUBLIC_CREDLY_USER_ID = 'test-credly-id';

// Mock Canvas API
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 10 })),
}));

// Mock localStorage and sessionStorage
const storageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = storageMock;
global.sessionStorage = storageMock;

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock Next.js server components for API tests
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, options = {}) => ({
    url: url || 'http://localhost:3000',
    method: options.method || 'GET',
    headers: new Map(Object.entries(options.headers || {})),
    nextUrl: { 
      searchParams: new URLSearchParams(options.searchParams || '') 
    },
  })),
  NextResponse: {
    json: jest.fn((data, options = {}) => ({
      json: async () => data,
      status: options?.status || 200,
      ok: (options?.status || 200) >= 200 && (options?.status || 200) < 300,
      headers: new Map(Object.entries(options?.headers || {})),
    })),
  },
}));