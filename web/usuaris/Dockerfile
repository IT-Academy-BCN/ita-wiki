FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
