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
import {createApiError, createApiResponse} from "$lib/apiHelper";
import {shuffleArray} from "$lib/helper";

export async function get({ locals }) {
   try {
       const session = locals.session.data.active
       const [resumeItems, nextUpItems, genreItems, randomItem, bestRatedItems, recommendations, latest] =
           await Promise.all([resume(session), nextUp(session), genres(session), getRandomItem(session), bestRated(session), getRecommendations(session), getLatest(session)])

       const recommended = []
       recommendations.forEach(recommendation => {
           recommendation.Items.forEach(item => {
               if(!item.UserData || (item.UserData && (item.UserData.Played == false || item.UserData.PlayedPercentage == 100))) recommended.push(item)
           })
       })

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