FROM node:alpine as build
WORKDIR /app
COPY package.json .
COPY default.conf .
RUN npm install --save-dev
COPY . . 
RUN npm ci
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000