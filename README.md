# Jellyweb
A modern looking web client for Jellyfin written in svelte

## Install
### Docker run:
`docker run -p 7575:80 -e JWT_SECRET=change_me ghcr.io/rasmuslos/jellyweb`

### Docker Compose:
```yml
  jellyweb:
    name: "Jellyweb"
    image: ghcr.io/rasmuslos/jellyweb:latest
    restart: "unless-stopped"
    ports:
      - "7575:80"
    environment:
      - JWT_SECRET=change_me
```
\
Then visit [localhost:7575](http://localhost:7575)

## Environment variables
`JWT_SECRET` **required** Secret used to encrypt session data \
`FORCED_HOST` **optional** Only allow to select this host

`ORIGIN` **optional** Tell the server the origin it is served on
`PROTOCOL_HEADER` **optional** Tell the server the protocol it is served on
`HOST_HEADER` **optional** Tell the server the host it is served on

> `PROTOCOL_HEADER` & `HOST_HEADER` are recommended if you use a reverse proxy. For more detailed information take a look at [This document](https://github.com/sveltejs/kit/tree/master/packages/adapter-node)*

## Building
1. Clone or download this repository
`git clone https://github.com/rasmuslos/jellyweb.git && cd jellyweb`
2. Install dependencies
`npm install`
3. Build the application
`JWT_SECRET=change_me npm run build`
4. Delete node_modules `rm -r node_modules`
5. Install production dependencies `npm ci --prod`
6. Copy package.json & node_modules `cp package.json build && cp -r node_modules build`
7. Start the server
`JWT_SECRET=change_me node ./build/index.js`