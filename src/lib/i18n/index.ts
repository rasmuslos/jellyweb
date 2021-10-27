/** 
 * To-do: 
 * 
 * Remember language cookie or user based (Jelly api supports user preferred language)
 * Split language files in multiple files (with better formatting?)
 * Nice language flag selector in top menu or possibly user settings
 * Create fallback if language key is not available
 * 
 */
import { derived, writable } from "svelte/store";
import translations from "./lang";

export const locale = writable("en");
export const locales = Object.keys(translations);

function translate(locale, key, vars) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  let text = translations[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);
