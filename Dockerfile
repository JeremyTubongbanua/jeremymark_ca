# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN rm -rf node_modules dist

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./certs/fullchain1.pem /etc/ssl/certs/fullchain.pem
COPY ./certs/privkey1.pem /etc/ssl/private/privkey.pem

RUN chmod -R 755 /usr/share/nginx/html/assets && \
    chown -R nginx:nginx /usr/share/nginx/html/assets

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]