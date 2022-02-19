FROM node:14

WORKDIR /app

ENV PORT=80
ENV HOST=0.0.0.0
ENV ORIGIN=""
ENV PROTOCOL_HEADER=""
ENV HOST_HEADER=""

ENV JWT_SECRET=""
ENV FORCED_HOST=""

COPY build .

EXPOSE ${PORT}
CMD [ "node", "index.js" ]