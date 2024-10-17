FROM node:20.18.0

# Setting Up Working Directory 
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files (except those ignored in .dockerignore)
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start Application
CMD ["npm", "run", "dev"]