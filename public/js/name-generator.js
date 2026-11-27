import { foldText } from './lib/search.js';

const ENDPOINT = '/api/v1/locodes';
const SETTINGS_KEY = 'meshcore.nameGenerator.settings';
const MAX_RESULTS = 30;
// Advert mieści 32 bajty: 1 na flagi i opcjonalnie 8 na współrzędne
const MAX_BYTES_WITH_LOCATION = 23;
const MAX_BYTES = 31;
// Znaki odrzucane przez `set name` w CommonCLI firmware repeatera
const FORBIDDEN_RE = /[[\]\\:,?*]/g;

const byId = id => document.getElementById(id);
const form = byId('ng-form');
const voivodeshipSelect = byId('ng-voivodeship');
const searchInput = byId('ng-search');
const codeInput = byId('ng-code');
const suffixInput = byId('ng-suffix');
const directionSelect = byId('ng-direction');
const solarInput = byId('ng-solar');
const results = byId('ng-results');
const copyButton = byId('ng-copy');
const encoder = new TextEncoder();

const voivodeshipNames = new Map([...voivodeshipSelect.options].filter(option => option.value).map(option => [option.value, option.text]));

let entries = [];
let highlighterPromise = null;

const setCommand = command => {
	const container = byId('ng-command');
	byId('ng-cli').hidden = !command;
	if (container.dataset.command === command) return;

	const code = document.createElement('code');
	code.className = 'language-mccli';
	code.textContent = command;
	const pre = document.createElement('pre');
	pre.append(code);
	container.replaceChildren(pre);
	container.dataset.command = command;
	if (!command) return;

	highlighterPromise ??= import(`${document.body.dataset.cdn}/js/codeBlocks.js`);
	highlighterPromise
		.then(({ highlightCodeBlocks }) => highlightCodeBlocks(container))
		.catch(err => console.error('Nie udało się załadować codeBlocks.js z CDN:', err));
};

const getVoivodeshipName = ({ voivodeship }) => (voivodeship ? voivodeshipNames.get(voivodeship) : 'województwo nieustalone');

const selectCode = code => {
	const entry = entries.find(item => item.code === code);
	codeInput.dataset.code = entry?.code ?? '';
	codeInput.value = entry ? `${entry.name} - ${entry.code} (${getVoivodeshipName(entry)})` : '';
};

const findMatches = () => {
	const voivodeship = voivodeshipSelect.value;
	const query = foldText(searchInput.value.trim());
	const pool = voivodeship ? entries.filter(entry => entry.voivodeship === voivodeship) : entries;
	if (!query) return pool;

	const rank = ({ foldedName, foldedCode }) => {
		if (foldedCode === query) return 0;
		if (foldedName === query) return 1;
		if (foldedName.startsWith(query)) return 2;
		if (foldedName.includes(query)) return 3;
		return foldedCode.startsWith(query) ? 4 : null;
	};

	return pool.map(entry => ({ entry, score: rank(entry) }))
		.filter(({ score }) => score !== null)
		.sort((a, b) => a.score - b.score)
		.map(({ entry }) => entry);
};

const createResult = entry => {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = 'ng-result';
	button.dataset.code = entry.code;
	button.setAttribute('aria-pressed', String(entry.code === codeInput.dataset.code));

	const code = document.createElement('code');
	code.textContent = entry.code;
	const label = document.createElement('span');
	label.textContent = entry.name;
	button.append(code, label);

	const item = document.createElement('li');
	item.append(button);
	return item;
};

const renderResults = () => {
	if (!entries.length) return;

	const matches = findMatches();
	results.replaceChildren(...matches.slice(0, MAX_RESULTS).map(createResult));
	results.hidden = !matches.length;
	byId('ng-no-results').hidden = matches.length > 0;
};

const renderOutput = () => {
	const code = codeInput.dataset.code ?? '';
	const suffix = suffixInput.value.trim().replace(/\s+/g, ' ');
	const name = code && suffix ? [code, suffix, directionSelect.value, solarInput.checked && 'SOL'].filter(Boolean).join(' ') : '';
	const forbidden = [...new Set(name.match(FORBIDDEN_RE))];
	const bytes = encoder.encode(name).length;
	const valid = Boolean(name) && !forbidden.length && bytes <= MAX_BYTES;

	results.querySelectorAll('.ng-result').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.code === code)));

	const empty = byId('ng-empty');
	empty.textContent = code ? 'Wpisz wyróżnik lub znak wywoławczy.' : 'Wybierz miejscowość, aby zacząć.';
	empty.hidden = Boolean(name);
	byId('ng-result').hidden = !name;
	byId('ng-name').textContent = name;
	setCommand(valid ? `set name ${name}` : '');
	byId('ng-bytes').textContent = `Długość w bajtach: ${bytes}. Limit to ${MAX_BYTES_WITH_LOCATION} z lokalizacją w advercie i ${MAX_BYTES} bez niej. Polskie znaki zajmują po 2 bajty.`;

	const problems = [];
	if (forbidden.length) problems.push(`Usuń niedozwolone znaki: ${forbidden.join(' ')}`);
	if (bytes > MAX_BYTES) problems.push('Nazwa jest za długa i zostanie ucięta. Skróć wyróżnik.');
	else if (bytes > MAX_BYTES_WITH_LOCATION) problems.push('Jeśli repeater rozgłasza lokalizację, końcówka nazwy zostanie ucięta!');
	const problem = byId('ng-problem');
	problem.textContent = problems.join(' ');
	problem.hidden = !problems.length;

	copyButton.disabled = !valid;
};

const getString = value => (typeof value === 'string' ? value : '');

const loadSettings = () => {
	try {
		const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
		if (!settings || typeof settings !== 'object') return {};

		return {
			voivodeship: voivodeshipNames.has(settings.voivodeship) ? settings.voivodeship : '',
			search: getString(settings.search),
			code: getString(settings.code),
			suffix: getString(settings.suffix).slice(0, suffixInput.maxLength),
			direction: [...directionSelect.options].some(option => option.value === settings.direction) ? settings.direction : '',
			solar: settings.solar === true,
		};
	} catch (err) {
		console.warn('Nie udało się odczytać ustawień:', err);
		return {};
	}
};

const saveSettings = () => {
	if (!entries.length) return;

	try {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify({
			voivodeship: voivodeshipSelect.value,
			search: searchInput.value,
			code: codeInput.dataset.code,
			suffix: suffixInput.value,
			direction: directionSelect.value,
			solar: solarInput.checked,
		}));
	} catch (err) {
		console.warn('Nie udało się zapisać ustawień:', err);
	}
};

const restoreForm = () => {
	const params = new URLSearchParams(location.search);
	const voivodeship = voivodeshipNames.has(params.get('wojewodztwo')) ? params.get('wojewodztwo') : null;
	const requested = entries.find(entry => entry.code === params.get('kod'));
	const settings = loadSettings();
	const sameVoivodeship = voivodeship === null || voivodeship === settings.voivodeship;
	const code = requested?.code ?? (sameVoivodeship ? settings.code ?? '' : '');

	voivodeshipSelect.value = voivodeship ?? settings.voivodeship ?? '';
	searchInput.value = requested?.code ?? (sameVoivodeship ? settings.search ?? '' : '');
	selectCode(code);
	suffixInput.value = code === (settings.code ?? '') ? settings.suffix ?? '' : '';
	directionSelect.value = settings.direction ?? '';
	solarInput.checked = settings.solar ?? false;
	if (requested) saveSettings();
};

const handleChange = () => {
	if (location.search) history.replaceState(history.state, '', location.pathname + location.hash);
	saveSettings();
};

const copyName = async () => {
	try {
		await navigator.clipboard.writeText(byId('ng-name').textContent);
		copyButton.textContent = 'Skopiowano';
	} catch (err) {
		console.error('Nie udało się skopiować nazwy:', err);
		copyButton.textContent = 'Nie udało się skopiować';
	}
	setTimeout(() => copyButton.textContent = 'Kopiuj nazwę', 2000);
};

const loadEntries = async () => {
	try {
		const response = await fetch(ENDPOINT);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const { data } = await response.json();
		entries = data.map(entry => ({ ...entry, foldedName: foldText(entry.name), foldedCode: foldText(entry.code) }));
	} catch (err) {
		console.error('Nie udało się pobrać listy miejscowości:', err);
		byId('ng-load-error').hidden = false;
		byId('ng-picker').hidden = true;
	}
};

const init = async () => {
	form.addEventListener('submit', event => event.preventDefault());
	await loadEntries();
	restoreForm();

	[voivodeshipSelect, searchInput].forEach(field => field.addEventListener('input', () => {
		renderResults();
		handleChange();
	}));
	[suffixInput, directionSelect, solarInput].forEach(field => field.addEventListener('input', () => {
		renderOutput();
		handleChange();
	}));
	results.addEventListener('click', event => {
		const button = event.target.closest('.ng-result');
		if (!button) return;
		selectCode(button.dataset.code);
		renderOutput();
		handleChange();
	});
	copyButton.addEventListener('click', copyName);

	renderResults();
	renderOutput();
};

if (form) init();
