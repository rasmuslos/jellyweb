export async function del({ locals }) {
    locals.session.data.active = null

    return {
        body: {
            ok: locals.session.data.active,
        },
    }
}