FROM node:14

USER jellyweb
WORKDIR /app

ENV PORT=80
ENV HOST=0.0.0.0
ENV COOKIE_SECRET=""
ENV VITE_HOST=""

COPY build .

EXPOSE ${PORT}
CMD [ "node", "index.js" ]