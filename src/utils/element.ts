export interface ElementData {
  symbol: string;
  name: string;
  color: number;
  radius: number;
}

export const ELEMENT_DATA: Record<string, ElementData> = {
  H: { symbol: "H", name: "Hydrogen", color: 0xFFFFFF, radius: 1.20 },
  HE: { symbol: "HE", name: "Helium", color: 0xFFC0CB, radius: 1.40 },
  LI: { symbol: "LI", name: "Lithium", color: 0xCC80FF, radius: 1.82 },
  BE: { symbol: "BE", name: "Beryllium", color: 0xC2E100, radius: 1.53 },
  B: { symbol: "B", name: "Boron", color: 0xFFB5B5, radius: 1.92 },
  C: { symbol: "C", name: "Carbon", color: 0x3D3D3D, radius: 1.70 },
  N: { symbol: "N", name: "Nitrogen", color: 0x3050FF, radius: 1.55 },
  O: { symbol: "O", name: "Oxygen", color: 0xFF1111, radius: 1.40 },
  F: { symbol: "F", name: "Fluorine", color: 0x90FF00, radius: 1.33 },
  NE: { symbol: "NE", name: "Neon", color: 0xB3E3F5, radius: 1.38 },
  NA: { symbol: "NA", name: "Sodium", color: 0xAB5CF2, radius: 1.90 },
  MG: { symbol: "MG", name: "Magnesium", color: 0x8AFF00, radius: 1.41 },
  AL: { symbol: "AL", name: "Aluminium", color: 0xBFA6A6, radius: 1.25 },
  SI: { symbol: "SI", name: "Silicon", color: 0xF0C8A0, radius: 1.40 },
  P: { symbol: "P", name: "Phosphorus", color: 0xFF9C00, radius: 1.80 },
  S: { symbol: "S", name: "Sulfur", color: 0xFFFF30, radius: 1.80 },
  CL: { symbol: "CL", name: "Chlorine", color: 0x1FF01F, radius: 1.75 },
  AR: { symbol: "AR", name: "Argon", color: 0x80D1E3, radius: 1.88 },
  K: { symbol: "K", name: "Potassium", color: 0x8F40D4, radius: 2.03 },
  CA: { symbol: "CA", name: "Calcium", color: 0x3DFF00, radius: 1.74 },
  SC: { symbol: "SC", name: "Scandium", color: 0xE6E6E6, radius: 1.84 },
  TI: { symbol: "TI", name: "Titanium", color: 0x909090, radius: 1.76 },
  V: { symbol: "V", name: "Vanadium", color: 0xA6A6AB, radius: 1.71 },
  CR: { symbol: "CR", name: "Chromium", color: 0x8A99C7, radius: 1.66 },
  MN: { symbol: "MN", name: "Manganese", color: 0x9C7AC7, radius: 1.79 },
  NI: { symbol: "NI", name: "Nickel", color: 0x50D050, radius: 1.63 },
  CU: { symbol: "CU", name: "Copper", color: 0xC88033, radius: 1.40 },
  ZN: { symbol: "ZN", name: "Zinc", color: 0x7D80B0, radius: 1.39 },
  GA: { symbol: "GA", name: "Gallium", color: 0xC28F8F, radius: 1.87 },
  GE: { symbol: "GE", name: "Germanium", color: 0x668F8F, radius: 1.51 },
  AS: { symbol: "AS", name: "Arsenic", color: 0xBD80E3, radius: 1.65 },
  SE: { symbol: "SE", name: "Selenium", color: 0xFFA100, radius: 1.90 },
  BR: { symbol: "BR", name: "Bromine", color: 0xA62929, radius: 1.85 },
  KR: { symbol: "KR", name: "Krypton", color: 0x5CB8D1, radius: 2.02 },
  RB: { symbol: "RB", name: "Rubidium", color: 0x702EB0, radius: 2.11 },
  SR: { symbol: "SR", name: "Strontium", color: 0x00FF00, radius: 1.94 },
  Y: { symbol: "Y", name: "Yttrium", color: 0x94FFFF, radius: 1.80 },
  ZR: { symbol: "ZR", name: "Zirconium", color: 0x94E3E3, radius: 1.60 },
  NB: { symbol: "NB", name: "Niobium", color: 0x73C2C9, radius: 1.46 },
  MO: { symbol: "MO", name: "Molybdenum", color: 0x54B5B5, radius: 1.39 },
  TC: { symbol: "TC", name: "Technetium", color: 0x3B9E9E, radius: 1.36 },
  RU: { symbol: "RU", name: "Ruthenium", color: 0x248F8F, radius: 1.34 },
  RH: { symbol: "RH", name: "Rhodium", color: 0x0A7D8C, radius: 1.33 },
  PD: { symbol: "PD", name: "Palladium", color: 0x006985, radius: 1.32 },
  AG: { symbol: "AG", name: "Silver", color: 0xC0C0C0, radius: 1.31 },
  CD: { symbol: "CD", name: "Cadmium", color: 0xFFD98F, radius: 1.30 },
  IN: { symbol: "IN", name: "Indium", color: 0xA67573, radius: 1.66 },
  SN: { symbol: "SN", name: "Tin", color: 0x668080, radius: 1.40 },
  SB: { symbol: "SB", name: "Antimony", color: 0x9E63B5, radius: 1.40 },
  TE: { symbol: "TE", name: "Tellurium", color: 0xD47A00, radius: 1.36 },
  I: { symbol: "I", name: "Iodine", color: 0x9400D3, radius: 1.33 },
  XE: { symbol: "XE", name: "Xenon", color: 0x429EB0, radius: 1.35 },
  CS: { symbol: "CS", name: "Caesium", color: 0x57178F, radius: 2.15 },
  BA: { symbol: "BA", name: "Barium", color: 0x00C900, radius: 1.98 },
  LA: { symbol: "LA", name: "Lanthanum", color: 0x70D4FF, radius: 1.87 },
  CE: { symbol: "CE", name: "Cerium", color: 0xFFFFC7, radius: 1.82 },
  PR: { symbol: "PR", name: "Praseodymium", color: 0xD9FFC7, radius: 1.82 },
  ND: { symbol: "ND", name: "Neodymium", color: 0xC7FFC7, radius: 1.82 },
  PM: { symbol: "PM", name: "Promethium", color: 0xA3FFC7, radius: 1.82 },
  SM: { symbol: "SM", name: "Samarium", color: 0x8FFFC7, radius: 1.82 },
  EU: { symbol: "EU", name: "Europium", color: 0x61FFC7, radius: 1.82 },
  GD: { symbol: "GD", name: "Gadolinium", color: 0x45FFC7, radius: 1.82 },
  TB: { symbol: "TB", name: "Terbium", color: 0x30FFC7, radius: 1.82 },
  DY: { symbol: "DY", name: "Dysprosium", color: 0x1FFFFC7, radius: 1.82 },
  HO: { symbol: "HO", name: "Holmium", color: 0x00FF9C, radius: 1.82 },
  ER: { symbol: "ER", name: "Erbium", color: 0x00E675, radius: 1.82 },
  TM: { symbol: "TM", name: "Thulium", color: 0x00D452, radius: 1.82 },
  YB: { symbol: "YB", name: "Ytterbium", color: 0x00BF38, radius: 1.82 },
  LU: { symbol: "LU", name: "Lutetium", color: 0x00AB24, radius: 1.82 },
  HF: { symbol: "HF", name: "Hafnium", color: 0x4DB2FF, radius: 1.82 },
  TA: { symbol: "TA", name: "Tantalum", color: 0x4DA6FF, radius: 1.82 },
  W: { symbol: "W", name: "Tungsten", color: 0x2194D6, radius: 1.82 },
  RE: { symbol: "RE", name: "Rhenium", color: 0x267DAB, radius: 1.82 },
  OS: { symbol: "OS", name: "Osmium", color: 0x266696, radius: 1.82 },
  IR: { symbol: "IR", name: "Iridium", color: 0x175487, radius: 1.82 },
  PT: { symbol: "PT", name: "Platinum", color: 0xD0D0E0, radius: 1.82 },
  AU: { symbol: "AU", name: "Gold", color: 0xFFD700, radius: 1.82 },
  HG: { symbol: "HG", name: "Mercury", color: 0xB8B8D0, radius: 1.82 },
  TL: { symbol: "TL", name: "Thallium", color: 0xA6544D, radius: 1.82 },
  PB: { symbol: "PB", name: "Lead", color: 0x575961, radius: 1.82 },
  BI: { symbol: "BI", name: "Bismuth", color: 0x9E4FB5, radius: 1.82 },
  PO: { symbol: "PO", name: "Polonium", color: 0xAB5C00, radius: 1.82 },
  AT: { symbol: "AT", name: "Astatine", color: 0x754F45, radius: 1.82 },
  RN: { symbol: "RN", name: "Radon", color: 0x428296, radius: 1.82 },
  FR: { symbol: "FR", name: "Francium", color: 0x420066, radius: 1.82 },
  RA: { symbol: "RA", name: "Radium", color: 0x007D00, radius: 1.82 },
  AC: { symbol: "AC", name: "Actinium", color: 0x70ABFA, radius: 1.82 },
  TH: { symbol: "TH", name: "Thorium", color: 0x00BAFF, radius: 1.82 },
  PA: { symbol: "PA", name: "Protactinium", color: 0x00A1FF, radius: 1.82 },
  U: { symbol: "U", name: "Uranium", color: 0x008FFF, radius: 1.82 },
  NP: { symbol: "NP", name: "Neptunium", color: 0x0080FF, radius: 1.82 },
  PU: { symbol: "PU", name: "Plutonium", color: 0x006BFF, radius: 1.82 },
  AM: { symbol: "AM", name: "Americium", color: 0x545CF2, radius: 1.82 },
  CM: { symbol: "CM", name: "Curium", color: 0x785CE3, radius: 1.82 },
  BK: { symbol: "BK", name: "Berkelium", color: 0x8A4FE3, radius: 1.82 },
  CF: { symbol: "CF", name: "Californium", color: 0xA136D4, radius: 1.82 },
  ES: { symbol: "ES", name: "Einsteinium", color: 0xB31FD4, radius: 1.82 },
  FM: { symbol: "FM", name: "Fermium", color: 0xB31FBA, radius: 1.82 },
  MD: { symbol: "MD", name: "Mendelevium", color: 0xB30DA6, radius: 1.82 },
  NO: { symbol: "NO", name: "Nobelium", color: 0xBD0D87, radius: 1.82 },
  LR: { symbol: "LR", name: "Lawrencium", color: 0xC70066, radius: 1.82 },
  RF: { symbol: "RF", name: "Rutherfordium", color: 0xCC0059, radius: 1.82 },
  DB: { symbol: "DB", name: "Dubnium", color: 0xD1004F, radius: 1.82 },
  SG: { symbol: "SG", name: "Seaborgium", color: 0xD90045, radius: 1.82 },
  BH: { symbol: "BH", name: "Bohrium", color: 0xE00038, radius: 1.82 },
  HS: { symbol: "HS", name: "Hassium", color: 0xE6002E, radius: 1.82 },
  MT: { symbol: "MT", name: "Meitnerium", color: 0xEB0024, radius: 1.82 },
  DS: { symbol: "DS", name: "Darmstadtium", color: 0xFF001F, radius: 1.82 },
  RG: { symbol: "RG", name: "Roentgenium", color: 0xFF001F, radius: 1.82 },
  CN: { symbol: "CN", name: "Copernicium", color: 0xFF001F, radius: 1.82 },
  NH: { symbol: "NH", name: "Nihonium", color: 0xFF001F, radius: 1.82 },
  FL: { symbol: "FL", name: "Flerovium", color: 0xFF001F, radius: 1.82 },
  MC: { symbol: "MC", name: "Moscovium", color: 0xFF001F, radius: 1.82 },
  LV: { symbol: "LV", name: "Livermorium", color: 0xFF001F, radius: 1.82 },
  TS: { symbol: "TS", name: "Tennessine", color: 0xFF001F, radius: 1.82 },
  OG: { symbol: "OG", name: "Oganesson", color: 0xFF001F, radius: 1.82 }
};

// Helper Map 
export const ELEMENT_BY_NAME: Record<string, ElementData> = Object.values(ELEMENT_DATA).reduce((acc, el) => {
  acc[el.name.toUpperCase()] = el;
  return acc;
}, {} as Record<string, ElementData>);

// Getter logic
export const getElementInfo = (query: string): ElementData | undefined => {
  const q = query.toUpperCase();
  return ELEMENT_DATA[q] || ELEMENT_BY_NAME[q];
};

// Radius logic
export const getElementRadius = (query: string): number => {
  const info = getElementInfo(query);
  return info ? info.radius : 1.5; 
}