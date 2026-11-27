import { foldText } from './lib/search.js';

const ENDPOINT = '/api/v1/locodes';
const SETTINGS_KEY = 'meshcore.nameGenerator.settings';
const MAX_RESULTS = 30;
// Advert mieści 32 bajty: 1 na flagi i opcjonalnie 8 na współrzędne
const MAX_BYTES_WITH_LOCATION = 23;
const MAX_BYTES = 31;
// owner_info[120] w CommonCLI, ostatni bajt to terminator
const MAX_INFO_BYTES = 119;
// Znaki odrzucane przez `set name` w CommonCLI firmware repeatera
const FORBIDDEN_RE = /[[\]\\:,?*]/g;
const EMOJI_RE = /[\p{Extended_Pictographic}\p{Regional_Indicator}]/u;
const REDUNDANT_RE = /(?<![\p{L}\p{N}])(?:repeater|rpt)(?![\p{L}\p{N}])/iu;

const byId = id => document.getElementById(id);
const form = byId('ng-form');
const voivodeshipSelect = byId('ng-voivodeship');
const searchInput = byId('ng-search');
const suffixInput = byId('ng-suffix');
const directionSelect = byId('ng-direction');
const solarInput = byId('ng-solar');
const results = byId('ng-results');
const copyButton = byId('ng-copy');
const customInput = byId('ng-custom');
const customField = byId('ng-custom-field');
const infoInputs = ['owner', 'contact', 'details'].map(key => [key, byId(`ng-${key}`)]);
const encoder = new TextEncoder();

const voivodeshipNames = new Map([...voivodeshipSelect.options].filter(option => option.value).map(option => [option.value, option.text]));

let entries = [];
let selectedCode = '';
let highlighterPromise = null;

const setCommand = (containerId, command) => {
	const container = byId(containerId);
	container.parentElement.hidden = !command;
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

const setText = (element, text) => {
	if (element.textContent !== text) element.textContent = text;
};

const selectCode = code => {
	const entry = entries.find(item => item.code === code);
	selectedCode = entry?.code ?? '';
};

const describeSelection = custom => {
	const entry = entries.find(item => item.code === selectedCode);
	if (entry) return `Miejscowość: ${entry.name} - ${entry.code} (${getVoivodeshipName(entry)})`;
	return custom ? `Skrót miejscowości: ${custom}` : 'Nie wybrano miejscowości.';
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
	button.className = 'panel ng-result';
	button.dataset.code = entry.code;
	button.setAttribute('aria-pressed', String(entry.code === selectedCode));

	const code = document.createElement('code');
	code.textContent = entry.code;
	const label = document.createElement('span');
	label.textContent = entry.name;
	button.append(code, label);

	const item = document.createElement('li');
	item.append(button);
	return item;
};

const describeResults = count => {
	if (!count) return 'Brak pasujących miejscowości. Jeśli Twojej nie ma w wykazie, wpisz skrót jej nazwy, który każdy zrozumie.';
	return count > MAX_RESULTS ? `Wyświetlono ${MAX_RESULTS} z ${count} wyników. Zawęź wyszukiwanie, aby zobaczyć pozostałe.` : '';
};

const renderResults = () => {
	if (!entries.length) return;

	const matches = findMatches();
	results.replaceChildren(...matches.slice(0, MAX_RESULTS).map(createResult));
	results.hidden = !matches.length;

	setText(byId('ng-results-hint'), describeResults(matches.length));
	customField.hidden = Boolean(matches.length);
};

const normalizeSpaces = value => value.trim().replace(/\s+/g, ' ');

const renderProblems = (problems, valid) => {
	const type = valid ? 'warning' : 'caution';
	const alert = byId('ng-problem');
	alert.className = `docs-alert docs-alert--${type}`;
	alert.hidden = !problems.length;
	byId('ng-problem-icon').setAttribute('href', `/icons.svg#alert-${type}`);

	const list = byId('ng-problem-list');
	const key = problems.join('\n');
	if (list.dataset.key === key) return;
	list.dataset.key = key;
	list.replaceChildren(...problems.map(text => {
		const paragraph = document.createElement('p');
		paragraph.textContent = text;
		return paragraph;
	}));
};

const renderOutput = () => {
	const custom = customField.hidden ? '' : normalizeSpaces(customInput.value);
	const prefix = selectedCode || custom;
	const suffix = normalizeSpaces(suffixInput.value);
	const name = prefix && suffix ? [prefix, suffix, directionSelect.value, solarInput.checked && 'SOL'].filter(Boolean).join(' ') : '';
	const forbidden = [...new Set(name.match(FORBIDDEN_RE))];
	const bytes = encoder.encode(name).length;
	const valid = Boolean(name) && !forbidden.length && bytes <= MAX_BYTES;

	results.querySelectorAll('.ng-result').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.code === selectedCode)));

	setText(byId('ng-selected'), describeSelection(custom));
	const empty = byId('ng-empty');
	empty.textContent = prefix ? 'Wpisz wyróżnik lub znak wywoławczy.' : 'Wybierz miejscowość, aby zacząć.';
	empty.hidden = Boolean(name);
	byId('ng-result').hidden = !name;
	byId('ng-name').textContent = name;
	setCommand('ng-command', valid ? `set name ${name}` : '');
	const counter = byId('ng-bytes');
	counter.textContent = `Długość: ${bytes} B (limit: ${MAX_BYTES_WITH_LOCATION} B z lokalizacją w advercie, ${MAX_BYTES} B bez niej)`;
	counter.hidden = bytes > MAX_BYTES_WITH_LOCATION;

	const problems = [];
	if (forbidden.length) problems.push(`Usuń niedozwolone znaki: ${forbidden.join(' ')}`);
	if (EMOJI_RE.test(name)) problems.push('Nie zalecamy używania emoji w nazwach repeaterów, ponieważ niektóre urządzenia z wbudowanym ekranem mogą je wyświetlać niepoprawnie. Używaj ich wyłącznie w nazwie swojego companiona.');
	if (REDUNDANT_RE.test(name)) problems.push('Dopiski „Repeater” i „RPT” są zbędne, możesz je pominąć.');
	if (bytes > MAX_BYTES) problems.push(`Nazwa ma ${bytes} B i zostanie ucięta. Skróć ją.`);
	else if (bytes > MAX_BYTES_WITH_LOCATION) problems.push(`Nazwa ma ${bytes} B. Jeśli repeater rozgłasza lokalizację, końcówka nazwy zostanie ucięta!`);
	renderProblems(problems, valid);

	copyButton.disabled = !valid;
};

const renderInfo = () => {
	const info = infoInputs.map(([, input]) => normalizeSpaces(input.value)).filter(Boolean).join('|');
	const bytes = encoder.encode(info).length;
	const excess = bytes - MAX_INFO_BYTES;

	byId('ng-info-result').hidden = !info;
	byId('ng-info').textContent = info.replaceAll('|', '\n');
	const counter = byId('ng-info-bytes');
	setText(counter, `Długość: ${bytes}/${MAX_INFO_BYTES} B${excess > 0 ? `. Opis jest za długi, skróć go o ${excess} B.` : ''}`);
	counter.classList.toggle('ng-over-limit', excess > 0);
	setCommand('ng-info-command', info && excess <= 0 ? `set owner.info ${info}` : '');
};

const getString = value => (typeof value === 'string' ? value : '');

const DEFAULT_SETTINGS = Object.freeze({ voivodeship: '', search: '', code: '', custom: '', suffix: '', direction: '', solar: false, contact: '', owner: '', details: '' });

const loadSettings = () => {
	try {
		const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
		if (!settings || typeof settings !== 'object') return DEFAULT_SETTINGS;

		return {
			voivodeship: voivodeshipNames.has(settings.voivodeship) ? settings.voivodeship : '',
			search: getString(settings.search),
			code: getString(settings.code),
			custom: getString(settings.custom).slice(0, customInput.maxLength),
			suffix: getString(settings.suffix).slice(0, suffixInput.maxLength),
			direction: [...directionSelect.options].some(option => option.value === settings.direction) ? settings.direction : '',
			solar: settings.solar === true,
			...Object.fromEntries(infoInputs.map(([key, input]) => [key, getString(settings[key]).slice(0, input.maxLength)])),
		};
	} catch (err) {
		console.warn('Nie udało się odczytać ustawień:', err);
		return DEFAULT_SETTINGS;
	}
};

const saveSettings = () => {
	const code = entries.length ? selectedCode : loadSettings().code;

	try {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify({
			voivodeship: voivodeshipSelect.value,
			search: searchInput.value,
			code,
			custom: customInput.value,
			suffix: suffixInput.value,
			direction: directionSelect.value,
			solar: solarInput.checked,
			...Object.fromEntries(infoInputs.map(([key, input]) => [key, input.value])),
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
	const saved = sameVoivodeship ? settings : DEFAULT_SETTINGS;
	const code = requested?.code ?? saved.code;

	voivodeshipSelect.value = voivodeship ?? settings.voivodeship;
	searchInput.value = requested?.code ?? saved.search;
	selectCode(code);
	customInput.value = requested ? '' : saved.custom;
	suffixInput.value = code === settings.code ? settings.suffix : '';
	directionSelect.value = settings.direction;
	solarInput.checked = settings.solar;
	infoInputs.forEach(([key, input]) => {
		input.value = settings[key];
	});
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
	setTimeout(() => {
		copyButton.textContent = 'Kopiuj nazwę';
	}, 2000);
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
		renderOutput();
		handleChange();
	}));
	[suffixInput, directionSelect, solarInput].forEach(field => field.addEventListener('input', () => {
		renderOutput();
		handleChange();
	}));
	infoInputs.forEach(([, input]) => input.addEventListener('input', () => {
		renderInfo();
		handleChange();
	}));
	customInput.addEventListener('input', () => {
		if (customInput.value.trim()) selectCode('');
		renderOutput();
		handleChange();
	});
	results.addEventListener('click', event => {
		const button = event.target.closest('.ng-result');
		if (!button) return;
		selectCode(button.dataset.code === selectedCode ? '' : button.dataset.code);
		if (selectedCode) customInput.value = '';
		renderOutput();
		handleChange();
	});
	copyButton.addEventListener('click', copyName);

	renderResults();
	renderOutput();
	renderInfo();
};

if (form) init();
