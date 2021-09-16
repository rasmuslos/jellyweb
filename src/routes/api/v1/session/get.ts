export async function get({ locals }) {
    return {
        body: locals.session.data
    }
}