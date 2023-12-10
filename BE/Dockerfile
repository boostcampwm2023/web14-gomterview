FROM node:20-alpine

RUN apk update && apk add ffmpeg

RUN mkdir -p /var/app/
WORKDIR /var/app/

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build


EXPOSE 8080
CMD ["node", "dist/main.js"]