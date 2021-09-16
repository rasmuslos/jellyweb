import {handleError, resume} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
   try {
       const items = await resume(locals.session.data.active)
       return createApiResponse(true, items)
   } catch(error) {
        return handleError(error)
   }
}