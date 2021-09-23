FROM node:14

WORKDIR /app

ENV PORT=80
ENV HOST=0.0.0.0
ENV COOKIE_SECRET=""
ENV HOST=""

COPY package.json .
COPY build .

EXPOSE ${PORT}
CMD [ "node", "index.js" ]