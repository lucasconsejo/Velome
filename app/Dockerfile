FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
ARG VITE_API_BASE_URL
ARG VITE_DASHBOARD_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_DASHBOARD_URL=$VITE_DASHBOARD_URL
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
