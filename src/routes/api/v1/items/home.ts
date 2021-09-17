import {handleError, nextUp, resume} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
   try {
       const session = locals.session.data.active

       const resumeItems = await resume(session)
       const nextUpItems = await nextUp(session)

       return createApiResponse(true, {
           resume: resumeItems,
           nextUp: nextUpItems,
       })
   } catch(error) {
        return handleError(error)
   }
}