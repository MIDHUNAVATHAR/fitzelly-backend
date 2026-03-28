# Use Node.js 20 alpine as base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application (compiles TS to JS)
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json (for production dependencies)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy compiled files from the build stage
COPY --from=build /app/dist ./dist

# The default command (can be overridden in docker-compose)
CMD ["npm", "start"]
