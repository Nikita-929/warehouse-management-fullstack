#!/bin/bash

# Build backend
echo "Building backend..."
cd backend
./mvnw clean package -DskipTests
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Build complete!"