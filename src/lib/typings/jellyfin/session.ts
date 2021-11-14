export type fakeBoolean = "true" | "false"

export type JellyfinSession = {
    token: string,
    server: string,
    userId: string,
    deviceId: string,
    name: string
}
export type Settings = {
    "images.hero"?: fakeBoolean,
    "images.blur"?: fakeBoolean,
}

export type Session = {
    active: JellyfinSession,
    stored: JellyfinSession[],
}