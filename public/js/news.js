const searchFields = [...document.querySelectorAll('.news-search')].map(wrapper => ({
	wrapper,
	input: wrapper.querySelector('.news-search__input'),
	status: wrapper.querySelector('.news-search__status'),
}));
const list = document.getElementById('news-list');

if (searchFields.length && list) {
	const cards = [...list.querySelectorAll('.news-post-card')].map(element => ({ element, text: element.dataset.search || '' }));
	const empty = document.getElementById('news-search__empty');

	const filterPosts = source => {
		const value = source.input.value;
		const query = value.trim().toLowerCase();
		let visible = 0;

		for (const { element, text } of cards) {
			const match = !query || text.includes(query);
			element.hidden = !match;
			if (match) visible++;
		}

		const noResults = query.length > 0 && visible === 0;
		if (empty) empty.hidden = !noResults;
		const message = !query ? '' : noResults ? 'Brak wyników dla podanej frazy.' : `Wyświetlono wyników: ${visible}.`;

		for (const field of searchFields) {
			if (field !== source) field.input.value = value;
			field.wrapper.classList.toggle('has-value', query.length > 0);
			if (field.status) field.status.textContent = field === source ? message : '';
		}
	};

	for (const field of searchFields) {
		field.input.addEventListener('input', () => filterPosts(field));
	}
}
