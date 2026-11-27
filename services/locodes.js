import data from '../content/locodes.json' with { type: 'json' };

const collator = new Intl.Collator('pl');
const locodes = [...data].sort((a, b) => collator.compare(a.name, b.name) || collator.compare(a.code, b.code));
const byVoivodeship = Map.groupBy(locodes, entry => entry.voivodeship);

const getLocodes = voivodeship => (voivodeship === undefined ? locodes : byVoivodeship.get(voivodeship) ?? []);

export { getLocodes };
