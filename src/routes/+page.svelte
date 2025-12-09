<script lang="ts">
	let name = $state('');

	let ingredient = $state('filter.php?i={ingredient}');
	// let id = $state('lookup.php?i={id}')
	// const name = 'search.php?s={name} - search by meal name';
	// const filter = 'filter.php?i={ingredient} - filter by ingredient';
	// const lookup = 'lookup.php?i={id} - get full meal details';
	// const categories = 'categories.php - list all categories';
	// const list = 'list.php?a=list - list all areas/cuisines';
</script>

<main class="container mx-auto px-4 py-6">
	<article class="prose lg:prose-xl">
		<h1>The Meal DB</h1>

		<form class="table border-spacing-4">
			<div class="table-row">
				<label for="search" class="table-cell">Search Term </label>
				<input id="search" class="table-cell" type="text" />
			</div>
			<div class="table-row mb-3">
				<label for="type" class="table-cell">Search Term Type </label>
				<select id="type">
					<option value="name">Name</option>
					<option value="filter">Filter</option>
					<option value="lookup">Lookup</option>
					<option value="categories">Categories</option>
					<option value="list">List</option>
				</select>
			</div>

			<button type="submit" class="px-4 py-2 bg-blue-700 text-white">Search</button>
		</form>
	</article>
</main>
