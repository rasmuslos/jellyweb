import type { Settings } from "$lib/typings";
import { writable } from "svelte/store";

export const settings = writable<Settings>(null)