export type JellyfinSession = {
    token: string,
    server: string,
    userId: string,
    deviceId: string,
}
export type Session = {
    active: JellyfinSession,
    stored: JellyfinSession[],
}