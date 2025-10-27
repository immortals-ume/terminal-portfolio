#!/bin/bash

# Terminal Portfolio Docker Build Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Building Terminal Portfolio Docker Image${NC}"

# Default values
IMAGE_NAME="terminal-portfolio"
TAG="latest"
PLATFORM="linux/amd64,linux/arm64"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -t|--tag)
      TAG="$2"
      shift 2
      ;;
    -n|--name)
      IMAGE_NAME="$2"
      shift 2
      ;;
    -p|--platform)
      PLATFORM="$2"
      shift 2
      ;;
    --no-cache)
      NO_CACHE="--no-cache"
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [OPTIONS]"
      echo "Options:"
      echo "  -t, --tag TAG        Docker image tag (default: latest)"
      echo "  -n, --name NAME      Docker image name (default: terminal-portfolio)"
      echo "  -p, --platform PLAT  Target platform (default: linux/amd64,linux/arm64)"
      echo "  --no-cache           Build without cache"
      echo "  -h, --help           Show this help message"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Load environment variables from .env file
if [ -f .env ]; then
    echo -e "${YELLOW}📄 Loading environment variables from .env${NC}"
    export $(cat .env | grep -v '^#' | xargs)
fi

# Build arguments (non-sensitive data only)
BUILD_ARGS=""
if [ ! -z "$NEXT_PUBLIC_GITHUB_USERNAME" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME"
fi
if [ ! -z "$NEXT_PUBLIC_FULL_NAME" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_FULL_NAME=\"$NEXT_PUBLIC_FULL_NAME\""
fi
if [ ! -z "$NEXT_PUBLIC_EMAIL" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL"
fi
if [ ! -z "$NEXT_PUBLIC_WEBSITE" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_WEBSITE=$NEXT_PUBLIC_WEBSITE"
fi
if [ ! -z "$NEXT_PUBLIC_CREDLY_USER_ID" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_CREDLY_USER_ID=$NEXT_PUBLIC_CREDLY_USER_ID"
fi
if [ ! -z "$NEXT_PUBLIC_FEATURED_REPOS" ]; then
    BUILD_ARGS="$BUILD_ARGS --build-arg NEXT_PUBLIC_FEATURED_REPOS=\"$NEXT_PUBLIC_FEATURED_REPOS\""
fi

echo -e "${YELLOW}🔨 Building Docker image: ${IMAGE_NAME}:${TAG}${NC}"
echo -e "${YELLOW}📦 Platform: ${PLATFORM}${NC}"

# Build the Docker image
docker buildx build \
    --platform $PLATFORM \
    $BUILD_ARGS \
    $NO_CACHE \
    -t $IMAGE_NAME:$TAG \
    .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo -e "${GREEN}📋 Image: ${IMAGE_NAME}:${TAG}${NC}"
    
    # Show image size
    IMAGE_SIZE=$(docker images $IMAGE_NAME:$TAG --format "table {{.Size}}" | tail -n 1)
    echo -e "${GREEN}📏 Size: ${IMAGE_SIZE}${NC}"
    
    echo -e "${BLUE}🚀 To run the container:${NC}"
    echo -e "${BLUE}   docker run -p 3000:3000 ${IMAGE_NAME}:${TAG}${NC}"
    echo -e "${BLUE}🌐 Then visit: http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi