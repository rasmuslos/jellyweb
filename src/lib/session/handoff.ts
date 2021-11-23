import {randomBytes} from "crypto"

type Handoff = {
    start: number,

    name?: string,
    userId?: string,
    server?: string,

    session?: string,
}
let ongoing: {
    [x: string]: Handoff
} = {}

const isHandoffValid = (handoff: Handoff) => {
    console.log(handoff.start, new Date().getTime())

    return true
}

export const createSecret = async () => randomBytes(32).toString("hex")
export const createHandoff = async () => {
    let secret = await createSecret()
    while(ongoing[secret] != null) secret = await createSecret()

    const hash = await createSecret()

    ongoing[hash] = {
        start: new Date().getTime()
    }

    return {
        hash,
    }
}
export const updateHandoff = (hash: string, name: string, userId: string, server: string) => {
    const handoff = ongoing[hash]
    if(!isHandoffValid(handoff)) throw new Error("handoff has expired")

    ongoing[hash] = {
        ...handoff,

        name,
        userId,
        server,
    }
}