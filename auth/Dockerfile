# Dockerfile for Node.js backend
FROM node:20-bullseye-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm audit --production || true
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
