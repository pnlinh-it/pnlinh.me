FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY . .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
