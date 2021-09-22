import {
    bestRated,
    genres,
    getLatest,
    getRandomItem,
    getRecommendations,
    handleError,
    nextUp,
    resume
} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";
import {shuffleArray} from "$lib/helper";

export async function get({ locals }) {
   try {
       const session = locals.session.data.active
       const [resumeItems, nextUpItems, genreItems, randomItem, bestRatedItems, recommendations, latest] =
           await Promise.all([resume(session), nextUp(session), genres(session), getRandomItem(session), bestRated(session), getRecommendations(session), getLatest(session)])

       const recommended = []
       recommendations.forEach(recommendation => recommended.push(...recommendation.Items))

       return createApiResponse(true, {
           resume: resumeItems.Items,
           nextUp: nextUpItems.Items,
           genres: genreItems.Items,
           random: randomItem.Items.length > 0 ? randomItem.Items[0] : null,
           bestRated: bestRatedItems.Items,
           recommendations: shuffleArray(recommended),
           latest,
       })
   } catch(error) {
        return handleError(error)
   }
}