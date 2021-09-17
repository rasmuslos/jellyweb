import {handleError, nextUp, resume} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
   try {
       const session = locals.session.data.active
       const [resumeItems, nextUpItems] = await Promise.all([resume(session), nextUp(session)])

       return createApiResponse(true, {
           resume: resumeItems,
           nextUp: nextUpItems,
       })
   } catch(error) {
        return handleError(error)
   }
}