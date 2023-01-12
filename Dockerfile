FROM node:18 as dev

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=dev /src/build /usr/share/nginx/html
COPY --from=dev /src/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80