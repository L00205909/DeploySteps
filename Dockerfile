FROM node:26.13.1-alpine3.24 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx/nginx-unprivileged:alpine3.24 AS runtime
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
