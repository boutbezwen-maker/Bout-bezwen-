export type ProductCategory = 'gaming' | 'timoun' | 'granmoun';

export type ArtworkVariant =
  | 'gamepad'
  | 'gaming_headset'
  | 'phone_trigger'
  | 'phone_viseur'
  | 'hdmi_cable'
  | 'bluetooth_headphones'
  | 'fast_charger'
  | 'perfume_adult'
  | 'sandals_adult'
  | 'outfit_adult'
  | 'outfit_kids'
  | 'sandals_kids'
  | 'perfume_kids';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  catLabel: string;
  artwork: ArtworkVariant;
  hasSize: boolean;
  sizes?: string[];
  description: string;
  specs: string[];
  availability: string;
}

export const MERCHANT_NATCASH_DISPLAY = '+509 4037-2842';
export const MERCHANT_NATCASH_COPY = '40372842';
export const MERCHANT_WHATSAPP_NUMBER = '50940372842';

export const CATEGORY_TABS: { id: 'tout' | ProductCategory; label: string }[] = [
  { id: 'tout', label: 'Tout Pwodwi' },
  { id: 'gaming', label: 'Gaming & Telefòn' },
  { id: 'timoun', label: 'Timoun' },
  { id: 'granmoun', label: 'Granmoun' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    category: 'gaming',
    catLabel: 'Gaming',
    name: 'Manette Gaming',
    price: 3000,
    artwork: 'gamepad',
    hasSize: false,
    description:
      'Manèt san fil ergonomik ak doub joystick presi ak vibrasyon pou telefòn, PC, ak konsòl.',
    specs: ['Koneksyon Bluetooth + USB-C', 'Doub motè vibrasyon', 'Batri rechajab ki dire lontan'],
    availability: 'Nan estòk',
  },
  {
    id: 2,
    category: 'gaming',
    catLabel: 'Gaming',
    name: 'Casque Gaming Pro',
    price: 2800,
    artwork: 'gaming_headset',
    hasSize: false,
    description:
      'Kas gaming pwofesyonèl ak son stereo klè ak mikwo fleksib ki redui bri pou jwèt anliy.',
    specs: ['Kousinen konfòtab ki izole bri', 'Mikwo klè pou chat ekip', 'Kab trese solid ak adaptè 3.5mm'],
    availability: 'Nan estòk',
  },
  {
    id: 3,
    category: 'gaming',
    catLabel: 'Gaming',
    name: 'Analogue pou Telefòn',
    price: 1000,
    artwork: 'phone_trigger',
    hasSize: false,
    description:
      'Joystick analòg ki kole sou ekran telefòn pou kontwole mouvman nan PUBG, Free Fire, ak Call of Duty Mobile.',
    specs: ['Fasil pou mete ak retire', 'Pa grate ekran telefòn lan', 'Konpatib tout telefòn'],
    availability: 'Nan estòk',
  },
  {
    id: 4,
    category: 'gaming',
    catLabel: 'Gaming',
    name: 'Viseur pou Telefòn',
    price: 850,
    artwork: 'phone_viseur',
    hasSize: false,
    description:
      'Bouton L1/R1 rapid pou tire ak vize vit sou telefòn san lag ak klip solid ki pa glise.',
    specs: ['Repons mekanik rapid', 'Ajiste sou telefòn ak kòk', 'Lejè epi fasil pou pote'],
    availability: 'Nan estòk',
  },
  {
    id: 5,
    category: 'gaming',
    catLabel: 'Gaming',
    name: 'HDMI Portable',
    price: 1500,
    artwork: 'hdmi_cable',
    hasSize: false,
    description:
      'Kab HDMI pòtab pou konekte telefòn, laptop, oswa konsòl ou dirèkteman sou televizyon ak pwojektè.',
    specs: ['Kalite imaj Full HD / 4K', 'Konektè metal solid', 'Plug & Play san aplikasyon'],
    availability: 'Nan estòk',
  },
  {
    id: 6,
    category: 'gaming',
    catLabel: 'Audio',
    name: 'Casque Bluetooth',
    price: 2000,
    artwork: 'bluetooth_headphones',
    hasSize: false,
    description:
      'Kas Bluetooth san fil ak bas pwofon ak batri ki kenbe pou mizik, fim, ak apèl telefòn.',
    specs: ['Bluetooth 5.3 rapid', 'Otonomi plis pase 20 èdtan', 'Pliable pou pote nan sak'],
    availability: 'Nan estòk',
  },
  {
    id: 7,
    category: 'gaming',
    catLabel: 'Telefòn',
    name: 'Charger Telefòn Fast Charge',
    price: 1200,
    artwork: 'fast_charger',
    hasSize: false,
    description:
      'Chajè rapid USB-C ki bay telefòn ou chaj vit an sekirite san l pa chofe batri a.',
    specs: ['Chaj rapid 25W–30W', 'Pwoteksyon kont kouran wo', 'Kab USB-C solid enkli'],
    availability: 'Nan estòk',
  },
  {
    id: 8,
    category: 'granmoun',
    catLabel: 'Granmoun',
    name: 'Parfum Granmoun (100ml)',
    price: 3200,
    artwork: 'perfume_adult',
    hasSize: false,
    description:
      'Pafen liks 100ml ak odè rafine ki kenbe sou po w ak rad ou depi maten jis aswè.',
    specs: ['Boutèy vè epè 100ml', 'Odè entans ki dire lontan', 'Pafè pou sòti ak okazyon espesyal'],
    availability: 'Nan estòk',
  },
  {
    id: 9,
    category: 'granmoun',
    catLabel: 'Granmoun',
    name: 'Sandal Granmoun',
    price: 1800,
    artwork: 'sandals_adult',
    hasSize: true,
    sizes: ['39', '40', '41', '42', '43', '44'],
    description:
      'Sandal konfòtab ak semèl epè ki pa glise pou lakay, plaj, oswa mache chak jou.',
    specs: ['Semèl mou anti-glise', 'Materyèl rezistan a dlo', 'Gwosè 39 rive 44'],
    availability: 'Nan estòk',
  },
  {
    id: 10,
    category: 'granmoun',
    catLabel: 'Granmoun',
    name: 'Rad Granmoun (Ensemble)',
    price: 2200,
    artwork: 'outfit_adult',
    hasSize: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Ansanm mayo ak chòt an koton mou ki fre pou klima Ayiti a ak yon koupe modèn.',
    specs: ['Twal koton kalite siperyè', 'Koupe konfòtab pou tout jounen', 'Gwosè S rive XXL'],
    availability: 'Nan estòk',
  },
  {
    id: 11,
    category: 'timoun',
    catLabel: 'Timoun',
    name: 'Rad Timoun (Ensemble)',
    price: 1500,
    artwork: 'outfit_kids',
    hasSize: true,
    sizes: ['2-3 an', '4-5 an', '6-7 an', '8-10 an'],
    description:
      'Ansanm rad timoun fre ak solid ki fèt ak koton dou pou po timoun ak bèl koulè vivan.',
    specs: ['Koton dou ki respire', 'Kouti solid pou jwe', 'Laj 2 an rive 10 an'],
    availability: 'Nan estòk',
  },
  {
    id: 12,
    category: 'timoun',
    catLabel: 'Timoun',
    name: 'Sandal Timoun',
    price: 1100,
    artwork: 'sandals_kids',
    hasSize: true,
    sizes: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37'],
    description:
      'Sandal lejè pou timoun ak senti sekirite ak semèl anti-glise pou yo kouri alèz.',
    specs: ['Senti fasil pou mare', 'Semèl lejè ki pa glise', 'Gwosè 28 rive 37'],
    availability: 'Nan estòk',
  },
  {
    id: 13,
    category: 'timoun',
    catLabel: 'Timoun',
    name: 'Parfum Timoun (Doux)',
    price: 1300,
    artwork: 'perfume_kids',
    hasSize: false,
    description:
      'Pafen dous ak frèchès lejè ki fèt espesyalman pou timoun san okenn odè ki fò.',
    specs: ['Fòmil dous san alkòl fò', 'Odè pwòp ak fre', 'Boutèy sekirize pou timoun'],
    availability: 'Nan estòk',
  },
];

export function formatHTG(amount: number): string {
  return `${amount.toLocaleString('en-US')} HTG`;
}
