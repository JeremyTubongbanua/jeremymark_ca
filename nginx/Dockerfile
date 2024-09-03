# Nginx Dockerfile for reverse proxy
FROM nginx:alpine

WORKDIR /etc/nginx

COPY default.conf /etc/nginx/conf.d/

EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]