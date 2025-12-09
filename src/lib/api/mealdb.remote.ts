import { form } from '$app/server';
import * as R from 'rambda';
import * as v from 'valibot';

const searchSchema = v.object({
	searchType: v.picklist(['name', 'ingredient']),
	searchTerm: v.pipe(v.string(), v.length(1))
});

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
//
const endpointBuilders: Record<string, (term: string) => string> = {
	name: (term) => `${BASE_URL}/search.php?s=${encodeURIComponent(term)}`,
	ingredient: (term) => `${BASE_URL}/filter.php?i=${encodeURIComponent(term)}`
};

const buildEndpoint = (searchType: string, searchTerm: string): string =>
	endpointBuilders[searchType](searchTerm);

const extractMeals = R.pipe(R.prop('meals'), R.defaultTo([]));

// Fetch and parse JSON
const fetchJson = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) throw new Error('Failed to fetch meals');
	return response.json();
};

export const getSearchResults = form(searchSchema, async (data) => {
	const endpoint = buildEndpoint(data.searchType, data.searchTerm);
	const result = await fetchJson(endpoint);
	return extractMeals(result);
});
