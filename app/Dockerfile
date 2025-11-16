# single-stage build (small image)
FROM node:18-alpine

WORKDIR /app

# Copy package files first and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
