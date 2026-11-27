import { foldText } from './lib/search.js';

const input = document.getElementById('locodes-filter');

if (input) {
	const rows = [...document.querySelectorAll('#locodes-rows tr')].map(row => ({ row, text: foldText(row.textContent) }));
	const empty = document.getElementById('locodes-empty');

	const filter = () => {
		const query = foldText(input.value.trim());
		let visible = 0;
		rows.forEach(({ row, text }) => {
			row.hidden = !text.includes(query);
			if (!row.hidden) visible++;
		});
		empty.hidden = visible > 0;
	};

	input.addEventListener('input', filter);
	input.parentElement.hidden = false;
	filter();
}
