FROM jenkins/jenkins:lts

USER root
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

USER jenkins

FROM node:20-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm audit --production || true
COPY . .
RUN npm run build

# Serve static files with latest nginx
FROM nginx:stable-alpine
RUN apk update && apk upgrade
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
