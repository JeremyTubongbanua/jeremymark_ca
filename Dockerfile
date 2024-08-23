# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Clean up any previous installations or builds
RUN rm -rf node_modules dist

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

# Copy the built files from the build stage to the NGINX HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Adjust permissions on the assets directory
RUN chmod -R 755 /usr/share/nginx/html/assets && \
    chown -R nginx:nginx /usr/share/nginx/html/assets

# Expose port 80
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]