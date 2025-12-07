# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/terminal-portfolio)

## Manual Deployment

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
# For preview deployment
vercel

# For production deployment
vercel --prod
```

## Environment Variables

Set these in your Vercel dashboard or via CLI:

```bash
vercel env add NEXT_PUBLIC_GITHUB_USERNAME
```

### Required Environment Variables:

- `NEXT_PUBLIC_GITHUB_USERNAME` - Your GitHub username for fetching repositories

## GitHub Actions Deployment

The repository includes automated deployment via GitHub Actions. To enable:

1. Go to your Vercel dashboard
2. Get your tokens:
    - `VERCEL_TOKEN` - Personal Access Token
    - `VERCEL_ORG_ID` - Organization ID
    - `VERCEL_PROJECT_ID` - Project ID

3. Add these as GitHub repository secrets:
    - Go to Settings > Secrets and variables > Actions
    - Add the three secrets above

## Local Development with Vercel

```bash
# Start Vercel development server
npm run vercel:dev

# Build for Vercel
npm run vercel:build

# Deploy to production
npm run vercel:deploy
```

## Vercel Configuration

The `vercel.json` file includes:

- Next.js build configuration
- Environment variable mapping
- Security headers
- API routes configuration

## Deployment Features

✅ Automatic deployments on push to main  
✅ Preview deployments for pull requests  
✅ Environment variable management  
✅ Custom domain support  
✅ SSL certificates  
✅ Global CDN  
✅ Serverless functions

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify environment variables are set
- Check build logs in Vercel dashboard

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Check they're set in Vercel dashboard
- Redeploy after adding new variables

### API Routes Not Working

- Verify API files are in `src/app/api/` directory
- Check `vercel.json` functions configuration
- Ensure proper export format for API routes