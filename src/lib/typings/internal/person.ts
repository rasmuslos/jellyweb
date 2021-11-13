import type {ItemImages} from "$lib/typings/internal/item";

export type Person = {
    name: string,
    id: string,
    role: string,
    images: ItemImages,
    overview?: string,
}