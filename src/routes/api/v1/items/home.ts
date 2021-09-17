import {genres, handleError, nextUp, resume} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
   try {
       const session = locals.session.data.active
       const [resumeItems, nextUpItems, genreItems] = await Promise.all([resume(session), nextUp(session), genres(session)])

       return createApiResponse(true, {
           resume: resumeItems,
           nextUp: nextUpItems,
           genres: genreItems,
       })
   } catch(error) {
        return handleError(error)
   }
}