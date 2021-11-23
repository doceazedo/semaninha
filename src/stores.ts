import { writable } from 'svelte/store';
import { Ratio } from './enums';

export const username = writable('');
export const validUsername = writable(null);
export const period = writable('7day');
export const ratio = writable(Ratio.Square);
export const theme = writable('');
export const step = writable('form');
export const blobURL = writable('');