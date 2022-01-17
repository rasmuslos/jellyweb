import type {Item, Recommendation} from ".";

export type PageIndex = {
    featured: Item[],
    suggestions: Item[],
    recommendations: Recommendation[],
    latest: Item[],
    random: Item[],
    genres: Item[],
    bestRated: Item[],
}