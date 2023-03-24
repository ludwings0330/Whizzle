FROM node:18.14.2 AS builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:latest
#RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

RUN rm -Rf /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]