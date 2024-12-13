# Stage 1: Building the application
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Running the application
FROM builder AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 3: Running the application
FROM node:18
WORKDIR /app

# Copy built code, node_modules and prisma directory from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

EXPOSE 3000
CMD ["npm", "run", "start:prod"]