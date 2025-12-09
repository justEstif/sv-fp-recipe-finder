// api builder
// URL builder (like the Flickr example)
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
const endpoint = (path: string) => `${baseUrl}${path}`;

export const searchByName = (name: string) => endpoint(`search.php?s=${name}`);
export const filterByIngredient = (ing: string) => endpoint(`filter.php?i=${ing}`);
