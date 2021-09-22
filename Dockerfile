FROM node:14
WORKDIR /usr/src/app

ENV PORT=80
ENV HOST=0.0.0.0
ENV COOKIE_SECRET=CHANGEME_qwertzuiopasdfghjklyxcvbnm
ENV VITE_HOST=""

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE ${PORT}
CMD [ "node", "build/index.js" ]