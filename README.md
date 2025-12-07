# 🚀 Terminal Portfolio

A modern, interactive terminal-style portfolio website built with Next.js 15, React 19, and TypeScript. Features a fully functional command-line interface with customizable themes and cursor styles.

## ✨ Features

- **Interactive Terminal Interface** - Real command-line experience with command history and autocomplete
- **Matrix Rain Animation** - Animated falling characters background with performance optimization
- **10 Custom Themes** - Beautiful color schemes from Celestial Waters to Lotus Bloom
- **10 Cursor Styles** - Personalize your terminal with block, pipe, arrow, star, and more
- **GitHub Integration** - Live data from GitHub profile and repositories
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern Tech Stack** - Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4
- **Performance Optimized** - Lighthouse score 95+, memoized components, lazy loading
- **Accessibility First** - WCAG compliant with keyboard navigation and screen reader support

## 📜 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
npm test                 # Run all tests
npm run quality          # Run type-check + lint + test:ci (for CI/CD)
```

## 🎮 Available Commands

### Portfolio Information
| Command          | Description                              | Aliases                     |
|------------------|------------------------------------------|-----------------------------|
| `home`           | About and quick start guide              | `about`, `info`, `whoami`   |
| `help`           | Show all available commands              | `ls`, `dir`                 |
| `skills`         | Technical skills by category             | -                           |
| `stack`          | Daily tech stack overview                | -                           |
| `projects`       | GitHub projects with live data           | -                           |
| `education`      | Educational background                   | `edu`, `school`             |
| `timeline`       | Work experience and career timeline      | `exp`, `experience`, `work` |
| `contact`        | Contact information                      | `contact-info`, `reach`     |

### Achievements & Content
| Command          | Description                              | Aliases                     |
|------------------|------------------------------------------|-----------------------------|
| `certifications` | Professional certifications              | `certs`, `badges`, `credentials` |
| `achievements`   | Key achievements and milestones          | `wins`, `milestones`        |
| `blog`           | Blog posts and articles                  | `articles`, `posts`, `writing` |

### Customization
| Command          | Description                              | Aliases                     |
|------------------|------------------------------------------|-----------------------------|
| `theme`          | Change terminal theme (10 options)       | `themes`, `colors`, `style` |
| `theme [1-10]`   | Quick theme selection by number          | -                           |
| `cursor`         | Change cursor style (9 options)          | -                           |
| `cursor [1-9]`   | Quick cursor selection by number         | -                           |

### System
| Command          | Description                              | Aliases                     |
|------------------|------------------------------------------|-----------------------------|
| `clear`          | Clear the terminal screen                | `cls`, `clr`                |

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/immortals-ume/terminal-portfolio.git
cd terminal-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Copy the example environment file and update it with your information:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# GitHub Token (Optional - for better API limits)
GITHUB_TOKEN=your-github-personal-access-token
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🔧 Customization

### Personal Information

Update your portfolio data in `src/data/portfolio.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  location: "Your City, Country",
  // ... more fields
};

export const skills = [...];
export const workExperience = [...];
export const education = [...];
export const certifications = [...];
export const achievements = [...];
export const blogPosts = [...];
```

### GitHub Integration

Add `GITHUB_TOKEN` in your `.env.local` for higher API rate limits (5000 vs 60 requests/hour):
- Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
- Generate a new token with `public_repo` scope
- Add it as `GITHUB_TOKEN` in `.env.local`

### Themes & Styling

- **10 Built-in Themes**: Use `theme` command or `theme [1-10]` for quick selection
- **Custom Themes**: Edit theme definitions in `src/app/components/commands/Theme.tsx`
- **Cursor Styles**: 10 options available via `cursor` command or `cursor [1-10]`
- **Cursor Options**: Edit cursor definitions in `src/app/components/commands/Cursor.tsx`
- **Global Styles**: Modify `src/app/globals.css` for base styling
- **Tailwind Config**: Customize `tailwind.config.ts` for design tokens

### Component Customization

All command components are in `src/app/components/commands/`:
- `Home.tsx` - About and quick start guide
- `Help.tsx` - Available commands list
- `Contact.tsx` - Contact information
- `Skills.tsx` - Technical skills by category (fast)
- `EnhancedSkills.tsx` - Skills with proficiency levels
- `SkillBars.tsx` - Skill proficiency bars visualization
- `Stack.tsx` - Daily tech stack overview
- `Timeline.tsx` - Work experience timeline
- `Education.tsx` - Educational background
- `Projects.tsx` - GitHub projects integration
- `Certifications.tsx` - Professional certifications
- `Achievements.tsx` - Key milestones
- `Blog.tsx` - Blog posts and articles
- `Theme.tsx` - Theme selector
- `Cursor.tsx` - Cursor style selector

## 📱 Mobile & Responsive Design

Fully optimized for all devices:

- **Touch-friendly Interface** - Optimized terminal input for mobile
- **Responsive Grid Layouts** - Adapts from mobile to desktop
- **Performance Optimized** - Reduced Matrix animation on mobile for better performance
- **Proper Viewport Handling** - No zoom issues on mobile browsers
- **Keyboard Support** - Full keyboard navigation on desktop

## 🎨 Themes

Choose from 10 beautiful themes (use `theme` command):

1. **Essence 01** - Celestial Waters (cyan/blue)
2. **Essence 02** - Void of Silence (purple/dark)
3. **Essence 03** - Crimson Whispers (red/pink)
4. **Essence 04** - Radiant Dawn (orange/gold)
5. **Essence 05** - Scarlet Flame (red/orange)
6. **Essence 06** - Shadow's Edge (dark/gray)
7. **Essence 07** - Twilight Mist (purple/blue)
8. **Essence 08** - Solar Glow (yellow/gold)
9. **Essence 09** - Emerald Pulse (green/teal)
10. **Essence 10** - Lotus Bloom (pink/purple)

Each theme includes carefully crafted color palettes for optimal readability and aesthetics.

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/immortals-ume/terminal-portfolio)

**Quick Deploy:**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. (Optional) Add `GITHUB_TOKEN` environment variable in Vercel dashboard
4. Deploy automatically on every push to main

The project includes a CI/CD pipeline via GitHub Actions that runs quality checks on every push.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 15.5.0](https://nextjs.org/) - React framework with App Router
- **Frontend**: [React 19.1.0](https://react.dev/) - Latest React with concurrent features
- **Language**: [TypeScript 5.9.3](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS 4.1.16](https://tailwindcss.com/) - Utility-first CSS framework

### UI & Animations
- **Animations**: [Framer Motion 11.0.0](https://www.framer.com/motion/) - Production-ready animations
- **Icons**: [React Icons 5.5.0](https://react-icons.github.io/react-icons/) - Popular icon libraries
- **Canvas**: Custom Matrix rain animation with performance optimization
- **CSS Optimization**: Critters 0.0.23 for critical CSS inlining

### Development & Quality
- **Testing**: Jest 29.7.0 + React Testing Library 16.0.0 + Playwright 1.40.0
- **Linting**: ESLint 9.38.0 with TypeScript support
- **Code Formatting**: Prettier 3.2.0
- **Type Checking**: Strict TypeScript configuration
- **Performance**: Next.js Bundle Analyzer, Lighthouse 12.8.2
- **Accessibility**: Axe-core Playwright 4.11.0

### APIs & Integration
- **GitHub API**: Live repository and profile data
- **Web Vitals**: Real-time performance monitoring (5.1.0)

## 📊 Performance

Optimized for speed and user experience:

- **Lighthouse Score**: 95+ across all metrics (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All green
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Bundle Size**: Optimized with code splitting and lazy loading
- **Load Time**: < 2s on 3G networks
- **Optimization Features**:
  - React.memo() for all components
  - useMemo() and useCallback() for expensive operations
  - Dynamic imports for heavy components
  - Optimized Matrix animation with requestAnimationFrame
  - Image optimization with Next.js Image component

See [PERFORMANCE.md](PERFORMANCE.md) for detailed performance documentation.

## 📚 Documentation

- **[Environment Setup Guide](docs/environment-setup.md)** - Configure environment variables
- **[Testing Guide](docs/testing-guide.md)** - Comprehensive testing documentation
- **[Deployment Guide](DEPLOYMENT.md)** - Vercel deployment instructions
- **[Performance Guide](PERFORMANCE.md)** - Performance optimization details
- **[Styling Guide](STYLING-GUIDE.md)** - Tailwind CSS patterns and best practices

## 🧪 Testing

Comprehensive test coverage with multiple testing strategies:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci

# Run E2E tests with Playwright
npm run test:e2e

# Run component tests only
npm run test:component

# Run API tests only
npm run test:api

# Quality checks (type-check + lint + test:ci)
npm run quality
```

See [docs/testing-guide.md](docs/testing-guide.md) for detailed testing documentation.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- All tests pass (`npm run quality`)
- Code follows the existing style
- TypeScript types are properly defined
- Documentation is updated if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic terminal interfaces and the Matrix aesthetic
- Built with modern web technologies an