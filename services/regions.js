import data from '../content/regions.js';
import { slugify } from './markdown.js';

const { country, voivodeships, localRegions, commonChannels, channelDescriptions } = data;

const toVoivodeship = ([code, { name, scope, channels, neighbors, socials = {} }]) => ({
	code, slug: slugify(name), name, scope, parentScope: country.scope, channels, neighbors, socials,
});

const toLocalRegion = ([code, { name, scope, parentScope, channels, voivodeships: codes, automatic = false, socials = {} }]) => ({
	code,
	name,
	scope,
	parentScope: parentScope ?? (automatic ? country.scope : voivodeships[codes[0]].scope),
	voivodeships: codes,
	automatic,
	channels,
	socials,
});

const voivodeshipList = Object.entries(voivodeships).map(toVoivodeship);
const localRegionList = Object.entries(localRegions).map(toLocalRegion);

const getLocalRegions = voivodeship => voivodeship ? localRegionList.filter(region => region.voivodeships.includes(voivodeship)) : localRegionList;
const getVoivodeship = code => voivodeshipList.find(region => region.code === code);
const getVoivodeshipBySlug = slug => voivodeshipList.find(region => region.slug === slug);
const getLocalRegion = code => localRegionList.find(region => region.code === code);

const regions = {
	country: { ...country, socials: country.socials ?? {} },
	voivodeships: voivodeshipList,
	localRegions: localRegionList,
	commonChannels,
	channelDescriptions,
};

export { regions, voivodeshipList, getVoivodeship, getVoivodeshipBySlug, getLocalRegions, getLocalRegion };
