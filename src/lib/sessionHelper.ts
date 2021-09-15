const length = 31

export const parseSession = (session: object) => {
    if(session[0] == null) return null

    let token = ""
    for(let i = 0; i < length; i++) token += session[i]

    return token
}