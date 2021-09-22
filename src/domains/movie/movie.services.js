import { fetchJson } from 'lib/fetch-json';
import { BASE_URL } from 'const';

export const getMovies = (page, signal) => fetchJson(`${BASE_URL}/movie?page=${page}`, {signal});