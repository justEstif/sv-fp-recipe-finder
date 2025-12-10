<script lang="ts">
	import { getSearchResults } from '$lib/api/mealdb.remote';
</script>

<main class="container mx-auto px-4 py-6">
	<article class="prose lg:prose-xl">
		<h1>The Meal DB</h1>

		<form {...getSearchResults} class="table border-spacing-4">
			<div class="table-row">
				<label for="search" class="table-cell">Search Term </label>
				<input {...getSearchResults.fields.searchTerm.as('text')} id="search" class="table-cell" />
			</div>
			<div class="table-row mb-3">
				<label for="type" class="table-cell">Search Type </label>
				<select {...getSearchResults.fields.searchType.as('select')} id="type">
					<option value="name">Name</option>
					<option value="ingredient">Ingredient</option>
				</select>
			</div>

			<button type="submit" class="px-4 py-2 bg-blue-700 text-white">Search</button>
		</form>

		{#if getSearchResults.result}
			<h2>Results</h2>
			<ul>
				{#each getSearchResults.result as meal(meal.idMeal)}
					<li class="flex items-center gap-4 my-2">
						<img src={meal.strMealThumb} alt={meal.strMeal} class="w-16 h-16 rounded" />
						<span>{meal.strMeal}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</article>
</main>
