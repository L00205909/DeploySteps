
FROM node:26.13.1-alpine3.24 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx/nginx-unprivileged:alpine3.24 AS runtime

# Update vulnerable Alpine packages
USER root
RUN apk upgrade --no-cache libxml2 \
    && apk info -v libxml2

# Restore the unprivileged user
USER 101

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080