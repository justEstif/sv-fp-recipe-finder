import { form } from '$app/server';
import * as R from 'remeda';
import * as v from 'valibot';
import type { Meal } from '$lib/types/mealdb';

const searchSchema = v.object({
	searchType: v.picklist(['name', 'ingredient']),
	searchTerm: v.pipe(v.string(), v.minLength(1))
});

export type SearchInput = v.InferOutput<typeof searchSchema>;

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const endpointBuilders: Record<'name' | 'ingredient', (term: string) => string> = {
	name: (term) => `${BASE_URL}/search.php?s=${encodeURIComponent(term)}`,
	ingredient: (term) => `${BASE_URL}/filter.php?i=${encodeURIComponent(term)}`
};

type MealResponse = { meals: Meal[] | null };

const extractMeals = (data: MealResponse): Meal[] =>
	R.pipe(data, R.prop('meals'), R.defaultTo([] as Meal[]));

// need to fix the type when filtering between meal and ingredient
// Fetch and parse JSON
const fetchJson = async <T>(url: string): Promise<T> => {
	const response = await fetch(url);
	if (!response.ok) throw new Error('Failed to fetch meals');
	return response.json() as Promise<T>;
};

export const getSearchResults = form(searchSchema, async (data) => {
	const endpoint = endpointBuilders[data.searchType](data.searchTerm);
	const result = await fetchJson<MealResponse>(endpoint);
	const meals = extractMeals(result);
	return meals;
});
