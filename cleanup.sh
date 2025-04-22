#!/bin/bash

echo "🧹 Stopping and removing containers..."
docker-compose -f infra/docker-compose.yml down --volumes --remove-orphans

echo "🔥 Removing old Docker images named 'infra-backend' and 'infra-frontend'..."
docker rmi infra-backend infra-frontend --force 2>/dev/null || echo "⚠️  Images not found or already removed."

echo "✅ Cleanup complete. You're ready to rebuild!"
