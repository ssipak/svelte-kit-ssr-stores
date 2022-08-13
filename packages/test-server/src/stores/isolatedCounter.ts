import { writable } from "svelte/store";
import { defineSessionable } from "svelte-kit-ssr-stores";

export const isolatedCounter = defineSessionable({}, () => writable(0));
