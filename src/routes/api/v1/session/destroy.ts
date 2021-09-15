export async function del({ locals }) {
    locals.session.destroy()

    return {
        body: {
            ok: locals.session.body,
        },
    }
}