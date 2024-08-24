# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN rm -rf node_modules dist

RUN npm install

RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration into the correct directory
COPY default.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html/assets && \
    chown -R nginx:nginx /usr/share/nginx/html/assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
