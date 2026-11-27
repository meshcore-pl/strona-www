export const foldText = text => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replaceAll('ł', 'l');
