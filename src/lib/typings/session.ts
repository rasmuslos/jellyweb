export type JellyfinSession = {
    token: string,
    server: string,
    userId: string,
    deviceId: string,
}
export type Settings = {
    "images.hero"?: boolean,
    "images.blur"?: boolean,
}

export type Session = {
    active: JellyfinSession,
    stored: JellyfinSession[],
}