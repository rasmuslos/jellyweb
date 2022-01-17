import type {Item} from "$lib/typings";

export const getRandomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length)
export const getPlayedPercentage = (item: Item): number => (item.userData?.position / item.runtime) * 100