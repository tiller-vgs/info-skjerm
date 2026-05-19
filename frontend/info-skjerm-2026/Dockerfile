FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

# VITE_API_BASE_URL is baked into the bundle at build time by Vite.
# Pass empty string in production (same-origin nginx setup); override for other envs.
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
