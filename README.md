# Jellyweb
A modern looking web client for Jellyfin written in svelte

## Install
### Docker run:
`docker run -p 7575:80 -e COOKIE_SECRET=change_me ghcr.io/rasmuslos/jellyweb`

### Docker Compose:
```yml
  jellyweb:
    name: "Jellyweb"
    image: ghcr.io/rasmuslos/jellyweb:latest
    restart: "unless-stopped"
    ports:
      - "7575:80"
    environment:
      - COOKIE_SECRET=change_me
```
\
Then visit [localhost:7575](http://localhost:7575)

## Environment variables
`COOKIE_SECRET` **required** Secret used to encrypt session data \
`HOST` **optional** only allow connections to this host

## Building
1. Clone or download this repository
`git clone https://github.com/rasmuslos/jellyweb.git && cd jellyweb`
2. Install dependencies
`npm install`
3. Start the server (development)
`npm run dev`
4. Build the application
`npm run build`
5. Start the server
`npm run preview` or `node ./build/index.js`
