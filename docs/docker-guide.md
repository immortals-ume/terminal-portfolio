# Docker Deployment Guide

This guide covers how to build and deploy the Terminal Portfolio using Docker.

## Quick Start

### 1. Build the Docker Image

```bash
# Basic build
docker build -t terminal-portfolio .

# Build with custom tag
docker build -t terminal-portfolio:v1.0.0 .

# Build with build arguments
docker build \
  --build-arg NEXT_PUBLIC_GITHUB_USERNAME=your-username \
  --build-arg NEXT_PUBLIC_FULL_NAME="Your Name" \
  -t terminal-portfolio .
```

### 2. Run the Container

```bash
# Basic run
docker run -p 3000:3000 terminal-portfolio

# Run with environment variables
docker run -p 3000:3000 \
  -e GITHUB_TOKEN=your_token \
  terminal-portfolio

# Run with env file
docker run -p 3000:3000 --env-file .env terminal-portfolio
```

### 3. Using Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Build Scripts

### Automated Build Script

Use the provided build script for easier builds:

```bash
# Make script executable
chmod +x scripts/docker-build.sh

# Basic build
./scripts/docker-build.sh

# Custom build
./scripts/docker-build.sh --tag v1.0.0 --name my-portfolio
```

### Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy
./scripts/deploy.sh

# Deploy with custom settings
./scripts/deploy.sh --env production --port 8080
```

## Environment Variables

### Build-time Variables (Non-sensitive)

These are baked into the image during build:

```dockerfile
ARG NEXT_PUBLIC_GITHUB_USERNAME
ARG NEXT_PUBLIC_FULL_NAME
ARG NEXT_PUBLIC_EMAIL
ARG NEXT_PUBLIC_WEBSITE
```

### Runtime Variables (Can be sensitive)

These are provided when running the container:

```bash
GITHUB_TOKEN=your_github_token
EMAIL_SERVICE_API_KEY=your_email_key
NODE_ENV=production
```

## Multi-stage Build

The Dockerfile uses a multi-stage build for optimization:

1. **deps**: Install dependencies
2. **builder**: Build the application
3. **runner**: Production runtime

This results in a smaller final image (~200MB vs ~1GB).

## Production Deployment

### Docker Compose Production

```yaml
version: '3.8'
services:
  app:
    image: terminal-portfolio:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GITHUB_TOKEN=${GITHUB_TOKEN}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### With Reverse Proxy

```yaml
version: '3.8'
services:
  app:
    image: terminal-portfolio:latest
    expose:
      - "3000"
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
```

## Health Checks

The application includes a health check endpoint:

```bash
# Check health
curl http://localhost:3000/api/health

# Response
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "memory": {
    "used": 45,
    "total": 128
  }
}
```

## Optimization Tips

### 1. Multi-platform Builds

```bash
# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t terminal-portfolio .
```

### 2. Layer Caching

The Dockerfile is optimized for layer caching:

- Dependencies are installed first
- Source code is copied last
- Only rebuilds when necessary

### 3. Image Size

Current optimized image size: ~200MB

To further reduce:

```dockerfile
# Use distroless base image
FROM gcr.io/distroless/nodejs18-debian11 AS runner
```

## Troubleshooting

### Common Issues

**Build fails with "ENOENT" error:**

```bash
# Clear Docker cache
docker system prune -a
docker build --no-cache -t terminal-portfolio .
```

**Container exits immediately:**

```bash
# Check logs
docker logs container-name

# Run interactively
docker run -it terminal-portfolio sh
```

**Port already in use:**

```bash
# Use different port
docker run -p 8080:3000 terminal-portfolio
```

### Debug Mode

Run container in debug mode:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_DEBUG_MODE=true \
  -e LOG_LEVEL=debug \
  terminal-portfolio
```

## Security Considerations

### 1. Non-root User

The container runs as a non-root user (`nextjs:nodejs`).

### 2. Minimal Base Image

Uses `node:18-alpine` for smaller attack surface.

### 3. No Sensitive Data in Image

Sensitive data is provided at runtime, not baked into the image.

### 4. Security Headers

The application includes security headers:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## Monitoring

### Container Metrics

```bash
# View resource usage
docker stats terminal-portfolio-app

# View processes
docker exec terminal-portfolio-app ps aux
```

### Application Metrics

The health endpoint provides basic metrics:

- Memory usage
- Uptime
- Service status

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          docker build \
            --build-arg NEXT_PUBLIC_GITHUB_USERNAME=${{ secrets.GITHUB_USERNAME }} \
            -t terminal-portfolio .
      
      - name: Deploy
        run: |
          docker run -d \
            -p 3000:3000 \
            -e GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }} \
            terminal-portfolio
```

## Best Practices

1. **Use specific tags** instead of `latest` in production
2. **Set resource limits** for containers
3. **Use health checks** for container orchestration
4. **Monitor logs** and metrics
5. **Keep images updated** for security patches
6. **Use secrets management** for sensitive data
7. **Implement proper backup** strategies

## Support

For issues with Docker deployment:

1. Check the logs: `docker logs container-name`
2. Verify environment variables
3. Test health endpoint
4. Check resource usage
5. Review Docker documentation