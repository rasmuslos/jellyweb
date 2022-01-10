import {session} from "$app/stores";
import {get} from "svelte/store";

export const wrap = (url: string): string => `${get(session).data.server}/${url}`

export const applyHeight = (url: string, height: number): string => `${url}&fillHeight=${height}`
export const applyWidth = (url: string, width: number): string => `${url}&fillWidth=${width}`

export const applyMaxHeight = (url: string, height: number): string => `${url}&maxHeight=${height}`
export const applyMaxWidth = (url: string, width: number): string => `${url}&maxWidth=${width}`