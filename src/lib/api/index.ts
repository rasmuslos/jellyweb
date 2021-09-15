export const createRequest = async (endpoint: string) => {
    const res = await fetch(endpoint)

    if(!res.ok) throw new Error(`Error while fetching api data. Status: ${res.status}\n${await res.text()}`)

    return await res.json()
}