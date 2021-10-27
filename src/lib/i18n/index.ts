import { derived } from "svelte/store";
import * as translations from "./lang";
import {fallbackLocale, locale} from "$lib/helper";

export const locales = Object.keys(translations);

function translate(locale, key, vars) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  let text = translations[locale][key] || translations[fallbackLocale][key];

  if(!text) {
    text = key
    console.error(`no translation found for ${locale}.${key}`)
  }

  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);
