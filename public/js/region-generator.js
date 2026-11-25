const CHANNEL_DESCRIPTIONS = {
	Public: 'Domyślny publiczny kanał rozmów.',
	'#emergency': 'Łączność w sytuacjach kryzysowych oraz testy łączności awaryjnej organizowane 13. dnia każdego miesiąca o 20:00. Zwykłe testy wykonuj na #test lub #bot.',
	'#test': 'Testy łączności, np. po zmianie sprzętu lub aktualizacji oprogramowania.',
	'#bot': 'Testy łączności z botami, które potwierdzają odbiór wiadomości i podają informacje o trasie pakietów oraz parametrach sygnału.',
	'#polska': 'Rozmowy społeczności MeshCore z całej Polski.',
	'#wlkp': 'Codzienne rozmowy społeczności MeshCore z Wielkopolski.',
	'#poznan': 'Lokalny kanał społeczności z Poznania i okolic.',
	'#szczecin': 'Lokalny kanał społeczności ze Szczecina i okolic.',
	'#weather': 'Pogoda: komendy botów (np. !wx, !gwx, !astro) oraz automatyczne prognozy i ostrzeżenia o opadach.',
	'#zachod': 'Wspólny kanał zachodniej Polski (Dolnośląskie, Lubuskie, Wielkopolskie, Zachodniopomorskie).',
	'#info': 'Informacje i ostrzeżenia, m.in. automatyczne komunikaty RSO o utrudnieniach drogowych oraz zagrożeniach pogodowych i hydrologicznych.',
};

const MESHCORE_REGIONS = {
	commonChannels: ['#test', '#bot', '#info', '#emergency'],
	country: {
		scope: 'pl',
		channels: ['#polska'],
		discordUrl: 'https://discord.gg/g4W4Gx6Aw',
	},
	voivodeships: {
		ds: {
			name: 'dolnośląskie',
			scope: 'pl-ds',
			channels: ['#dolnoslaskie', '#ds-test'],
			neighbors: ['lb', 'wp', 'op'],
		},
		kp: {
			name: 'kujawsko-pomorskie',
			scope: 'pl-kp',
			channels: ['#kp'],
			neighbors: ['pm', 'wn', 'mz', 'ld', 'wp'],
		},
		lu: {
			name: 'lubelskie',
			scope: 'pl-lu',
			channels: ['#lubelskie', '#lublin'],
			neighbors: ['mz', 'pd', 'pk', 'sk'],
		},
		lb: {
			name: 'lubuskie',
			scope: 'pl-lb',
			channels: ['#lubuskie'],
			neighbors: ['zp', 'wp', 'ds'],
		},
		ld: {
			name: 'łódzkie',
			scope: 'pl-ld',
			channels: ['#lodzkie'],
			neighbors: ['kp', 'mz', 'sk', 'sl', 'op', 'wp'],
			discordUrl: 'https://discord.gg/jzrYzbBtwg',
		},
		ma: {
			name: 'małopolskie',
			scope: 'pl-ma',
			channels: ['#malopolskie', '#krakow'],
			neighbors: ['sl', 'sk', 'pk'],
		},
		mz: {
			name: 'mazowieckie',
			scope: 'pl-mz',
			channels: ['#mazowsze', '#bot'],
			neighbors: ['wn', 'pd', 'lu', 'sk', 'ld', 'kp'],
		},
		op: {
			name: 'opolskie',
			scope: 'pl-op',
			channels: ['#opolskie'],
			neighbors: ['ds', 'wp', 'ld', 'sl'],
		},
		pk: {
			name: 'podkarpackie',
			scope: 'pl-pk',
			channels: ['#podkarpackie', '#testing'],
			neighbors: ['ma', 'sk', 'lu'],
			discordUrl: 'https://discord.gg/G7spWkppwd',
		},
		pd: {
			name: 'podlaskie',
			scope: 'pl-pd',
			channels: ['#podlaskie'],
			neighbors: ['wn', 'mz', 'lu'],
		},
		pm: {
			name: 'pomorskie',
			scope: 'pl-pm',
			channels: ['#pm'],
			neighbors: ['zp', 'wp', 'kp', 'wn'],
		},
		sl: {
			name: 'śląskie',
			scope: 'pl-sl',
			channels: ['#slaskie', '#botslaskie'],
			neighbors: ['op', 'ld', 'sk', 'ma'],
		},
		sk: {
			name: 'świętokrzyskie',
			scope: 'pl-sk',
			channels: ['#swietokrzyskie', '#kielce'],
			neighbors: ['ld', 'mz', 'lu', 'pk', 'ma', 'sl'],
			discordUrl: 'https://discord.gg/rksm5bKxDg',
		},
		wn: {
			name: 'warmińsko-mazurskie',
			scope: 'pl-wn',
			channels: ['#warminsko-mazurskie'],
			neighbors: ['pm', 'kp', 'mz', 'pd'],
		},
		wp: {
			name: 'wielkopolskie',
			scope: 'wlkp',
			channels: ['#wlkp', '#poznan', '#info', '#test', '#weather'],
			neighbors: ['zp', 'pm', 'kp', 'ld', 'op', 'ds', 'lb'],
		},
		zp: {
			name: 'zachodniopomorskie',
			scope: 'pl-zp',
			channels: ['#zachodniopomorskie'],
			neighbors: ['pm', 'wp', 'lb'],
		},
	},
	localRegions: {
		bzg: {
			name: 'Bydgoszcz',
			scope: 'bzg',
			channels: ['#bydgoszcz'],
			voivodeships: ['kp'],
		},
		waw: {
			name: 'Warszawa',
			scope: 'waw',
			channels: ['#warszawa', '#bot', '#test'],
			voivodeships: ['mz'],
		},
		rze: {
			name: 'Rzeszów',
			scope: 'rze',
			parentScope: 'pl',
			channels: ['#rzeszow'],
			voivodeships: ['pk'],
		},
		wro: {
			name: 'Wrocław',
			scope: 'wro',
			channels: ['#wroclaw', '#wroc-tech'],
			voivodeships: ['ds'],
		},
		zgora: {
			name: 'Zielona Góra',
			scope: 'zgora',
			channels: [],
			voivodeships: ['lb'],
		},
		zachod: {
			name: 'Zachód Polski',
			scope: 'zachod',
			channels: ['#zachod', '#szczecin'],
			voivodeships: ['ds', 'lb', 'wp', 'zp'],
			automatic: true,
		},
		ldz: {
			name: 'Łódź',
			scope: 'ldz',
			channels: ['#lodz'],
			voivodeships: ['ld'],
		},
		gdn: {
			name: 'Trójmiasto',
			scope: 'gdn',
			channels: ['#pomorskie', '#bot'],
			voivodeships: ['pm'],
		},
		'ds-dbl': {
			name: 'powiat bolesławiecki',
			scope: 'ds-dbl',
			channels: ['#boleslawiec'],
			voivodeships: ['ds'],
		},
		'ds-ddz': {
			name: 'powiat dzierżoniowski',
			scope: 'ds-ddz',
			channels: ['#dzierzoniow'],
			voivodeships: ['ds'],
		},
		'ds-dgl': {
			name: 'powiat głogowski',
			scope: 'ds-dgl',
			channels: ['#glogow'],
			voivodeships: ['ds'],
		},
		'ds-dgr': {
			name: 'powiat górowski',
			scope: 'ds-dgr',
			channels: ['#gora'],
			voivodeships: ['ds'],
		},
		'ds-dja': {
			name: 'powiat jaworski',
			scope: 'ds-dja',
			channels: ['#jawor'],
			voivodeships: ['ds'],
		},
		'ds-dje': {
			name: 'powiat karkonoski i Jelenia Góra',
			scope: 'ds-dje',
			channels: ['#jelenia-gora'],
			voivodeships: ['ds'],
		},
		'ds-dka': {
			name: 'powiat kamiennogórski',
			scope: 'ds-dka',
			channels: ['#kamienna-gora'],
			voivodeships: ['ds'],
		},
		'ds-dkl': {
			name: 'powiat kłodzki',
			scope: 'ds-dkl',
			channels: ['#klodzko'],
			voivodeships: ['ds'],
		},
		'ds-dle': {
			name: 'powiat legnicki i Legnica',
			scope: 'ds-dle',
			channels: ['#legnica'],
			voivodeships: ['ds'],
		},
		'ds-dlb': {
			name: 'powiat lubański',
			scope: 'ds-dlb',
			channels: ['#luban'],
			voivodeships: ['ds'],
		},
		'ds-dlu': {
			name: 'powiat lubiński',
			scope: 'ds-dlu',
			channels: ['#lubin'],
			voivodeships: ['ds'],
		},
		'ds-dlw': {
			name: 'powiat lwówecki',
			scope: 'ds-dlw',
			channels: ['#lwowek-slaski'],
			voivodeships: ['ds'],
		},
		'ds-dmi': {
			name: 'powiat milicki',
			scope: 'ds-dmi',
			channels: ['#milicz'],
			voivodeships: ['ds'],
		},
		'ds-dol': {
			name: 'powiat oleśnicki',
			scope: 'ds-dol',
			channels: ['#olesnica'],
			voivodeships: ['ds'],
		},
		'ds-doa': {
			name: 'powiat oławski',
			scope: 'ds-doa',
			channels: ['#olawa'],
			voivodeships: ['ds'],
		},
		'ds-dpl': {
			name: 'powiat polkowicki',
			scope: 'ds-dpl',
			channels: ['#polkowice'],
			voivodeships: ['ds'],
		},
		'ds-dst': {
			name: 'powiat strzeliński',
			scope: 'ds-dst',
			channels: ['#strzelin'],
			voivodeships: ['ds'],
		},
		'ds-dsr': {
			name: 'powiat średzki',
			scope: 'ds-dsr',
			channels: ['#sroda-slaska'],
			voivodeships: ['ds'],
		},
		'ds-dsw': {
			name: 'powiat świdnicki',
			scope: 'ds-dsw',
			channels: ['#swidnica'],
			voivodeships: ['ds'],
		},
		'ds-dtr': {
			name: 'powiat trzebnicki',
			scope: 'ds-dtr',
			channels: ['#trzebnica'],
			voivodeships: ['ds'],
		},
		'ds-dba': {
			name: 'powiat wałbrzyski i Wałbrzych',
			scope: 'ds-dba',
			channels: ['#walbrzych'],
			voivodeships: ['ds'],
		},
		'ds-dwl': {
			name: 'powiat wołowski',
			scope: 'ds-dwl',
			channels: ['#wolow'],
			voivodeships: ['ds'],
		},
		'ds-dza': {
			name: 'powiat ząbkowicki',
			scope: 'ds-dza',
			channels: ['#zabkowice-slaskie'],
			voivodeships: ['ds'],
		},
		'ds-dzg': {
			name: 'powiat zgorzelecki',
			scope: 'ds-dzg',
			channels: ['#zgorzelec'],
			voivodeships: ['ds'],
		},
		'ds-dzl': {
			name: 'powiat złotoryjski',
			scope: 'ds-dzl',
			channels: ['#zlotoryja'],
			voivodeships: ['ds'],
		},
		'kp-cal': {
			name: 'powiat aleksandrowski',
			scope: 'kp-cal',
			channels: ['#aleksandrow-kujawski'],
			voivodeships: ['kp'],
		},
		'jo': {
			name: 'powiat brodnicki, powiat chełmiński, powiat grudziądzki, powiat rypiński, powiat toruński, Grudziądz, Toruń',
			scope: 'jo',
			channels: ['#brodnica', '#chelmno', '#grudziadz', '#rypin', '#torun'],
			voivodeships: ['kp'],
		},
		'kp-cgd': {
			name: 'powiat golubsko-dobrzyński',
			scope: 'kp-cgd',
			channels: ['#golub-dobrzyn'],
			voivodeships: ['kp'],
		},
		'kp-cin': {
			name: 'powiat inowrocławski',
			scope: 'kp-cin',
			channels: ['#inowroclaw'],
			voivodeships: ['kp'],
		},
		'kp-cli': {
			name: 'powiat lipnowski',
			scope: 'kp-cli',
			channels: ['#lipno'],
			voivodeships: ['kp'],
		},
		'kp-cmg': {
			name: 'powiat mogileński',
			scope: 'kp-cmg',
			channels: ['#mogilno'],
			voivodeships: ['kp'],
		},
		'kp-cna': {
			name: 'powiat nakielski',
			scope: 'kp-cna',
			channels: ['#naklo-nad-notecia'],
			voivodeships: ['kp'],
		},
		'kp-cra': {
			name: 'powiat radziejowski',
			scope: 'kp-cra',
			channels: ['#radziejow'],
			voivodeships: ['kp'],
		},
		'kp-cse': {
			name: 'powiat sępoleński',
			scope: 'kp-cse',
			channels: ['#sepolno-krajenskie'],
			voivodeships: ['kp'],
		},
		'kp-csw': {
			name: 'powiat świecki',
			scope: 'kp-csw',
			channels: ['#swiecie'],
			voivodeships: ['kp'],
		},
		'kp-ctu': {
			name: 'powiat tucholski',
			scope: 'kp-ctu',
			channels: ['#tuchola'],
			voivodeships: ['kp'],
		},
		'kp-cwa': {
			name: 'powiat wąbrzeski',
			scope: 'kp-cwa',
			channels: ['#wabrzezno'],
			voivodeships: ['kp'],
		},
		'kp-cwl': {
			name: 'powiat włocławski i Włocławek',
			scope: 'kp-cwl',
			channels: ['#wloclawek'],
			voivodeships: ['kp'],
		},
		'kp-czn': {
			name: 'powiat żniński',
			scope: 'kp-czn',
			channels: ['#znin'],
			voivodeships: ['kp'],
		},
		'lu-lbi': {
			name: 'powiat bialski i Biała Podlaska',
			scope: 'lu-lbi',
			channels: ['#biala-podlaska'],
			voivodeships: ['lu'],
		},
		'lu-lbl': {
			name: 'powiat biłgorajski',
			scope: 'lu-lbl',
			channels: ['#bilgoraj'],
			voivodeships: ['lu'],
		},
		'lu-lch': {
			name: 'powiat chełmski i Chełm',
			scope: 'lu-lch',
			channels: ['#chelm'],
			voivodeships: ['lu'],
		},
		'lu-lhr': {
			name: 'powiat hrubieszowski',
			scope: 'lu-lhr',
			channels: ['#hrubieszow'],
			voivodeships: ['lu'],
		},
		'lu-lja': {
			name: 'powiat janowski',
			scope: 'lu-lja',
			channels: ['#janow-lubelski'],
			voivodeships: ['lu'],
		},
		'lu-lks': {
			name: 'powiat krasnostawski',
			scope: 'lu-lks',
			channels: ['#krasnystaw'],
			voivodeships: ['lu'],
		},
		'lu-lkr': {
			name: 'powiat kraśnicki',
			scope: 'lu-lkr',
			channels: ['#krasnik'],
			voivodeships: ['lu'],
		},
		'lu-llb': {
			name: 'powiat lubartowski',
			scope: 'lu-llb',
			channels: ['#lubartow'],
			voivodeships: ['lu'],
		},
		'lu-lub': {
			name: 'powiat lubelski i Lublin',
			scope: 'lu-lub',
			channels: [],
			voivodeships: ['lu'],
		},
		'lu-lle': {
			name: 'powiat łęczyński',
			scope: 'lu-lle',
			channels: ['#leczna'],
			voivodeships: ['lu'],
		},
		'lu-llu': {
			name: 'powiat łukowski',
			scope: 'lu-llu',
			channels: ['#lukow'],
			voivodeships: ['lu'],
		},
		'lu-lop': {
			name: 'powiat opolski',
			scope: 'lu-lop',
			channels: ['#opole-lubelskie'],
			voivodeships: ['lu'],
		},
		'lu-lpa': {
			name: 'powiat parczewski',
			scope: 'lu-lpa',
			channels: ['#parczew'],
			voivodeships: ['lu'],
		},
		'lu-lpu': {
			name: 'powiat puławski',
			scope: 'lu-lpu',
			channels: ['#pulawy'],
			voivodeships: ['lu'],
		},
		'lu-lra': {
			name: 'powiat radzyński',
			scope: 'lu-lra',
			channels: ['#radzyn-podlaski'],
			voivodeships: ['lu'],
		},
		'lu-lry': {
			name: 'powiat rycki',
			scope: 'lu-lry',
			channels: ['#ryki'],
			voivodeships: ['lu'],
		},
		'lu-lsw': {
			name: 'powiat świdnicki',
			scope: 'lu-lsw',
			channels: ['#swidnik'],
			voivodeships: ['lu'],
		},
		'lu-ltm': {
			name: 'powiat tomaszowski',
			scope: 'lu-ltm',
			channels: ['#tomaszow-lubelski'],
			voivodeships: ['lu'],
		},
		'lu-lwl': {
			name: 'powiat włodawski',
			scope: 'lu-lwl',
			channels: ['#wlodawa'],
			voivodeships: ['lu'],
		},
		'lu-lza': {
			name: 'powiat zamojski i Zamość',
			scope: 'lu-lza',
			channels: ['#zamosc'],
			voivodeships: ['lu'],
		},
		'lb-fgw': {
			name: 'powiat gorzowski i Gorzów Wielkopolski',
			scope: 'lb-fgw',
			channels: ['#gorzow-wielkopolski'],
			voivodeships: ['lb'],
		},
		'lb-fkr': {
			name: 'powiat krośnieński',
			scope: 'lb-fkr',
			channels: ['#krosno-odrzanskie'],
			voivodeships: ['lb'],
		},
		'lb-fmi': {
			name: 'powiat międzyrzecki',
			scope: 'lb-fmi',
			channels: ['#miedzyrzecz'],
			voivodeships: ['lb'],
		},
		'lb-fnw': {
			name: 'powiat nowosolski',
			scope: 'lb-fnw',
			channels: ['#nowe-miasteczko'],
			voivodeships: ['lb'],
		},
		'lb-fsl': {
			name: 'powiat słubicki',
			scope: 'lb-fsl',
			channels: ['#slubice'],
			voivodeships: ['lb'],
		},
		'lb-fsd': {
			name: 'powiat strzelecko-drezdenecki',
			scope: 'lb-fsd',
			channels: ['#strzelce-krajenskie'],
			voivodeships: ['lb'],
		},
		'lb-fsu': {
			name: 'powiat sulęciński',
			scope: 'lb-fsu',
			channels: ['#sulecin'],
			voivodeships: ['lb'],
		},
		'lb-fsw': {
			name: 'powiat świebodziński',
			scope: 'lb-fsw',
			channels: ['#swiebodzin'],
			voivodeships: ['lb'],
		},
		'lb-fzg': {
			name: 'powiat żagański',
			scope: 'lb-fzg',
			channels: ['#zagan'],
			voivodeships: ['lb'],
		},
		'lb-fza': {
			name: 'powiat żarski',
			scope: 'lb-fza',
			channels: ['#zary'],
			voivodeships: ['lb'],
		},
		'lb-fws': {
			name: 'powiat wschowski',
			scope: 'lb-fws',
			channels: ['#wschowa'],
			voivodeships: ['lb'],
		},
		'ld-ebe': {
			name: 'powiat bełchatowski',
			scope: 'ld-ebe',
			channels: ['#belchatow'],
			voivodeships: ['ld'],
		},
		'ld-eku': {
			name: 'powiat kutnowski',
			scope: 'ld-eku',
			channels: ['#kutno'],
			voivodeships: ['ld'],
		},
		'ld-ela': {
			name: 'powiat łaski',
			scope: 'ld-ela',
			channels: ['#lask'],
			voivodeships: ['ld'],
		},
		'ld-ele': {
			name: 'powiat łęczycki',
			scope: 'ld-ele',
			channels: ['#leczyca'],
			voivodeships: ['ld'],
		},
		'ld-elc': {
			name: 'powiat łowicki',
			scope: 'ld-elc',
			channels: ['#lowicz'],
			voivodeships: ['ld'],
		},
		'ld-eop': {
			name: 'powiat opoczyński',
			scope: 'ld-eop',
			channels: ['#opoczno'],
			voivodeships: ['ld'],
		},
		'ld-epa': {
			name: 'powiat pabianicki',
			scope: 'ld-epa',
			channels: ['#pabianice'],
			voivodeships: ['ld'],
		},
		'ld-epj': {
			name: 'powiat pajęczański',
			scope: 'ld-epj',
			channels: ['#pajeczno'],
			voivodeships: ['ld'],
		},
		'ld-epi': {
			name: 'powiat piotrkowski i Piotrków Trybunalski',
			scope: 'ld-epi',
			channels: ['#piotrkow-trybunalski'],
			voivodeships: ['ld'],
		},
		'ld-epd': {
			name: 'powiat poddębicki',
			scope: 'ld-epd',
			channels: ['#poddebice'],
			voivodeships: ['ld'],
		},
		'ld-era': {
			name: 'powiat radomszczański',
			scope: 'ld-era',
			channels: ['#radomsko'],
			voivodeships: ['ld'],
		},
		'ld-erw': {
			name: 'powiat rawski',
			scope: 'ld-erw',
			channels: ['#rawa-mazowiecka'],
			voivodeships: ['ld'],
		},
		'ld-esi': {
			name: 'powiat sieradzki',
			scope: 'ld-esi',
			channels: ['#sieradz'],
			voivodeships: ['ld'],
		},
		'ld-esk': {
			name: 'powiat skierniewicki i Skierniewice',
			scope: 'ld-esk',
			channels: ['#skierniewice'],
			voivodeships: ['ld'],
		},
		'ld-etm': {
			name: 'powiat tomaszowski',
			scope: 'ld-etm',
			channels: ['#tomaszow-mazowiecki'],
			voivodeships: ['ld'],
		},
		'ld-ewi': {
			name: 'powiat wieluński',
			scope: 'ld-ewi',
			channels: ['#wielun'],
			voivodeships: ['ld'],
		},
		'ld-ewe': {
			name: 'powiat wieruszowski',
			scope: 'ld-ewe',
			channels: ['#wieruszow'],
			voivodeships: ['ld'],
		},
		'ld-ezd': {
			name: 'powiat zduńskowolski',
			scope: 'ld-ezd',
			channels: ['#zdunska-wola'],
			voivodeships: ['ld'],
		},
		'ld-ezg': {
			name: 'powiat zgierski',
			scope: 'ld-ezg',
			channels: ['#zgierz'],
			voivodeships: ['ld'],
		},
		'ld-ebr': {
			name: 'powiat brzeziński',
			scope: 'ld-ebr',
			channels: ['#brzeziny'],
			voivodeships: ['ld'],
		},
		'ma-kbc': {
			name: 'powiat bocheński',
			scope: 'ma-kbc',
			channels: ['#bochnia'],
			voivodeships: ['ma'],
		},
		'ma-kbr': {
			name: 'powiat brzeski',
			scope: 'ma-kbr',
			channels: ['#brzesko'],
			voivodeships: ['ma'],
		},
		'ma-kch': {
			name: 'powiat chrzanowski',
			scope: 'ma-kch',
			channels: ['#chrzanow'],
			voivodeships: ['ma'],
		},
		'ma-kda': {
			name: 'powiat dąbrowski',
			scope: 'ma-kda',
			channels: ['#dabrowa-tarnowska'],
			voivodeships: ['ma'],
		},
		'ma-kgr': {
			name: 'powiat gorlicki',
			scope: 'ma-kgr',
			channels: ['#gorlice'],
			voivodeships: ['ma'],
		},
		'ma-kra': {
			name: 'powiat krakowski i Kraków',
			scope: 'ma-kra',
			channels: [],
			voivodeships: ['ma'],
		},
		'ma-kli': {
			name: 'powiat limanowski',
			scope: 'ma-kli',
			channels: ['#limanowa'],
			voivodeships: ['ma'],
		},
		'ma-kmi': {
			name: 'powiat miechowski',
			scope: 'ma-kmi',
			channels: ['#miechow'],
			voivodeships: ['ma'],
		},
		'ma-kmy': {
			name: 'powiat myślenicki',
			scope: 'ma-kmy',
			channels: ['#myslenice'],
			voivodeships: ['ma'],
		},
		'ma-kns': {
			name: 'powiat nowosądecki i Nowy Sącz',
			scope: 'ma-kns',
			channels: ['#nowy-sacz'],
			voivodeships: ['ma'],
		},
		'ma-knt': {
			name: 'powiat nowotarski',
			scope: 'ma-knt',
			channels: ['#nowy-targ'],
			voivodeships: ['ma'],
		},
		'ma-kol': {
			name: 'powiat olkuski',
			scope: 'ma-kol',
			channels: ['#olkusz'],
			voivodeships: ['ma'],
		},
		'ma-kos': {
			name: 'powiat oświęcimski',
			scope: 'ma-kos',
			channels: ['#oswiecim'],
			voivodeships: ['ma'],
		},
		'ma-kpr': {
			name: 'powiat proszowicki',
			scope: 'ma-kpr',
			channels: ['#proszowice'],
			voivodeships: ['ma'],
		},
		'ma-ksu': {
			name: 'powiat suski',
			scope: 'ma-ksu',
			channels: ['#sucha-beskidzka'],
			voivodeships: ['ma'],
		},
		'ma-kta': {
			name: 'powiat tarnowski i Tarnów',
			scope: 'ma-kta',
			channels: ['#tarnow'],
			voivodeships: ['ma'],
		},
		'ma-ktt': {
			name: 'powiat tatrzański',
			scope: 'ma-ktt',
			channels: ['#zakopane'],
			voivodeships: ['ma'],
		},
		'ma-kwa': {
			name: 'powiat wadowicki',
			scope: 'ma-kwa',
			channels: ['#wadowice'],
			voivodeships: ['ma'],
		},
		'ma-kwi': {
			name: 'powiat wielicki',
			scope: 'ma-kwi',
			channels: ['#wieliczka'],
			voivodeships: ['ma'],
		},
		'mz-wbr': {
			name: 'powiat białobrzeski',
			scope: 'mz-wbr',
			channels: ['#bialobrzegi'],
			voivodeships: ['mz'],
		},
		'mz-wci': {
			name: 'powiat ciechanowski',
			scope: 'mz-wci',
			channels: ['#ciechanow'],
			voivodeships: ['mz'],
		},
		'mz-wg': {
			name: 'powiat garwoliński',
			scope: 'mz-wg',
			channels: ['#garwolin'],
			voivodeships: ['mz'],
		},
		'mz-wgs': {
			name: 'powiat gostyniński',
			scope: 'mz-wgs',
			channels: ['#gostynin'],
			voivodeships: ['mz'],
		},
		'mz-wgm': {
			name: 'powiat grodziski',
			scope: 'mz-wgm',
			channels: ['#grodzisk-mazowiecki'],
			voivodeships: ['mz'],
		},
		'mz-wgr': {
			name: 'powiat grójecki',
			scope: 'mz-wgr',
			channels: ['#grojec'],
			voivodeships: ['mz'],
		},
		'mz-wkz': {
			name: 'powiat kozienicki',
			scope: 'mz-wkz',
			channels: ['#kozienice'],
			voivodeships: ['mz'],
		},
		'mz-wl': {
			name: 'powiat legionowski',
			scope: 'mz-wl',
			channels: ['#legionowo'],
			voivodeships: ['mz'],
		},
		'mz-wli': {
			name: 'powiat lipski',
			scope: 'mz-wli',
			channels: ['#lipsko'],
			voivodeships: ['mz'],
		},
		'mz-wls': {
			name: 'powiat łosicki',
			scope: 'mz-wls',
			channels: ['#losice'],
			voivodeships: ['mz'],
		},
		'mz-wma': {
			name: 'powiat makowski',
			scope: 'mz-wma',
			channels: ['#makow-mazowiecki'],
			voivodeships: ['mz'],
		},
		'mz-wm': {
			name: 'powiat miński',
			scope: 'mz-wm',
			channels: ['#minsk-mazowiecki'],
			voivodeships: ['mz'],
		},
		'mz-wml': {
			name: 'powiat mławski',
			scope: 'mz-wml',
			channels: ['#mlawa'],
			voivodeships: ['mz'],
		},
		'mz-wnd': {
			name: 'powiat nowodworski',
			scope: 'mz-wnd',
			channels: ['#nowy-dwor-mazowiecki'],
			voivodeships: ['mz'],
		},
		'mz-wos': {
			name: 'powiat ostrołęcki i Ostrołęka',
			scope: 'mz-wos',
			channels: ['#ostroleka'],
			voivodeships: ['mz'],
		},
		'mz-wor': {
			name: 'powiat ostrowski',
			scope: 'mz-wor',
			channels: ['#ostrow-mazowiecka'],
			voivodeships: ['mz'],
		},
		'mz-wot': {
			name: 'powiat otwocki',
			scope: 'mz-wot',
			channels: ['#otwock'],
			voivodeships: ['mz'],
		},
		'mz-wpi': {
			name: 'powiat piaseczyński',
			scope: 'mz-wpi',
			channels: ['#piaseczno'],
			voivodeships: ['mz'],
		},
		'mz-wpl': {
			name: 'powiat płocki i Płock',
			scope: 'mz-wpl',
			channels: ['#plock'],
			voivodeships: ['mz'],
		},
		'mz-wpn': {
			name: 'powiat płoński',
			scope: 'mz-wpn',
			channels: ['#plonsk'],
			voivodeships: ['mz'],
		},
		'mz-wpr': {
			name: 'powiat pruszkowski',
			scope: 'mz-wpr',
			channels: ['#pruszkow'],
			voivodeships: ['mz'],
		},
		'mz-wpz': {
			name: 'powiat przasnyski',
			scope: 'mz-wpz',
			channels: ['#przasnysz'],
			voivodeships: ['mz'],
		},
		'mz-wpy': {
			name: 'powiat przysuski',
			scope: 'mz-wpy',
			channels: ['#przysucha'],
			voivodeships: ['mz'],
		},
		'mz-wpu': {
			name: 'powiat pułtuski',
			scope: 'mz-wpu',
			channels: ['#pultusk'],
			voivodeships: ['mz'],
		},
		'mz-wra': {
			name: 'powiat radomski i Radom',
			scope: 'mz-wra',
			channels: ['#radom'],
			voivodeships: ['mz'],
		},
		'mz-wsi': {
			name: 'powiat siedlecki i Siedlce',
			scope: 'mz-wsi',
			channels: ['#siedlce'],
			voivodeships: ['mz'],
		},
		'mz-wse': {
			name: 'powiat sierpecki',
			scope: 'mz-wse',
			channels: ['#sierpc'],
			voivodeships: ['mz'],
		},
		'mz-wsc': {
			name: 'powiat sochaczewski',
			scope: 'mz-wsc',
			channels: ['#sochaczew'],
			voivodeships: ['mz'],
		},
		'mz-wsk': {
			name: 'powiat sokołowski',
			scope: 'mz-wsk',
			channels: ['#sokolow-podlaski'],
			voivodeships: ['mz'],
		},
		'mz-wsz': {
			name: 'powiat szydłowiecki',
			scope: 'mz-wsz',
			channels: ['#szydlowiec'],
			voivodeships: ['mz'],
		},
		'mz-wz': {
			name: 'powiat warszawski zachodni',
			scope: 'mz-wz',
			channels: ['#ozarow-mazowiecki'],
			voivodeships: ['mz'],
		},
		'mz-wwe': {
			name: 'powiat węgrowski',
			scope: 'mz-wwe',
			channels: ['#wegrow'],
			voivodeships: ['mz'],
		},
		'mz-wwl': {
			name: 'powiat wołomiński',
			scope: 'mz-wwl',
			channels: ['#wolomin'],
			voivodeships: ['mz'],
		},
		'mz-wwy': {
			name: 'powiat wyszkowski',
			scope: 'mz-wwy',
			channels: ['#wyszkow'],
			voivodeships: ['mz'],
		},
		'mz-wzw': {
			name: 'powiat zwoleński',
			scope: 'mz-wzw',
			channels: ['#zwolen'],
			voivodeships: ['mz'],
		},
		'mz-wzu': {
			name: 'powiat żuromiński',
			scope: 'mz-wzu',
			channels: ['#zuromin'],
			voivodeships: ['mz'],
		},
		'mz-wzy': {
			name: 'powiat żyrardowski',
			scope: 'mz-wzy',
			channels: ['#zyrardow'],
			voivodeships: ['mz'],
		},
		'op-ob': {
			name: 'powiat brzeski',
			scope: 'op-ob',
			channels: ['#brzeg'],
			voivodeships: ['op'],
		},
		'op-ogl': {
			name: 'powiat głubczycki',
			scope: 'op-ogl',
			channels: ['#glubczyce'],
			voivodeships: ['op'],
		},
		'op-ok': {
			name: 'powiat kędzierzyńsko-kozielski',
			scope: 'op-ok',
			channels: ['#kedzierzyn-kozle'],
			voivodeships: ['op'],
		},
		'op-okl': {
			name: 'powiat kluczborski',
			scope: 'op-okl',
			channels: ['#kluczbork'],
			voivodeships: ['op'],
		},
		'op-okr': {
			name: 'powiat krapkowicki',
			scope: 'op-okr',
			channels: ['#krapkowice'],
			voivodeships: ['op'],
		},
		'op-ona': {
			name: 'powiat namysłowski',
			scope: 'op-ona',
			channels: ['#namyslow'],
			voivodeships: ['op'],
		},
		'op-ony': {
			name: 'powiat nyski',
			scope: 'op-ony',
			channels: ['#nysa'],
			voivodeships: ['op'],
		},
		'op-ool': {
			name: 'powiat oleski',
			scope: 'op-ool',
			channels: ['#olesno'],
			voivodeships: ['op'],
		},
		'op-opo': {
			name: 'powiat opolski i Opole',
			scope: 'op-opo',
			channels: ['#opole'],
			voivodeships: ['op'],
		},
		'op-opr': {
			name: 'powiat prudnicki',
			scope: 'op-opr',
			channels: ['#prudnik'],
			voivodeships: ['op'],
		},
		'op-ost': {
			name: 'powiat strzelecki',
			scope: 'op-ost',
			channels: ['#strzelce-opolskie'],
			voivodeships: ['op'],
		},
		'pk-rbi': {
			name: 'powiat bieszczadzki',
			scope: 'pk-rbi',
			channels: ['#ustrzyki-dolne'],
			voivodeships: ['pk'],
		},
		'pk-rbr': {
			name: 'powiat brzozowski',
			scope: 'pk-rbr',
			channels: ['#brzozow'],
			voivodeships: ['pk'],
		},
		'pk-rde': {
			name: 'powiat dębicki',
			scope: 'pk-rde',
			channels: ['#debica'],
			voivodeships: ['pk'],
		},
		'pk-rja': {
			name: 'powiat jarosławski',
			scope: 'pk-rja',
			channels: ['#jaroslaw'],
			voivodeships: ['pk'],
		},
		'pk-rjs': {
			name: 'powiat jasielski',
			scope: 'pk-rjs',
			channels: ['#jaslo'],
			voivodeships: ['pk'],
		},
		'pk-rkl': {
			name: 'powiat kolbuszowski',
			scope: 'pk-rkl',
			channels: ['#kolbuszowa'],
			voivodeships: ['pk'],
		},
		'pk-rkr': {
			name: 'powiat krośnieński i Krosno',
			scope: 'pk-rkr',
			channels: ['#krosno'],
			voivodeships: ['pk'],
		},
		'pk-rle': {
			name: 'powiat leżajski',
			scope: 'pk-rle',
			channels: ['#lezajsk'],
			voivodeships: ['pk'],
		},
		'pk-rlu': {
			name: 'powiat lubaczowski',
			scope: 'pk-rlu',
			channels: ['#lubaczow'],
			voivodeships: ['pk'],
		},
		'pk-rla': {
			name: 'powiat łańcucki',
			scope: 'pk-rla',
			channels: ['#lancut'],
			voivodeships: ['pk'],
		},
		'pk-rmi': {
			name: 'powiat mielecki',
			scope: 'pk-rmi',
			channels: ['#mielec'],
			voivodeships: ['pk'],
		},
		'pk-rni': {
			name: 'powiat niżański',
			scope: 'pk-rni',
			channels: ['#nisko'],
			voivodeships: ['pk'],
		},
		'pk-rpr': {
			name: 'powiat przemyski i Przemyśl',
			scope: 'pk-rpr',
			channels: ['#przemysl'],
			voivodeships: ['pk'],
		},
		'pk-rpz': {
			name: 'powiat przeworski',
			scope: 'pk-rpz',
			channels: ['#przeworsk'],
			voivodeships: ['pk'],
		},
		'pk-rrs': {
			name: 'powiat ropczycko-sędziszowski',
			scope: 'pk-rrs',
			channels: ['#ropczyce'],
			voivodeships: ['pk'],
		},
		'pk-rsa': {
			name: 'powiat sanocki',
			scope: 'pk-rsa',
			channels: ['#sanok'],
			voivodeships: ['pk'],
		},
		'pk-rst': {
			name: 'powiat stalowowolski',
			scope: 'pk-rst',
			channels: ['#stalowa-wola'],
			voivodeships: ['pk'],
		},
		'pk-rsr': {
			name: 'powiat strzyżowski',
			scope: 'pk-rsr',
			channels: ['#strzyzow'],
			voivodeships: ['pk'],
		},
		'pk-rta': {
			name: 'powiat tarnobrzeski i Tarnobrzeg',
			scope: 'pk-rta',
			channels: ['#tarnobrzeg'],
			voivodeships: ['pk'],
		},
		'pk-rls': {
			name: 'powiat leski',
			scope: 'pk-rls',
			channels: ['#lesko'],
			voivodeships: ['pk'],
		},
		'pd-bau': {
			name: 'powiat augustowski',
			scope: 'pd-bau',
			channels: ['#augustow'],
			voivodeships: ['pd'],
		},
		'pd-bia': {
			name: 'powiat białostocki i Białystok',
			scope: 'pd-bia',
			channels: ['#bialystok'],
			voivodeships: ['pd'],
		},
		'pd-bbi': {
			name: 'powiat bielski',
			scope: 'pd-bbi',
			channels: ['#bielsk-podlaski'],
			voivodeships: ['pd'],
		},
		'pd-bgr': {
			name: 'powiat grajewski',
			scope: 'pd-bgr',
			channels: ['#grajewo'],
			voivodeships: ['pd'],
		},
		'pd-bha': {
			name: 'powiat hajnowski',
			scope: 'pd-bha',
			channels: ['#hajnowka'],
			voivodeships: ['pd'],
		},
		'pd-bkl': {
			name: 'powiat kolneński',
			scope: 'pd-bkl',
			channels: ['#kolno'],
			voivodeships: ['pd'],
		},
		'pd-blm': {
			name: 'powiat łomżyński i Łomża',
			scope: 'pd-blm',
			channels: ['#lomza'],
			voivodeships: ['pd'],
		},
		'pd-bmn': {
			name: 'powiat moniecki',
			scope: 'pd-bmn',
			channels: ['#monki'],
			voivodeships: ['pd'],
		},
		'pd-bse': {
			name: 'powiat sejneński',
			scope: 'pd-bse',
			channels: ['#sejny'],
			voivodeships: ['pd'],
		},
		'pd-bsi': {
			name: 'powiat siemiatycki',
			scope: 'pd-bsi',
			channels: ['#siemiatycze'],
			voivodeships: ['pd'],
		},
		'pd-bsk': {
			name: 'powiat sokólski',
			scope: 'pd-bsk',
			channels: ['#sokolka'],
			voivodeships: ['pd'],
		},
		'pd-bsu': {
			name: 'powiat suwalski i Suwałki',
			scope: 'pd-bsu',
			channels: ['#suwalki'],
			voivodeships: ['pd'],
		},
		'pd-bwm': {
			name: 'powiat wysokomazowiecki',
			scope: 'pd-bwm',
			channels: ['#wysokie-mazowieckie'],
			voivodeships: ['pd'],
		},
		'pd-bza': {
			name: 'powiat zambrowski',
			scope: 'pd-bza',
			channels: ['#zambrow'],
			voivodeships: ['pd'],
		},
		'pm-gby': {
			name: 'powiat bytowski',
			scope: 'pm-gby',
			channels: ['#bytow'],
			voivodeships: ['pm'],
		},
		'pm-gch': {
			name: 'powiat chojnicki',
			scope: 'pm-gch',
			channels: ['#chojnice'],
			voivodeships: ['pm'],
		},
		'pm-gcz': {
			name: 'powiat człuchowski',
			scope: 'pm-gcz',
			channels: ['#czluchow'],
			voivodeships: ['pm'],
		},
		'pm-gka': {
			name: 'powiat kartuski',
			scope: 'pm-gka',
			channels: ['#kartuzy'],
			voivodeships: ['pm'],
		},
		'pm-gks': {
			name: 'powiat kościerski',
			scope: 'pm-gks',
			channels: ['#koscierzyna'],
			voivodeships: ['pm'],
		},
		'pm-gkw': {
			name: 'powiat kwidzyński',
			scope: 'pm-gkw',
			channels: ['#kwidzyn'],
			voivodeships: ['pm'],
		},
		'pm-gle': {
			name: 'powiat lęborski',
			scope: 'pm-gle',
			channels: ['#lebork'],
			voivodeships: ['pm'],
		},
		'pm-gmb': {
			name: 'powiat malborski',
			scope: 'pm-gmb',
			channels: ['#malbork'],
			voivodeships: ['pm'],
		},
		'pm-gnd': {
			name: 'powiat nowodworski',
			scope: 'pm-gnd',
			channels: ['#nowy-dwor-gdanski'],
			voivodeships: ['pm'],
		},
		'pm-gpu': {
			name: 'powiat pucki',
			scope: 'pm-gpu',
			channels: ['#puck'],
			voivodeships: ['pm'],
		},
		'pm-gsl': {
			name: 'powiat słupski i Słupsk',
			scope: 'pm-gsl',
			channels: ['#slupsk'],
			voivodeships: ['pm'],
		},
		'pm-gst': {
			name: 'powiat starogardzki',
			scope: 'pm-gst',
			channels: ['#starogard-gdanski'],
			voivodeships: ['pm'],
		},
		'pm-gtc': {
			name: 'powiat tczewski',
			scope: 'pm-gtc',
			channels: ['#tczew'],
			voivodeships: ['pm'],
		},
		'pm-gwe': {
			name: 'powiat wejherowski',
			scope: 'pm-gwe',
			channels: ['#wejherowo'],
			voivodeships: ['pm'],
		},
		'pm-gsz': {
			name: 'powiat sztumski',
			scope: 'pm-gsz',
			channels: ['#sztum'],
			voivodeships: ['pm'],
		},
		'sl-sbe': {
			name: 'powiat będziński',
			scope: 'sl-sbe',
			channels: ['#bedzin'],
			voivodeships: ['sl'],
		},
		'sl-sbi': {
			name: 'powiat bielski i Bielsko-Biała',
			scope: 'sl-sbi',
			channels: ['#bielsko-biala'],
			voivodeships: ['sl'],
		},
		'sl-sci': {
			name: 'powiat cieszyński',
			scope: 'sl-sci',
			channels: ['#cieszyn'],
			voivodeships: ['sl'],
		},
		'czw': {
			name: 'powiat częstochowski i Częstochowa',
			scope: 'czw',
			channels: ['#czestochowa'],
			voivodeships: ['sl'],
		},
		'sl-sgl': {
			name: 'powiat gliwicki i Gliwice',
			scope: 'sl-sgl',
			channels: ['#gliwice'],
			voivodeships: ['sl'],
		},
		'sl-skl': {
			name: 'powiat kłobucki',
			scope: 'sl-skl',
			channels: ['#klobuck'],
			voivodeships: ['sl'],
		},
		'sl-slu': {
			name: 'powiat lubliniecki',
			scope: 'sl-slu',
			channels: ['#lubliniec'],
			voivodeships: ['sl'],
		},
		'sl-smi': {
			name: 'powiat mikołowski',
			scope: 'sl-smi',
			channels: ['#mikolow'],
			voivodeships: ['sl'],
		},
		'sl-smy': {
			name: 'powiat myszkowski',
			scope: 'sl-smy',
			channels: ['#myszkow'],
			voivodeships: ['sl'],
		},
		'sl-sps': {
			name: 'powiat pszczyński',
			scope: 'sl-sps',
			channels: ['#pszczyna'],
			voivodeships: ['sl'],
		},
		'sl-src': {
			name: 'powiat raciborski',
			scope: 'sl-src',
			channels: ['#raciborz'],
			voivodeships: ['sl'],
		},
		'sl-srb': {
			name: 'powiat rybnicki i Rybnik',
			scope: 'sl-srb',
			channels: ['#rybnik'],
			voivodeships: ['sl'],
		},
		'sl-sta': {
			name: 'powiat tarnogórski',
			scope: 'sl-sta',
			channels: ['#tarnowskie-gory'],
			voivodeships: ['sl'],
		},
		'sl-sbl': {
			name: 'powiat bieruńsko-lędziński',
			scope: 'sl-sbl',
			channels: ['#bierun'],
			voivodeships: ['sl'],
		},
		'sl-swd': {
			name: 'powiat wodzisławski',
			scope: 'sl-swd',
			channels: ['#wodzislaw-slaski'],
			voivodeships: ['sl'],
		},
		'sl-sza': {
			name: 'powiat zawierciański',
			scope: 'sl-sza',
			channels: ['#zawiercie'],
			voivodeships: ['sl'],
		},
		'sl-szy': {
			name: 'powiat żywiecki',
			scope: 'sl-szy',
			channels: ['#zywiec'],
			voivodeships: ['sl'],
		},
		'sl-sy': {
			name: 'Bytom',
			scope: 'sl-sy',
			channels: ['#bytom'],
			voivodeships: ['sl'],
		},
		'sl-sh': {
			name: 'Chorzów',
			scope: 'sl-sh',
			channels: ['#chorzow'],
			voivodeships: ['sl'],
		},
		'sl-sd': {
			name: 'Dąbrowa Górnicza',
			scope: 'sl-sd',
			channels: ['#dabrowa-gornicza'],
			voivodeships: ['sl'],
		},
		'sl-sjz': {
			name: 'Jastrzębie-Zdrój',
			scope: 'sl-sjz',
			channels: ['#jastrzebie-zdroj'],
			voivodeships: ['sl'],
		},
		'sl-sj': {
			name: 'Jaworzno',
			scope: 'sl-sj',
			channels: ['#jaworzno'],
			voivodeships: ['sl'],
		},
		'sl-sk': {
			name: 'Katowice',
			scope: 'sl-sk',
			channels: ['#katowice'],
			voivodeships: ['sl'],
		},
		'sl-sm': {
			name: 'Mysłowice',
			scope: 'sl-sm',
			channels: ['#myslowice'],
			voivodeships: ['sl'],
		},
		'sl-spi': {
			name: 'Piekary Śląskie',
			scope: 'sl-spi',
			channels: ['#piekary-slaskie'],
			voivodeships: ['sl'],
		},
		'sl-srs': {
			name: 'Ruda Śląska',
			scope: 'sl-srs',
			channels: ['#ruda-slaska'],
			voivodeships: ['sl'],
		},
		'sl-si': {
			name: 'Siemianowice Śląskie',
			scope: 'sl-si',
			channels: ['#siemianowice-slaskie'],
			voivodeships: ['sl'],
		},
		'sl-so': {
			name: 'Sosnowiec',
			scope: 'sl-so',
			channels: ['#sosnowiec'],
			voivodeships: ['sl'],
		},
		'sl-sw': {
			name: 'Świętochłowice',
			scope: 'sl-sw',
			channels: ['#swietochlowice'],
			voivodeships: ['sl'],
		},
		'sl-st': {
			name: 'Tychy',
			scope: 'sl-st',
			channels: ['#tychy'],
			voivodeships: ['sl'],
		},
		'sl-sz': {
			name: 'Zabrze',
			scope: 'sl-sz',
			channels: ['#zabrze'],
			voivodeships: ['sl'],
		},
		'sl-szo': {
			name: 'Żory',
			scope: 'sl-szo',
			channels: ['#zory'],
			voivodeships: ['sl'],
		},
		'sk-tbu': {
			name: 'powiat buski',
			scope: 'sk-tbu',
			channels: ['#busko-zdroj'],
			voivodeships: ['sk'],
		},
		'sk-tje': {
			name: 'powiat jędrzejowski',
			scope: 'sk-tje',
			channels: ['#jedrzejow'],
			voivodeships: ['sk'],
		},
		'sk-tka': {
			name: 'powiat kazimierski',
			scope: 'sk-tka',
			channels: ['#kazimierza-wielka'],
			voivodeships: ['sk'],
		},
		'sk-tki': {
			name: 'powiat kielecki i Kielce',
			scope: 'sk-tki',
			channels: [],
			voivodeships: ['sk'],
		},
		'sk-tkn': {
			name: 'powiat konecki',
			scope: 'sk-tkn',
			channels: ['#konskie'],
			voivodeships: ['sk'],
		},
		'sk-top': {
			name: 'powiat opatowski',
			scope: 'sk-top',
			channels: ['#opatow'],
			voivodeships: ['sk'],
		},
		'sk-tos': {
			name: 'powiat ostrowiecki',
			scope: 'sk-tos',
			channels: ['#ostrowiec-swietokrzyski'],
			voivodeships: ['sk'],
		},
		'sk-tpi': {
			name: 'powiat pińczowski',
			scope: 'sk-tpi',
			channels: ['#pinczow'],
			voivodeships: ['sk'],
		},
		'sk-tsa': {
			name: 'powiat sandomierski',
			scope: 'sk-tsa',
			channels: ['#sandomierz'],
			voivodeships: ['sk'],
		},
		'sk-tsk': {
			name: 'powiat skarżyski',
			scope: 'sk-tsk',
			channels: ['#skarzysko-kamienna'],
			voivodeships: ['sk'],
		},
		'sk-tst': {
			name: 'powiat starachowicki',
			scope: 'sk-tst',
			channels: ['#starachowice'],
			voivodeships: ['sk'],
		},
		'sk-tsz': {
			name: 'powiat staszowski',
			scope: 'sk-tsz',
			channels: ['#staszow'],
			voivodeships: ['sk'],
		},
		'sk-tlw': {
			name: 'powiat włoszczowski',
			scope: 'sk-tlw',
			channels: ['#wloszczowa'],
			voivodeships: ['sk'],
		},
		'wn-nba': {
			name: 'powiat bartoszycki',
			scope: 'wn-nba',
			channels: ['#bartoszyce'],
			voivodeships: ['wn'],
		},
		'wn-nbr': {
			name: 'powiat braniewski',
			scope: 'wn-nbr',
			channels: ['#braniewo'],
			voivodeships: ['wn'],
		},
		'wn-ndz': {
			name: 'powiat działdowski',
			scope: 'wn-ndz',
			channels: ['#dzialdowo'],
			voivodeships: ['wn'],
		},
		'wn-neb': {
			name: 'powiat elbląski i Elbląg',
			scope: 'wn-neb',
			channels: ['#elblag'],
			voivodeships: ['wn'],
		},
		'wn-nel': {
			name: 'powiat ełcki',
			scope: 'wn-nel',
			channels: ['#elk'],
			voivodeships: ['wn'],
		},
		'wn-ngi': {
			name: 'powiat giżycki',
			scope: 'wn-ngi',
			channels: ['#gizycko'],
			voivodeships: ['wn'],
		},
		'wn-nil': {
			name: 'powiat iławski',
			scope: 'wn-nil',
			channels: ['#ilawa'],
			voivodeships: ['wn'],
		},
		'wn-nke': {
			name: 'powiat kętrzyński',
			scope: 'wn-nke',
			channels: ['#ketrzyn'],
			voivodeships: ['wn'],
		},
		'wn-nli': {
			name: 'powiat lidzbarski',
			scope: 'wn-nli',
			channels: ['#lidzbark-warminski'],
			voivodeships: ['wn'],
		},
		'wn-nmr': {
			name: 'powiat mrągowski',
			scope: 'wn-nmr',
			channels: ['#mragowo'],
			voivodeships: ['wn'],
		},
		'wn-nni': {
			name: 'powiat nidzicki',
			scope: 'wn-nni',
			channels: ['#nidzica'],
			voivodeships: ['wn'],
		},
		'wn-nnm': {
			name: 'powiat nowomiejski',
			scope: 'wn-nnm',
			channels: ['#nowe-miasto-lubawskie'],
			voivodeships: ['wn'],
		},
		'wn-noe': {
			name: 'powiat olecki',
			scope: 'wn-noe',
			channels: ['#olecko'],
			voivodeships: ['wn'],
		},
		'ol': {
			name: 'powiat olsztyński i Olsztyn',
			scope: 'ol',
			channels: ['#olsztyn'],
			voivodeships: ['wn'],
		},
		'wn-nos': {
			name: 'powiat ostródzki',
			scope: 'wn-nos',
			channels: ['#ostroda'],
			voivodeships: ['wn'],
		},
		'wn-npi': {
			name: 'powiat piski',
			scope: 'wn-npi',
			channels: ['#pisz'],
			voivodeships: ['wn'],
		},
		'wn-nsz': {
			name: 'powiat szczycieński',
			scope: 'wn-nsz',
			channels: ['#szczytno'],
			voivodeships: ['wn'],
		},
		'wn-ngo': {
			name: 'powiat gołdapski',
			scope: 'wn-ngo',
			channels: ['#goldap'],
			voivodeships: ['wn'],
		},
		'wn-nwe': {
			name: 'powiat węgorzewski',
			scope: 'wn-nwe',
			channels: ['#wegorzewo'],
			voivodeships: ['wn'],
		},
		'wp-pch': {
			name: 'powiat chodzieski',
			scope: 'wp-pch',
			channels: ['#chodziez'],
			voivodeships: ['wp'],
		},
		'wp-pct': {
			name: 'powiat czarnkowsko-trzcianecki',
			scope: 'wp-pct',
			channels: ['#czarnkow'],
			voivodeships: ['wp'],
		},
		'wp-pgn': {
			name: 'powiat gnieźnieński',
			scope: 'wp-pgn',
			channels: ['#gniezno'],
			voivodeships: ['wp'],
		},
		'wp-pgs': {
			name: 'powiat gostyński',
			scope: 'wp-pgs',
			channels: ['#gostyn'],
			voivodeships: ['wp'],
		},
		'wp-pgo': {
			name: 'powiat grodziski',
			scope: 'wp-pgo',
			channels: ['#grodzisk-wielkopolski'],
			voivodeships: ['wp'],
		},
		'wp-pja': {
			name: 'powiat jarociński',
			scope: 'wp-pja',
			channels: ['#jarocin'],
			voivodeships: ['wp'],
		},
		'wp-pka': {
			name: 'powiat kaliski i Kalisz',
			scope: 'wp-pka',
			channels: ['#kalisz'],
			voivodeships: ['wp'],
		},
		'wp-pke': {
			name: 'powiat kępiński',
			scope: 'wp-pke',
			channels: ['#kepno'],
			voivodeships: ['wp'],
		},
		'wp-pkl': {
			name: 'powiat kolski',
			scope: 'wp-pkl',
			channels: ['#kolo'],
			voivodeships: ['wp'],
		},
		'wp-pkn': {
			name: 'powiat koniński i Konin',
			scope: 'wp-pkn',
			channels: ['#konin'],
			voivodeships: ['wp'],
		},
		'wp-pks': {
			name: 'powiat kościański',
			scope: 'wp-pks',
			channels: ['#koscian'],
			voivodeships: ['wp'],
		},
		'wp-pkr': {
			name: 'powiat krotoszyński',
			scope: 'wp-pkr',
			channels: ['#krotoszyn'],
			voivodeships: ['wp'],
		},
		'wp-ple': {
			name: 'powiat leszczyński i Leszno',
			scope: 'wp-ple',
			channels: ['#leszno'],
			voivodeships: ['wp'],
		},
		'wp-pmi': {
			name: 'powiat międzychodzki',
			scope: 'wp-pmi',
			channels: ['#miedzychod'],
			voivodeships: ['wp'],
		},
		'wp-pnt': {
			name: 'powiat nowotomyski',
			scope: 'wp-pnt',
			channels: ['#nowy-tomysl'],
			voivodeships: ['wp'],
		},
		'wp-pob': {
			name: 'powiat obornicki',
			scope: 'wp-pob',
			channels: ['#oborniki'],
			voivodeships: ['wp'],
		},
		'wp-pos': {
			name: 'powiat ostrowski',
			scope: 'wp-pos',
			channels: ['#ostrow-wielkopolski'],
			voivodeships: ['wp'],
		},
		'wp-pot': {
			name: 'powiat ostrzeszowski',
			scope: 'wp-pot',
			channels: ['#ostrzeszow'],
			voivodeships: ['wp'],
		},
		'wp-pp': {
			name: 'powiat pilski',
			scope: 'wp-pp',
			channels: ['#pila'],
			voivodeships: ['wp'],
		},
		'wp-ppl': {
			name: 'powiat pleszewski',
			scope: 'wp-ppl',
			channels: ['#pleszew'],
			voivodeships: ['wp'],
		},
		'poz': {
			name: 'powiat poznański i Poznań',
			scope: 'poz',
			channels: [],
			voivodeships: ['wp'],
		},
		'wp-pra': {
			name: 'powiat rawicki',
			scope: 'wp-pra',
			channels: ['#rawicz'],
			voivodeships: ['wp'],
		},
		'wp-psl': {
			name: 'powiat słupecki',
			scope: 'wp-psl',
			channels: ['#slupca'],
			voivodeships: ['wp'],
		},
		'wp-psz': {
			name: 'powiat szamotulski',
			scope: 'wp-psz',
			channels: ['#szamotuly'],
			voivodeships: ['wp'],
		},
		'wp-psr': {
			name: 'powiat średzki',
			scope: 'wp-psr',
			channels: ['#sroda-wielkopolska'],
			voivodeships: ['wp'],
		},
		'wp-pse': {
			name: 'powiat śremski',
			scope: 'wp-pse',
			channels: ['#srem'],
			voivodeships: ['wp'],
		},
		'wp-ptu': {
			name: 'powiat turecki',
			scope: 'wp-ptu',
			channels: ['#turek'],
			voivodeships: ['wp'],
		},
		'wp-pwa': {
			name: 'powiat wągrowiecki',
			scope: 'wp-pwa',
			channels: ['#wagrowiec'],
			voivodeships: ['wp'],
		},
		'wp-pwl': {
			name: 'powiat wolsztyński',
			scope: 'wp-pwl',
			channels: ['#wolsztyn'],
			voivodeships: ['wp'],
		},
		'wp-pwr': {
			name: 'powiat wrzesiński',
			scope: 'wp-pwr',
			channels: ['#wrzesnia'],
			voivodeships: ['wp'],
		},
		'wp-pzl': {
			name: 'powiat złotowski',
			scope: 'wp-pzl',
			channels: ['#zlotow'],
			voivodeships: ['wp'],
		},
		'zp-zbi': {
			name: 'powiat białogardzki',
			scope: 'zp-zbi',
			channels: ['#bialogard'],
			voivodeships: ['zp'],
		},
		'zp-zch': {
			name: 'powiat choszczeński',
			scope: 'zp-zch',
			channels: ['#choszczno'],
			voivodeships: ['zp'],
		},
		'zp-zdr': {
			name: 'powiat drawski',
			scope: 'zp-zdr',
			channels: ['#drawsko-pomorskie'],
			voivodeships: ['zp'],
		},
		'zp-zgl': {
			name: 'powiat goleniowski',
			scope: 'zp-zgl',
			channels: ['#goleniow'],
			voivodeships: ['zp'],
		},
		'zp-zgy': {
			name: 'powiat gryficki',
			scope: 'zp-zgy',
			channels: ['#gryfice'],
			voivodeships: ['zp'],
		},
		'zp-zgr': {
			name: 'powiat gryfiński',
			scope: 'zp-zgr',
			channels: ['#gryfino'],
			voivodeships: ['zp'],
		},
		'zp-zka': {
			name: 'powiat kamieński',
			scope: 'zp-zka',
			channels: ['#kamien-pomorski'],
			voivodeships: ['zp'],
		},
		'zp-zkl': {
			name: 'powiat kołobrzeski',
			scope: 'zp-zkl',
			channels: ['#kolobrzeg'],
			voivodeships: ['zp'],
		},
		'zp-zko': {
			name: 'powiat koszaliński i Koszalin',
			scope: 'zp-zko',
			channels: ['#koszalin'],
			voivodeships: ['zp'],
		},
		'zp-zmy': {
			name: 'powiat myśliborski',
			scope: 'zp-zmy',
			channels: ['#mysliborz'],
			voivodeships: ['zp'],
		},
		'zp-zpl': {
			name: 'powiat policki',
			scope: 'zp-zpl',
			channels: ['#police'],
			voivodeships: ['zp'],
		},
		'zp-zpy': {
			name: 'powiat pyrzycki',
			scope: 'zp-zpy',
			channels: ['#pyrzyce'],
			voivodeships: ['zp'],
		},
		'zp-zsl': {
			name: 'powiat sławieński',
			scope: 'zp-zsl',
			channels: ['#slawno'],
			voivodeships: ['zp'],
		},
		'zp-zst': {
			name: 'powiat stargardzki',
			scope: 'zp-zst',
			channels: ['#stargard'],
			voivodeships: ['zp'],
		},
		'zp-zsz': {
			name: 'powiat szczecinecki',
			scope: 'zp-zsz',
			channels: ['#szczecinek'],
			voivodeships: ['zp'],
		},
		'zp-zsd': {
			name: 'powiat świdwiński',
			scope: 'zp-zsd',
			channels: ['#swidwin'],
			voivodeships: ['zp'],
		},
		'zp-zwa': {
			name: 'powiat wałecki',
			scope: 'zp-zwa',
			channels: ['#walcz'],
			voivodeships: ['zp'],
		},
		'zp-zlo': {
			name: 'powiat łobeski',
			scope: 'zp-zlo',
			channels: ['#lobez'],
			voivodeships: ['zp'],
		},
		'zp-zs': {
			name: 'Szczecin',
			scope: 'zp-zs',
			channels: [],
			voivodeships: ['zp'],
		},
		'zp-zsw': {
			name: 'Świnoujście',
			scope: 'zp-zsw',
			channels: ['#swinoujscie'],
			voivodeships: ['zp'],
		},
	},
};

const RG_ROOT = MESHCORE_REGIONS.country.scope;
const RG_MAX_NAME_BYTES = 29;
const RG_MAX_LINE = 160;
const RG_MAX_NEIGHBORS = 2;
const RG_CLI_REPLIES = new Set(['OK', 'Err']);
const RG_SETTINGS_KEY = 'meshcore.regionGenerator.settings';
const RG_CUSTOM_SCOPE = '__custom__';

let highlighterPromise = null;

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

const parseCurrentRegions = text => {
	const names = new Set();

	for (const raw of text.split(/\r?\n/)) {
		const line = raw.trim();
		if (!line || line.startsWith('>')) continue;

		const match = (/^([$#\p{L}\p{N}_-]+)\^?(?:\s+F)?$/u).exec(line);
		if (!match || RG_CLI_REPLIES.has(match[1])) continue;

		names.add(match[1]);
	}

	return [...names].reverse();
};

const getVoivodeshipScope = code => MESHCORE_REGIONS.voivodeships[code].scope;
const getRegionScopes = region => Array.isArray(region.scope) ? region.scope : [region.scope];
const getAutomaticRegions = codes => Object.values(MESHCORE_REGIONS.localRegions).filter(region => region.automatic && codes.some(code => region.voivodeships.includes(code)));
const getLocalScopes = codes => [...new Set(getAutomaticRegions(codes).flatMap(getRegionScopes))];

const buildTree = (home, city, neighbors) => {
	const codes = [...new Set([home, ...neighbors])];
	const localScopes = getLocalScopes(codes);
	const configuredScopes = new Set([RG_ROOT, ...codes.map(getVoivodeshipScope), ...localScopes]);
	const cityConfig = Object.values(MESHCORE_REGIONS.localRegions).find(region => getRegionScopes(region).includes(city));
	const cityRegion = city && !configuredScopes.has(city) ? [{ name: city, children: [] }] : [];
	const cityAtRoot = cityConfig?.parentScope === RG_ROOT;
	const homeRegion = { name: getVoivodeshipScope(home), children: cityAtRoot ? [] : cityRegion };
	return {
		name: RG_ROOT,
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
	if (setDefault) lines.push(`region default ${RG_ROOT}`);
	lines.push('region');
	return lines;
};

const buildTreePreview = tree => ['*^ F', ...flattenTree(tree).map(({ name, depth }) => `${' '.repeat(depth)}${name} F`)].join('\n');

const channelsForScope = scope => {
	const regions = [MESHCORE_REGIONS.country, ...Object.values(MESHCORE_REGIONS.voivodeships), ...Object.values(MESHCORE_REGIONS.localRegions)]
		.filter(config => getRegionScopes(config).includes(scope));
	const channels = regions.flatMap(region => region.channels.map(channel => ({ channel, scope: region.scope })));
	return channels.length ? channels : [{ channel: 'Brak danych', scope }];
};

const buildChannels = (home, city, neighbors) => {
	const codes = [...new Set([home, ...neighbors])];
	const scopes = [...new Set([RG_ROOT, ...codes.map(getVoivodeshipScope), ...getLocalScopes(codes), ...(city ? [city] : [])])];
	const channels = [...new Map(scopes.flatMap(channelsForScope).map(row => [JSON.stringify(row), row])).values()];
	const commonChannels = MESHCORE_REGIONS.commonChannels.map(channel => {
		const regional = channels.findLast(row => row.channel === channel);
		return regional || { channel, scope: null };
	});

	const regionalChannels = channels.filter(({ channel }) => !MESHCORE_REGIONS.commonChannels.includes(channel));
	return [
		{ channel: 'Public', scope: RG_ROOT },
		...commonChannels,
		...regionalChannels,
	];
};

const validateLocalScope = (city, home) => {
	if (!city) return [];

	const errors = [];
	if (!(/^[a-z0-9]+(-[a-z0-9]+)*$/).test(city)) errors.push('Nazwa regionu może zawierać tylko małe litery, cyfry i myślniki (nie na początku ani na końcu).');
	if (new TextEncoder().encode(city).length > RG_MAX_NAME_BYTES) errors.push(`Nazwa regionu może mieć maksymalnie ${RG_MAX_NAME_BYTES} bajtów.`);

	const voivodeship = Object.values(MESHCORE_REGIONS.voivodeships).find(config => config.scope === city);
	const regions = Object.values(MESHCORE_REGIONS.localRegions).filter(config => getRegionScopes(config).includes(city));
	const belongsToHome = regions.some(region => region.voivodeships.includes(home));

	if (city === RG_ROOT) {
		errors.push(`Nazwa „${city}” jest zarezerwowana dla regionu krajowego.`);
	} else if (voivodeship && !belongsToHome) {
		errors.push(`Nazwa „${city}” jest już zajęta przez województwo ${voivodeship.name}.`);
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

	const regions = Object.values(MESHCORE_REGIONS.localRegions)
		.filter(region => !region.automatic && region.voivodeships.includes(home));
	const regionValue = region => getRegionScopes(region).find(value => value !== getVoivodeshipScope(home)) ?? getRegionScopes(region)[0];

	select.replaceChildren(
		new Option('Brak danych', ''),
		...regions.map(region => new Option(`${region.name} (${getRegionScopes(region).join(', ')})`, regionValue(region))),
		new Option('Własny region...', RG_CUSTOM_SCOPE)
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

	const hint = regions.length
		? 'Lista zawiera niektóre regiony lokalne. Możesz podać też własny region.'
		: 'Brak znanych regionów lokalnych dla tego województwa. W razie potrzeby wybierz „Własny region”.';

	const automaticNames = automaticRegions.map(region => region.name);
	hintElement.textContent = automaticNames.length
		? `${hint} Dodawane automatycznie: ${automaticNames.join(', ')}.`
		: hint;

	updateCustomRegionField();
};

const loadSettings = () => {
	try {
		const settings = JSON.parse(localStorage.getItem(RG_SETTINGS_KEY));
		if (!settings || typeof settings !== 'object' || Array.isArray(settings)) return null;

		const home = typeof settings.home === 'string' && Object.hasOwn(MESHCORE_REGIONS.voivodeships, settings.home)
			? settings.home : Object.keys(MESHCORE_REGIONS.voivodeships)[0];
		const city = typeof settings.city === 'string' ? settings.city.trim().toLowerCase() : '';
		const neighbors = Array.isArray(settings.neighbors) ? settings.neighbors : [];
		return {
			home,
			firmware: ['116', '115', 'old'].includes(settings.firmware) ? settings.firmware : '116',
			city: validateLocalScope(city, home).length ? '' : city,
			neighbors: [...new Set(neighbors.filter(code => MESHCORE_REGIONS.voivodeships[home].neighbors.includes(code)))].slice(0, RG_MAX_NEIGHBORS),
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
			home: document.getElementById('rg-home').value,
			firmware: document.getElementById('rg-fw').value,
			city: getSelectedLocalScope(),
			neighbors: [...document.querySelectorAll('#rg-neighbors input:checked')].map(input => input.value),
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
	container.replaceChildren(...MESHCORE_REGIONS.voivodeships[home].neighbors.map(code => {
		const label = document.createElement('label');
		label.className = 'rg-check';

		const input = document.createElement('input');
		input.type = 'checkbox';
		input.value = code;
		input.checked = checked.has(code);

		const text = document.createElement('span');
		text.textContent = `${MESHCORE_REGIONS.voivodeships[code].name} (${getVoivodeshipScope(code)})`;

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

	const neighbors = [...document.querySelectorAll('#rg-neighbors input:checked')].map(input => input.value);

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

	document.getElementById('rg-tree').textContent = buildTreePreview(tree);

	document.getElementById('rg-channels').replaceChildren(...buildChannels(home, city, neighbors).map(({ channel, scope }) => {
		const tr = document.createElement('tr');
		const optionalScope = channel === 'Public' || MESHCORE_REGIONS.commonChannels.includes(channel);
		[channel, scope, CHANNEL_DESCRIPTIONS[channel] || ''].forEach((value, index) => {
			const td = document.createElement('td');
			if (index === 2) {
				td.textContent = value;
			} else if (value === 'Brak danych') {
				td.textContent = value;
			} else if (value === null) {
				td.textContent = 'Bez regionu';
			} else {
				if (index === 1 && optionalScope) td.append('Bez regionu lub ');
				const values = Array.isArray(value) ? value : [value];
				values.forEach((scopeValue, scopeIndex) => {
					if (scopeIndex) td.append(values.length === 2 ? ' oraz ' : ', ');
					const code = document.createElement('code');
					code.textContent = scopeValue;
					td.append(code);
				});
			}


			tr.append(td);
		});
		return tr;
	}));

	document.getElementById('rg-community-groups').replaceChildren(...[RG_ROOT, home, ...neighbors].map(code => {
		const tr = document.createElement('tr');
		const region = document.createElement('td');
		const config = code === RG_ROOT ? MESHCORE_REGIONS.country : MESHCORE_REGIONS.voivodeships[code];

		const name = code === RG_ROOT ? 'Krajowy' : config.name;
		region.textContent = name.charAt(0).toUpperCase() + name.slice(1);

		const server = document.createElement('td');
		const url = config.discordUrl;
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

if (rgForm && !rgForm.closest('[inert]')) {
	const homeSelect = document.getElementById('rg-home');
	homeSelect.append(...Object.entries(MESHCORE_REGIONS.voivodeships).map(([code, { name, scope }]) => new Option(`${name} (${scope})`, code)));

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

	const settings = loadSettings();
	if (settings) {
		homeSelect.value = settings.home;
		document.getElementById('rg-fw').value = settings.firmware;
		document.getElementById('rg-default').checked = settings.setDefault;
	}
	renderNeighbors(homeSelect.value, settings?.neighbors);
	renderLocalRegions(homeSelect.value, settings?.city);
	limitNeighbors();
	renderOutput();
}

if (rcForm) {
	const renderCleanup = () => {
		const text = document.getElementById('rc-current').value;
		const names = parseCurrentRegions(text);
		document.getElementById('rc-empty').hidden = !text.trim() || names.length > 0;
		document.getElementById('rc-output').hidden = !names.length;
		if (names.length) setCode('rc-commands', [...names.map(name => `region remove ${name}`), 'region save', 'region'].join('\n'));
	};

	rcForm.addEventListener('input', renderCleanup);
	rcForm.addEventListener('submit', event => event.preventDefault());
	renderCleanup();
}
