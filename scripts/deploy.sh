#!/bin/bash

# Terminal Portfolio Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Terminal Portfolio Deployment Script${NC}"

# Default values
ENVIRONMENT="production"
IMAGE_NAME="terminal-portfolio"
TAG="latest"
CONTAINER_NAME="terminal-portfolio-app"
PORT="3000"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -e|--env)
      ENVIRONMENT="$2"
      shift 2
      ;;
    -t|--tag)
      TAG="$2"
      shift 2
      ;;
    -p|--port)
      PORT="$2"
      shift 2
      ;;
    --container-name)
      CONTAINER_NAME="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $0 [OPTIONS]"
      echo "Options:"
      echo "  -e, --env ENV        Environment (default: production)"
      echo "  -t, --tag TAG        Docker image tag (default: latest)"
      echo "  -p, --port PORT      Port to expose (default: 3000)"
      echo "  --container-name     Container name (default: terminal-portfolio-app)"
      echo "  -h, --help           Show this help message"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

echo -e "${YELLOW}🔧 Environment: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}🏷️  Image: ${IMAGE_NAME}:${TAG}${NC}"
echo -e "${YELLOW}🚪 Port: ${PORT}${NC}"

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${YELLOW}🛑 Stopping existing container: ${CONTAINER_NAME}${NC}"
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
fi

# Load environment variables
ENV_FILE=".env"
if [ -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}📄 Loading environment variables from ${ENV_FILE}${NC}"
else
    echo -e "${YELLOW}⚠️  No .env file found, using defaults${NC}"
fi

# Run the new container
echo -e "${YELLOW}🚀 Starting new container: ${CONTAINER_NAME}${NC}"

docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:3000 \
    --env-file $ENV_FILE \
    -e NODE_ENV=$ENVIRONMENT \
    $IMAGE_NAME:$TAG

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Container started successfully!${NC}"
    echo -e "${GREEN}🌐 Application is running at: http://localhost:${PORT}${NC}"
    
    # Wait a moment for the container to start
    sleep 3
    
    # Check if container is running
    if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${GREEN}✅ Container is running healthy${NC}"
        
        # Show container logs (last 10 lines)
        echo -e "${BLUE}📋 Recent logs:${NC}"
        docker logs --tail 10 $CONTAINER_NAME
        
        echo -e "${BLUE}💡 To view live logs: docker logs -f ${CONTAINER_NAME}${NC}"
        echo -e "${BLUE}💡 To stop container: docker stop ${CONTAINER_NAME}${NC}"
    else
        echo -e "${RED}❌ Container failed to start${NC}"
        echo -e "${RED}📋 Container logs:${NC}"
        docker logs $CONTAINER_NAME
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to start container!${NC}"
    exit 1
fi