const RG_ENDPOINT = '/api/v1/regions';
const RG_NODES_ENDPOINT = '/api/v1/nodes';
const RG_MAX_NAME_BYTES = 29;
const RG_MAX_LINE = 160;
// Firmware tnie wynik `region` po 159 bajtach, próg ma zapas na wcięcia zgubione przy kopiowaniu
const RG_TRUNCATION_BYTES = 140;
const RG_MAX_NEIGHBORS = 2;
const RG_CLI_REPLIES = new Set(['OK', 'Err']);
const RG_SETTINGS_KEY = 'meshcore.regionGenerator.settings';
const RG_CUSTOM_SCOPE = '__custom__';
const RG_PUBLIC_SECRET = '8b3387e9c5cdea6ac9e5edbaa115cd72';
const RG_EXPORT_FILENAME = 'meshcore-polska.json';
const RG_RADIO_SETTINGS = { frequency: 869618, bandwidth: 62500, spreading_factor: 8, coding_rate: 8 };

let highlighterPromise = null;
let regionData, rootScope;
let exportChannels = [];
const channelSelections = new Map();

const fetchData = async url => {
	const response = await fetch(url).catch(err => {
		throw new Error(`Brak odpowiedzi serwera (${err.message})`, { cause: err });
	});
	const status = `HTTP ${response.status} ${response.statusText}`.trim();
	const body = await response.json().catch(() => null);

	if (!response.ok) throw new Error(body?.message ? `${status}: ${body.message}` : status);
	if (!body?.data) throw new Error(`${status}: nieprawidłowy format danych`);

	return body.data;
};

const loadRegions = async () => {
	const data = await fetchData(RG_ENDPOINT);
	if (!Array.isArray(data.voivodeships) || !Array.isArray(data.localRegions)) throw new Error('Nieprawidłowy format danych');

	const byCode = list => Object.fromEntries(list.map(region => [region.code, region]));
	regionData = { ...data, voivodeships: byCode(data.voivodeships), localRegions: byCode(data.localRegions) };
	rootScope = regionData.country.scope;
};

const highlightCode = root => {
	highlighterPromise ??= import(`${document.body.dataset.cdn}/js/codeBlocks.js`);
	highlighterPromise
		.then(({ highlightCodeBlocks }) => highlightCodeBlocks(root))
		.catch(err => console.error('Nie udało się załadować codeBlocks.js z CDN:', err));
};

const setCode = (id, text) => {
	const code = document.getElementById(id);
	if (code.textContent === text) return;

	code.textContent = text;
	delete code.dataset.hl;

	highlightCode(code.parentElement.parentElement);
};

const setCommands = lines => {
	const container = document.getElementById('rg-commands');
	const text = lines.join('\n');
	if (container.dataset.commands === text) return;

	container.replaceChildren(...lines.map(line => {
		const pre = document.createElement('pre');
		const code = document.createElement('code');
		code.className = 'language-mccli';
		code.textContent = line;
		pre.append(code);
		return pre;
	}));
	container.dataset.commands = text;
	highlightCode(container);
};

const rgForm = document.getElementById('rg-form'), rcForm = document.getElementById('rc-form');

const getScenarioInputs = () => [...document.querySelectorAll('input[name="rg-scenario"]')];
const getScenario = () => getScenarioInputs().find(input => input.checked).value;
const applyScenario = () => {
	const scenario = getScenario();
	document.querySelectorAll('[data-rg-scenario]').forEach(element => element.hidden = element.dataset.rgScenario !== scenario);
};

const parseCurrentRegions = text => {
	const lines = text.split(/\r?\n|\r/).filter(line => line.trim() && !line.trim().startsWith('>')).map(line => line.trimEnd());
	const truncated = new TextEncoder().encode(lines.join('\n')).length >= RG_TRUNCATION_BYTES && !(/\sF$/).test(lines.at(-1));
	const skipped = truncated ? lines.pop().trim() : null;
	const names = new Set();

	for (const line of lines) {
		const match = (/^([$#\p{L}\p{N}_-]+)\^?(?:\s+F)?$/u).exec(line.trim());
		if (!match || RG_CLI_REPLIES.has(match[1])) continue;

		names.add(match[1]);
	}

	return { names: [...names].reverse(), skipped };
};

const getVoivodeshipScope = code => regionData.voivodeships[code].scope;
const getRegionScopes = region => Array.isArray(region.scope) ? region.scope : [region.scope];
const getAutomaticRegions = codes => Object.values(regionData.localRegions).filter(region => region.automatic && codes.some(code => region.voivodeships.includes(code)));
const getLocalScopes = codes => [...new Set(getAutomaticRegions(codes).flatMap(getRegionScopes))];

const buildTree = (home, city, neighbors) => {
	const codes = [...new Set([home, ...neighbors])];
	const localScopes = getLocalScopes(codes);
	const configuredScopes = new Set([rootScope, ...codes.map(getVoivodeshipScope), ...localScopes]);
	const cityConfig = Object.values(regionData.localRegions).find(region => getRegionScopes(region).includes(city));
	const cityRegion = city && !configuredScopes.has(city) ? [{ name: city, children: [] }] : [];
	const cityAtRoot = cityConfig?.parentScope === rootScope;
	const homeRegion = { name: getVoivodeshipScope(home), children: cityAtRoot ? [] : cityRegion };
	return {
		name: rootScope,
		children: [
			homeRegion,
			...codes.slice(1).map(code => ({ name: getVoivodeshipScope(code), children: [] })),
			...localScopes.map(name => ({ name, children: [] })),
			...(cityAtRoot ? cityRegion : []),
		],
	};
};

const flattenTree = (node, parent = null, depth = 1, out = []) => {
	out.push({ name: node.name, parent, depth });
	node.children.forEach(child => flattenTree(child, node.name, depth + 1, out));
	return out;
};

const buildDefCommand = tree => {
	const tokens = [tree.name];
	tree.children.forEach((branch, i) => {
		const isLastBranch = i === tree.children.length - 1;
		const chain = [branch.name, ...branch.children.map(child => child.name)];
		chain.forEach((name, j) => tokens.push(j === chain.length - 1 && !isLastBranch ? `${name}|${tree.name}` : name));
	});
	return `region def ${tokens.join(' ')}`;
};

const buildCommands = ({ tree, firmware, setDefault }) => {
	const lines = [];
	const defLine = buildDefCommand(tree);

	if (firmware === '116' && defLine.length <= RG_MAX_LINE) {
		lines.push(defLine);
	} else {
		flattenTree(tree).forEach(({ name, parent }) => {
			lines.push(parent ? `region put ${name} ${parent}` : `region put ${name}`);
			if (firmware === 'old') lines.push(`region allowf ${name}`);
		});
	}

	lines.push('region save');
	if (setDefault) lines.push(`region default ${rootScope}`);
	lines.push('region');
	return lines;
};

const buildTreePreview = tree => ['*^ F', ...flattenTree(tree).map(({ name, depth }) => `${' '.repeat(depth)}${name} F`)].join('\n');

const channelsForScope = scope => [regionData.country, ...Object.values(regionData.voivodeships), ...Object.values(regionData.localRegions)]
	.filter(config => getRegionScopes(config).includes(scope))
	.flatMap(region => region.channels.map(channel => ({ channel, scope: region.scope })));

const buildChannels = (home, city, neighbors) => {
	const codes = [...new Set([home, ...neighbors])];
	const scopes = [...new Set([rootScope, ...codes.map(getVoivodeshipScope), ...getLocalScopes(codes), ...(city ? [city] : [])])];
	const channels = [...new Map(scopes.flatMap(channelsForScope).map(row => [JSON.stringify(row), row])).values()];
	const commonChannels = regionData.commonChannels.map(channel => {
		const alternatives = [...new Set(channels.filter(row => row.channel === channel).flatMap(row => row.scope))];
		return { channel, scope: alternatives.length ? alternatives : null };
	});

	const regionalChannels = channels.filter(({ channel }) => !regionData.commonChannels.includes(channel));
	return [
		{ channel: 'Public', scope: null },
		...commonChannels,
		...regionalChannels,
	];
};

const getChannelOptions = rows => {
	const channels = new Map();
	for (const { channel, scope } of rows) {
		const scopes = channels.get(channel) ?? new Set(regionData.commonChannels.includes(channel) || scope === null ? [''] : []);
		[scope ?? []].flat().forEach(value => scopes.add(value));
		channels.set(channel, scopes);
	}
	return [...channels].map(([name, scopes]) => ({ name, scopes: [...scopes] }));
};

const getChannelSelection = ({ name, scopes }) => {
	const saved = channelSelections.get(name);
	return { checked: saved?.checked ?? true, scope: scopes.includes(saved?.scope) ? saved.scope : scopes[0] };
};

const getSelectedNeighbors = () => [...document.querySelectorAll('#rg-neighbors input:checked')].map(input => input.value);

const updateExportButton = () => {
	const withContacts = document.getElementById('rg-export-contacts').checked;
	const nothingSelected = !withContacts && !document.getElementById('rg-export-radio').checked
		&& !exportChannels.some(channel => getChannelSelection(channel).checked);

	document.getElementById('rg-contacts-options').hidden = !withContacts;
	document.getElementById('rg-export').disabled = nothingSelected;
};

const bindNumberLimits = input => {
	input.addEventListener('beforeinput', event => {
		if (event.data && !(/^\d+$/).test(event.data)) event.preventDefault();
	});
	input.addEventListener('input', () => {
		if (input.value) input.value = Math.min(Math.max(Math.trunc(input.valueAsNumber), Number(input.min)), Number(input.max));
	});
	input.addEventListener('blur', () => input.value ||= input.defaultValue);
};

const createScopeControl = channel => {
	const { name, scopes } = channel;
	if (scopes.length === 1) {
		if (!scopes[0]) return 'Bez regionu';

		const code = document.createElement('code');
		code.textContent = scopes[0];
		return code;
	}

	const select = document.createElement('select');
	select.className = 'form-control rg-scope-select';
	select.setAttribute('aria-label', `Zakres regionu kanału ${name}`);
	select.append(...scopes.map(scope => new Option(scope || 'Bez regionu', scope)));
	select.value = getChannelSelection(channel).scope;
	select.addEventListener('change', () => channelSelections.set(name, { ...getChannelSelection(channel), scope: select.value }));
	return select;
};

const createChannelName = (channel, selectable) => {
	const wrapper = document.createElement(selectable ? 'label' : 'span');
	wrapper.className = 'rg-check';

	const text = document.createElement('code');
	text.textContent = channel.name;
	wrapper.append(text);
	if (!selectable) return wrapper;

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.checked = getChannelSelection(channel).checked;
	input.addEventListener('change', () => {
		channelSelections.set(channel.name, { ...getChannelSelection(channel), checked: input.checked });
		updateExportButton();
	});
	wrapper.prepend(input);
	return wrapper;
};

const renderChannelTable = () => {
	const selectable = !document.getElementById('rg-import').hidden;

	document.getElementById('rg-channels').replaceChildren(...exportChannels.map(channel => {
		const tr = document.createElement('tr');
		tr.append(...[createChannelName(channel, selectable), createScopeControl(channel), regionData.channelDescriptions[channel.name] || ''].map(content => {
			const td = document.createElement('td');
			td.append(content);
			return td;
		}));
		return tr;
	}));

	updateExportButton();
};

const renderChannels = rows => {
	exportChannels = getChannelOptions(rows);
	renderChannelTable();
};

// Aplikacja i firmware wyliczają klucze kanałów hashtagowych i regionów jako pierwsze 16 bajtów SHA-256 nazwy z "#"
const deriveKey = async name => {
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(name));
	return Array.from(new Uint8Array(hash, 0, 16), byte => byte.toString(16).padStart(2, '0')).join('');
};

const buildCompanionConfig = async selected => {
	const regionKeys = new Map();
	const channels = [];

	for (const { name, scope } of selected) {
		const regionName = scope ? `#${scope}` : null;
		if (regionName && !regionKeys.has(regionName)) regionKeys.set(regionName, await deriveKey(regionName));

		channels.push({
			name,
			secret: name === 'Public' ? RG_PUBLIC_SECRET : await deriveKey(name),
			region_scope_name: regionName,
			region_scope_key: regionKeys.get(regionName) ?? null,
			message_retention_duration_seconds: null,
		});
	}

	return { channels, region_transport_keys: [...regionKeys].map(([name, key]) => ({ name, key })) };
};

const fetchContacts = async params => {
	const url = `${RG_NODES_ENDPOINT}?${new URLSearchParams(params)}`;
	const contacts = await fetchData(url).catch(err => {
		throw new Error(`GET ${url} - ${err.message}`, { cause: err });
	});
	if (!Array.isArray(contacts)) throw new Error(`GET ${url} - nieprawidłowy format danych`);

	return contacts;
};

const downloadCompanionConfig = async () => {
	const button = document.getElementById('rg-export');
	const errorElement = document.getElementById('rg-export-error');
	errorElement.hidden = true;

	try {
		const selected = exportChannels
			.map(channel => ({ name: channel.name, ...getChannelSelection(channel) }))
			.filter(channel => channel.checked);
		const withRadio = document.getElementById('rg-export-radio').checked;
		const withContacts = document.getElementById('rg-export-contacts').checked;
		const codes = [document.getElementById('rg-home').value, ...getSelectedNeighbors()];
		const nodeParams = {
			voivodeship: codes.join(','),
			type: 'repeater',
			days: document.getElementById('rg-contacts-days').value || document.getElementById('rg-contacts-days').defaultValue,
			limit: document.getElementById('rg-contacts-limit').value,
		};

		button.disabled = true;
		const contacts = withContacts ? await fetchContacts(nodeParams) : null;
		if (contacts && !contacts.length) throw new Error(`Brak repeaterów aktywnych w wybranych województwach (liczba dni: ${nodeParams.days}). Zwiększ liczbę dni, wybierz sąsiednie województwo lub odznacz dodawanie repeaterów.`);

		const config = {
			...(withRadio && { radio_settings: RG_RADIO_SETTINGS }),
			...(selected.length && await buildCompanionConfig(selected)),
			...(contacts && { contacts }),
		};

		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }));
		link.download = RG_EXPORT_FILENAME;
		link.click();
		setTimeout(() => URL.revokeObjectURL(link.href), 1000);
	} catch (err) {
		console.error('Nie udało się wygenerować pliku:', err);
		document.getElementById('rg-export-error-details').textContent = err.message;
		errorElement.hidden = false;
	} finally {
		updateExportButton();
	}
};

const validateLocalScope = (city, home) => {
	if (!city) return [];

	const errors = [];
	if (!(/^[a-z0-9]+(-[a-z0-9]+)*$/).test(city)) errors.push('Użyj tylko małych liter od a do z i cyfr. Poszczególne części nazwy możesz oddzielić pojedynczymi myślnikami.');
	if (new TextEncoder().encode(city).length > RG_MAX_NAME_BYTES) errors.push(`Nazwa regionu może mieć maksymalnie ${RG_MAX_NAME_BYTES} bajtów.`);

	const voivodeship = Object.values(regionData.voivodeships).find(config => config.scope === city);
	const regions = Object.values(regionData.localRegions).filter(config => getRegionScopes(config).includes(city));
	const belongsToHome = regions.some(region => region.voivodeships.includes(home));

	if (city === rootScope) {
		errors.push(`Nazwa „${city}” jest zarezerwowana dla regionu krajowego.`);
	} else if (voivodeship && !belongsToHome) {
		errors.push(`Nazwa „${city}” jest już przypisana do regionu wojewódzkiego (${voivodeship.name}).`);
	}

	if (regions.length && !belongsToHome) errors.push(`Region „${regions[0].name}” nie należy do wybranego województwa.`);
	return errors;
};

const getSelectedLocalScope = () => {
	const selected = document.getElementById('rg-city').value;
	return selected === RG_CUSTOM_SCOPE ? document.getElementById('rg-custom-scope').value.trim().toLowerCase() : selected;
};

const updateCustomRegionField = () => {
	const custom = document.getElementById('rg-city').value === RG_CUSTOM_SCOPE;
	document.getElementById('rg-custom-region').hidden = !custom;
	document.getElementById('rg-custom-scope').disabled = !custom;
};

const renderLocalRegions = (home, scope = '') => {
	const select = document.getElementById('rg-city');
	const customInput = document.getElementById('rg-custom-scope');
	const hintElement = document.getElementById('rg-local-hint');

	const regions = Object.values(regionData.localRegions)
		.filter(region => !region.automatic && region.voivodeships.includes(home));
	const regionValue = region => getRegionScopes(region).find(value => value !== getVoivodeshipScope(home)) ?? getRegionScopes(region)[0];

	const createGroup = (label, items) => {
		if (!items.length) return [];

		const group = document.createElement('optgroup');
		group.label = label;
		group.append(...items
			.toSorted((a, b) => a.name.localeCompare(b.name, 'pl'))
			.map(region => new Option(`${region.name} (${getRegionScopes(region).join(', ')})`, regionValue(region))));
		return [group];
	};
	const isCounty = region => region.name.startsWith('powiat ');

	select.replaceChildren(
		new Option('Bez regionu lokalnego', ''),
		new Option('Własny region', RG_CUSTOM_SCOPE),
		...createGroup('Miasta i obszary', regions.filter(region => !isCounty(region))),
		...createGroup('Powiaty', regions.filter(isCounty))
	);

	const validScope = !validateLocalScope(scope, home).length ? scope : '';
	const known = regions.find(region => getRegionScopes(region).includes(validScope));
	const automaticRegions = getAutomaticRegions([home]);
	const automatic = automaticRegions.some(region => getRegionScopes(region).includes(validScope));

	if (known) {
		select.value = regionValue(known);
	} else if (validScope && !automatic) {
		select.value = RG_CUSTOM_SCOPE;
	} else {
		select.value = '';
	}

	customInput.value = select.value === RG_CUSTOM_SCOPE ? validScope : '';

	hintElement.textContent = regions.length
		? 'Wybierz region z listy. Wiele nazw to propozycje. Jeśli lokalna społeczność używa innej nazwy, wybierz „Własny region”.'
		: 'Brak znanych regionów lokalnych dla tego województwa. W razie potrzeby wybierz „Własny region”.';

	updateCustomRegionField();
};

const loadSettings = () => {
	try {
		const settings = JSON.parse(localStorage.getItem(RG_SETTINGS_KEY));
		if (!settings || typeof settings !== 'object' || Array.isArray(settings)) return null;

		const home = typeof settings.home === 'string' && Object.hasOwn(regionData.voivodeships, settings.home)
			? settings.home : Object.keys(regionData.voivodeships)[0];
		const city = typeof settings.city === 'string' ? settings.city.trim().toLowerCase() : '';
		const neighbors = Array.isArray(settings.neighbors) ? settings.neighbors : [];
		return {
			scenario: settings.scenario === 'companion' ? 'companion' : 'repeater',
			home,
			firmware: ['116', '115', 'old'].includes(settings.firmware) ? settings.firmware : '116',
			city: validateLocalScope(city, home).length ? '' : city,
			neighbors: [...new Set(neighbors.filter(code => regionData.voivodeships[home].neighbors.includes(code)))].slice(0, RG_MAX_NEIGHBORS),
			setDefault: settings.setDefault === true,
		};
	} catch (err) {
		console.warn('Nie udało się odczytać ustawień:', err);
		return null;
	}
};

const saveSettings = () => {
	try {
		localStorage.setItem(RG_SETTINGS_KEY, JSON.stringify({
			scenario: getScenario(),
			home: document.getElementById('rg-home').value,
			firmware: document.getElementById('rg-fw').value,
			city: getSelectedLocalScope(),
			neighbors: getSelectedNeighbors(),
			setDefault: document.getElementById('rg-default').checked,
		}));
	} catch (err) {
		console.warn('Nie udało się zapisać ustawień:', err);
	}
};

const limitNeighbors = () => {
	const inputs = [...document.querySelectorAll('#rg-neighbors input')];
	const limitReached = inputs.filter(input => input.checked).length >= RG_MAX_NEIGHBORS;
	inputs.forEach(input => input.disabled = limitReached && !input.checked);
};

const renderNeighbors = (home, selected = null) => {
	const container = document.getElementById('rg-neighbors');
	const checked = new Set(selected ?? [...container.querySelectorAll('input:checked')].map(input => input.value));
	container.replaceChildren(...regionData.voivodeships[home].neighbors.map(code => {
		const label = document.createElement('label');
		label.className = 'rg-check';

		const input = document.createElement('input');
		input.type = 'checkbox';
		input.value = code;
		input.checked = checked.has(code);

		const text = document.createElement('span');
		text.textContent = `${regionData.voivodeships[code].name} (${getVoivodeshipScope(code)})`;

		label.append(input, text);
		return label;
	}));
};

const renderOutput = () => {
	const firmware = document.getElementById('rg-fw').value;
	document.getElementById('rg-fw-warning').hidden = firmware === '116';

	const defaultInput = document.getElementById('rg-default');
	defaultInput.disabled = firmware === 'old';
	const setDefault = defaultInput.checked && !defaultInput.disabled;

	const neighbors = getSelectedNeighbors();

	const city = getSelectedLocalScope();
	const home = document.getElementById('rg-home').value;
	const errors = validateLocalScope(city, home);

	const errorsBox = document.getElementById('rg-errors');
	errorsBox.hidden = !errors.length;

	const result = document.getElementById('rg-result');
	result.hidden = errors.length > 0;

	document.getElementById('rg-output').hidden = false;

	if (errors.length) {
		document.getElementById('rg-errors-list').replaceChildren(...errors.map(message => {
			const li = document.createElement('li');
			li.textContent = message;
			return li;
		}));
		return;
	}

	const tree = buildTree(home, city, neighbors);
	setCommands(buildCommands({ tree, firmware, setDefault }));

	setCode('rg-tree', buildTreePreview(tree));

	renderChannels(buildChannels(home, city, neighbors));

	document.getElementById('rg-no-channels').hidden = !city || channelsForScope(city).length > 0;
	document.getElementById('rg-no-channels-scope').textContent = city;

	document.getElementById('rg-community-groups').replaceChildren(...[rootScope, home, ...neighbors].map(code => {
		const tr = document.createElement('tr');
		const region = document.createElement('td');
		const config = code === rootScope ? regionData.country : regionData.voivodeships[code];

		const name = code === rootScope ? 'Krajowy' : config.name;
		region.textContent = name.charAt(0).toUpperCase() + name.slice(1);

		const server = document.createElement('td');
		const url = config.socials.discord;
		if (url) {
			const link = document.createElement('a');
			link.href = url;
			link.target = '_blank';
			link.rel = 'noopener';
			link.textContent = 'Dołącz teraz';
			server.append(link);
		} else {
			server.textContent = 'Brak znanego serwera';
		}
		tr.append(region, server);
		return tr;
	}));
};

const bindToggle = (panelId, onToggle) => {
	const button = document.getElementById(`${panelId}-toggle`);
	const panel = document.getElementById(panelId);
	button.addEventListener('click', () => {
		panel.hidden = !panel.hidden;
		button.setAttribute('aria-expanded', String(!panel.hidden));
		onToggle?.();
	});
};

const initGenerator = async () => {
	const cleanupRequested = location.hash === '#usuwanie-regionow';
	let scenarioPicked = false;

	document.getElementById('rg-scenario').addEventListener('change', () => {
		scenarioPicked = true;
		applyScenario();
		if (regionData) saveSettings();
	});
	if (cleanupRequested) document.getElementById('usuwanie-regionow').open = true;
	applyScenario();

	try {
		await loadRegions();
	} catch (err) {
		console.error('Nie udało się pobrać listy regionów:', err);
		rgForm.hidden = true;
		document.getElementById('rg-load-error-details').textContent = `GET ${RG_ENDPOINT} - ${err.message}`;
		document.getElementById('rg-load-error').hidden = false;
		return;
	}

	const homeSelect = document.getElementById('rg-home');
	homeSelect.append(...Object.entries(regionData.voivodeships).map(([code, { name, scope }]) => new Option(`${name} (${scope})`, code)));

	rgForm.addEventListener('input', event => {
		if (event.target === homeSelect) {
			renderNeighbors(homeSelect.value);
			renderLocalRegions(homeSelect.value);
		}
		if (event.target === document.getElementById('rg-city')) updateCustomRegionField();
		limitNeighbors();
		renderOutput();
		saveSettings();
	});
	rgForm.addEventListener('submit', event => event.preventDefault());
	document.getElementById('rg-export').addEventListener('click', downloadCompanionConfig);
	['rg-export-contacts', 'rg-export-radio'].forEach(id => document.getElementById(id).addEventListener('input', updateExportButton));
	bindNumberLimits(document.getElementById('rg-contacts-days'));
	bindToggle('rg-import', renderChannelTable);
	bindToggle('rg-manual');

	const settings = loadSettings();
	if (settings) {
		if (!cleanupRequested && !scenarioPicked) getScenarioInputs().forEach(input => input.checked = input.value === settings.scenario);
		homeSelect.value = settings.home;
		document.getElementById('rg-fw').value = settings.firmware;
		document.getElementById('rg-default').checked = settings.setDefault;
	}
	applyScenario();
	renderNeighbors(homeSelect.value, settings?.neighbors);
	renderLocalRegions(homeSelect.value, settings?.city);
	limitNeighbors();
	renderOutput();
	if (scenarioPicked) saveSettings();
};

if (rgForm && !rgForm.closest('[inert]')) initGenerator();

if (rcForm) {
	const renderCleanup = () => {
		const text = document.getElementById('rc-current').value;
		const { names, skipped } = parseCurrentRegions(text);
		document.getElementById('rc-truncated').hidden = !skipped;
		document.getElementById('rc-truncated-line').textContent = skipped ?? '';
		document.getElementById('rc-empty').hidden = !text.trim() || names.length > 0 || Boolean(skipped);
		document.getElementById('rc-output').hidden = !names.length;
		if (names.length) setCode('rc-commands', [...names.map(name => `region remove ${name}`), 'region save', 'region'].join('\n'));
	};

	rcForm.addEventListener('input', renderCleanup);
	rcForm.addEventListener('submit', event => event.preventDefault());
	renderCleanup();
}
