FROM node:14

WORKDIR /app

ENV PORT=80
ENV HOST=0.0.0.0
ENV ORIGIN=null
ENV PROTOCOL_HEADER=null
ENV HOST_HEADER=null

ENV JWT_SECRET=""

COPY package.json .
COPY node_modules .
COPY build .

EXPOSE ${PORT}
CMD [ "node", "index.js" ]