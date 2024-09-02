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

# Ensure the SSL certificate files are available
COPY ./certs/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY ./certs/privkey.pem /etc/ssl/private/privkey.pem

RUN chmod -R 755 /usr/share/nginx/html/assets && \
    chown -R nginx:nginx /usr/share/nginx/html/assets

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]