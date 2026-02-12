FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM deps AS build

COPY . .
RUN npm run build

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=build /app/dist /app/dist

CMD ["sh", "-c", "mkdir -p /frontend-dist && rm -rf /frontend-dist/* && cp -r /app/dist/* /frontend-dist/ && tail -f /dev/null"]
