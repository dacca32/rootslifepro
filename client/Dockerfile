# Development stage
FROM node:latest as development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL}

RUN npm run build

# Set the command to run the app
CMD ["npm", "run", "dev"]


# Production stage
FROM caddy:2-alpine as production
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/dist /srv