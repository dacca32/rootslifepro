# Use an official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite development server port
EXPOSE 3000

# Start the Vite application
CMD ["npm", "run", "dev"]

