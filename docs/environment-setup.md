# Environment Configuration Guide

This guide helps you set up environment variables for your Terminal Portfolio.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Or for minimal setup:
   ```bash
   cp .env.local.minimal .env.local
   ```

2. **Update the values** in `.env.local` with your actual information

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Required Variables

### Personal Information
```env
NEXT_PUBLIC_FULL_NAME="Your Full Name"
NEXT_PUBLIC_EMAIL="your.email@example.com"
NEXT_PUBLIC_GITHUB_USERNAME="your-github-username"
```

### Credly Integration
```env
NEXT_PUBLIC_CREDLY_USER_ID="your-credly-user-id"
```

**How to find your Credly User ID:**
1. Go to your Credly profile
2. Copy the ID from the URL: `https://www.credly.com/users/YOUR_ID_HERE`

## Optional but Recommended

### GitHub Token
```env
GITHUB_TOKEN="ghp_your_token_here"
```

**Benefits:**
- Higher API rate limits (5000 vs 60 requests/hour)
- Access to private repository stats
- More reliable GitHub integration

**How to create:**
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy the generated token

### Featured Repositories
```env
NEXT_PUBLIC_FEATURED_REPOS="terminal-portfolio,awesome-project,cool-app"
```

## Environment Variable Types

### Public Variables (`NEXT_PUBLIC_*`)
- Exposed to the browser
- Used for client-side functionality
- Safe for non-sensitive data

### Private Variables
- Server-side only
- Used for API keys and sensitive data
- Never exposed to the browser

## Feature Flags

Enable/disable specific features:

```env
NEXT_PUBLIC_ENABLE_MATRIX_BACKGROUND="true"
NEXT_PUBLIC_ENABLE_SOUND_EFFECTS="false"
NEXT_PUBLIC_ENABLE_EASTER_EGGS="true"
```

## Performance Tuning

Customize animation and performance settings:

```env
NEXT_PUBLIC_MATRIX_SPEED="50"           # Lower = faster
NEXT_PUBLIC_MATRIX_DENSITY="0.8"       # 0-1 scale
NEXT_PUBLIC_TERMINAL_TYPING_SPEED="50"  # Milliseconds
```

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use strong, unique tokens** for API access
3. **Regularly rotate API keys** and tokens
4. **Keep sensitive data** in private variables only

## Troubleshooting

### Common Issues

**Certifications not loading?**
- Check your `NEXT_PUBLIC_CREDLY_USER_ID`
- Ensure your Credly profile is public
- Verify the user ID format

**GitHub stats not showing?**
- Add a `GITHUB_TOKEN` for better rate limits
- Check your GitHub username is correct
- Ensure repositories are public

**Environment variables not updating?**
- Restart your development server
- Clear browser cache
- Check for typos in variable names

### Testing Your Configuration

Run these commands in your terminal to test:

```bash
# Test certifications
curl "http://localhost:3000/api/credly?userId=your-user-id"

# Check environment variables are loaded
npm run dev
# Then visit http://localhost:3000 and use terminal commands
```

## Deployment

### Vercel
1. Go to your project settings
2. Add environment variables in the "Environment Variables" section
3. Redeploy your application

### Netlify
1. Go to Site settings > Environment variables
2. Add your variables
3. Trigger a new deploy

### Other Platforms
Refer to your platform's documentation for environment variable configuration.

## Example Configurations

### Personal Portfolio
```env
NEXT_PUBLIC_FULL_NAME="John Doe"
NEXT_PUBLIC_EMAIL="john@example.com"
NEXT_PUBLIC_GITHUB_USERNAME="johndoe"
NEXT_PUBLIC_CREDLY_USER_ID="john-doe.123abc"
NEXT_PUBLIC_WEBSITE="https://johndoe.dev"
```

### Company Portfolio
```env
NEXT_PUBLIC_FULL_NAME="Jane Smith"
NEXT_PUBLIC_EMAIL="jane.smith@company.com"
NEXT_PUBLIC_COMPANY="Tech Corp"
NEXT_PUBLIC_ROLE="Senior Developer"
NEXT_PUBLIC_GITHUB_USERNAME="janesmith-techcorp"
```

## Need Help?

- Check the [README.md](../README.md) for general setup
- Review [credly-setup.md](../credly-setup.md) for certification integration
- Open an issue on GitHub for specific problems