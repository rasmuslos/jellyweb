import type {RequestOptions, Response} from "$lib/typings";

/**
 * This is cool but also useless
 */
class Request<T> {
    url: string
    options: RequestOptions
    response: Response<T> | any

    success: boolean
    requester: any

    constructor(url: string, options: RequestOptions) {
        this.options = Object.assign({
            method: "GET",
            body: null,
            encodeBody: true,
            parseResponse: true,
            version: 3,
        } as RequestOptions, options)
        this.url = `/api/v${options.version}/${url}`
        this.requester = fetch
        this.success = false

        if(this.options.method !== "GET" && this.options.body == null) this.options.body = {}
        if(this.options.body != null && this.options.encodeBody) this.options.body = JSON.stringify(this.options.body)
    }

    set fetch(requester: any) {
        this.requester = requester
    }

    get ok() {
        return this.success
    }
    get error(): Response<string | Error> {
        return this.response.payload
    }
    get data(): T {
        return this.response.payload
    }

    async execute(): Promise<void> {
        const {
            method,
            body,
            parseResponse,
        } = this.options

        try {
            const response = await fetch(this.url, {
                method,
                body,
            })

            if(parseResponse) {
                const data = response.json() as unknown as Response<T>
                if(data.status == 200) this.success = true
            }
        } catch (error) {
            console.error("Error while performing request", {
                error,
                url: this.url,
                options: this.options,
            })

            if(parseResponse) this.response = {
                status: 500,
                payload: error,
            }
        }
    }
}