export async function post({ locals, body }) {
    locals.session.data = body.token

    return {
        body: locals.session.data,
    }
}