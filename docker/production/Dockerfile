FROM node:20.18.0

# Setting Up Working Directory 
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all files (except those ignored in .dockerignore)
COPY . .

# Build TypeScript Project
RUN npm run dist

# Expose the port your app runs on
EXPOSE 3000

# Start Application
CMD ["npm", "start"]