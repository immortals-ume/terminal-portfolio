# Comprehensive Testing Guide

This guide covers all aspects of testing in the Terminal Portfolio project.

## Testing Stack

### Unit & Integration Testing

- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **@testing-library/user-event** - User interaction simulation

### E2E Testing

- **Playwright** - End-to-end testing framework
- **@axe-core/playwright** - Accessibility testing

### Code Quality

- **ESLint** - Code linting with security and testing plugins
- **Prettier** - Code formatting
- **SonarQube** - Code quality analysis
- **Husky** - Git hooks for pre-commit/pre-push checks

## Test Types

### 1. Unit Tests

Test individual components and functions in isolation.

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

**Location**: `__tests__/unit/`

**Example**:

```typescript
// __tests__/unit/utils.test.ts
import { formatDate } from '@/utils/dateUtils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-01')).toBe('Jan 2024');
  });
});
```

### 2. Component Tests

Test React components with user interactions.

```bash
# Run component tests
npm run test:component
```

**Location**: `__tests__/components/`

**Example**:

```typescript
// __tests__/components/Contact.test.tsx
import { render, screen } from '@testing-library/react';
import Contact from '@/app/components/commands/Contact';

describe('Contact Component', () => {
  it('renders contact information', () => {
    render(<Contact />);
    expect(screen.getByText('Professional Contact Information:')).toBeInTheDocument();
  });
});
```

### 3. Integration Tests

Test component interactions and data flow.

```bash
# Run integration tests
npm run test:integration
```

**Location**: `__tests__/integration/`

### 4. API Tests

Test API endpoints and external integrations.

```bash
# Run API tests
npm run test:api
```

**Location**: `__tests__/api/`

### 5. E2E Tests

Test complete user workflows across the application.

```bash
# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed
```

**Location**: `e2e/`

## Test Configuration

### Jest Configuration

Located in `jest.config.js` with:

- TypeScript support
- Module path mapping
- Coverage thresholds
- Custom matchers
- Mock configurations

### Playwright Configuration

Located in `playwright.config.ts` with:

- Multi-browser testing
- Mobile device testing
- Screenshot/video capture
- Accessibility testing

## Coverage Requirements

### Global Thresholds

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Component-Specific

- **Components**: 85% (higher standard)
- **API Routes**: 75% (external dependencies)

## Running Tests

### Development Workflow

```bash
# Quick test run
npm test

# Watch mode for development
npm run test:watch

# Full test suite
npm run test:all

# Quality checks
npm run quality
```

### CI/CD Pipeline

```bash
# Pre-commit checks
npm run pre-commit

# Full pipeline
npm run test:ci && npm run test:e2e
```

## Writing Tests

### Best Practices

1. **Test Behavior, Not Implementation**
   ```typescript
   // ❌ Bad - testing implementation
   expect(component.state.isLoading).toBe(false);
   
   // ✅ Good - testing behavior
   expect(screen.getByText('Data loaded')).toBeInTheDocument();
   ```

2. **Use Descriptive Test Names**
   ```typescript
   // ❌ Bad
   it('works', () => {});
   
   // ✅ Good
   it('displays error message when API call fails', () => {});
   ```

3. **Arrange, Act, Assert Pattern**
   ```typescript
   it('submits form with valid data', async () => {
     // Arrange
     render(<ContactForm />);
     const nameInput = screen.getByLabelText('Name');
     
     // Act
     await userEvent.type(nameInput, 'John Doe');
     await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
     
     // Assert
     expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
   });
   ```

### Component Testing Patterns

#### Testing User Interactions

```typescript
import userEvent from '@testing-library/user-event';

it('handles user input correctly', async () => {
  const user = userEvent.setup();
  render(<Terminal />);
  
  const input = screen.getByRole('textbox');
  await user.type(input, 'help');
  await user.keyboard('{Enter}');
  
  expect(screen.getByText('Available commands:')).toBeInTheDocument();
});
```

#### Testing Async Operations

```typescript
it('loads data asynchronously', async () => {
  render(<Certifications />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('Certifications loaded')).toBeInTheDocument();
  });
});
```

#### Mocking External Dependencies

```typescript
jest.mock('@/lib/api', () => ({
  fetchCertifications: jest.fn().mockResolvedValue([
    { id: '1', name: 'Test Cert' }
  ])
}));
```

### API Testing Patterns

#### Testing Success Cases

```typescript
it('returns health status', async () => {
  const response = await GET();
  const data = await response.json();
  
  expect(response.status).toBe(200);
  expect(data.status).toBe('healthy');
});
```

#### Testing Error Cases

```typescript
it('handles API errors gracefully', async () => {
  // Mock fetch to reject
  global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
  
  const response = await GET(request);
  expect(response.status).toBe(500);
});
```

### E2E Testing Patterns

#### Page Object Model

```typescript
// e2e/pages/terminal.page.ts
export class TerminalPage {
  constructor(private page: Page) {}
  
  async executeCommand(command: string) {
    await this.page.fill('input[type="text"]', command);
    await this.page.press('input[type="text"]', 'Enter');
  }
  
  async expectOutput(text: string) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
  }
}
```

#### Accessibility Testing

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('should be accessible', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

## Debugging Tests

### Jest Debugging

```bash
# Debug specific test
npm test -- --testNamePattern="specific test" --verbose

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Playwright Debugging

```bash
# Debug mode
npm run test:e2e -- --debug

# Headed mode
npm run test:e2e:headed

# UI mode
npm run test:e2e:ui
```

## Continuous Integration

### GitHub Actions

The CI pipeline runs:

1. Code quality checks (ESLint, Prettier, TypeScript)
2. Security audit
3. Unit and integration tests
4. E2E tests
5. SonarQube analysis
6. Performance testing (Lighthouse)

### Pre-commit Hooks

Husky runs these checks before each commit:

- Lint staged files
- Type checking
- Unit tests

### Pre-push Hooks

Additional checks before pushing:

- Full test suite
- Security audit
- Build verification

## Test Data Management

### Fixtures

```typescript
// __tests__/fixtures/certifications.ts
export const mockCertifications = [
  {
    id: 'cert-1',
    name: 'AWS Certified Developer',
    issuer: { name: 'Amazon Web Services' },
    issued_at: '2024-01-01',
  },
];
```

### Test Utilities

```typescript
// __tests__/utils/test-utils.tsx
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: TestProviders });
}
```

## Performance Testing

### Lighthouse Integration

```bash
# Run performance tests
npm run lighthouse
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze
```

## Troubleshooting

### Common Issues

**Tests timing out**:

```typescript
// Increase timeout for specific tests
it('slow operation', async () => {
  // test code
}, 15000); // 15 second timeout
```

**Mock not working**:

```typescript
// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

**E2E tests flaky**:

```typescript
// Add explicit waits
await page.waitForSelector('[data-testid="element"]');
await page.waitForLoadState('networkidle');
```

## Reporting

### Coverage Reports

- HTML: `coverage/lcov-report/index.html`
- LCOV: `coverage/lcov.info`
- JSON: `coverage/coverage-final.json`

### Test Results

- JUnit XML: `test-results/results.xml`
- HTML Report: `test-results/report.html`
- Playwright Report: `playwright-report/index.html`

## Best Practices Summary

1. **Write tests first** (TDD approach)
2. **Test user behavior**, not implementation details
3. **Keep tests simple** and focused
4. **Use descriptive names** for tests and test files
5. **Mock external dependencies** appropriately
6. **Maintain high coverage** but focus on quality
7. **Run tests frequently** during development
8. **Use CI/CD** for automated testing
9. **Review test failures** carefully
10. **Keep tests maintainable** and up-to-date

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)