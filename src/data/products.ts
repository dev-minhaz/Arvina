export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Outerwear' | 'Tops' | 'Bottoms' | 'Bags' | 'Footwear' | 'Accessories' | 'Dresses';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  description: string;
  fabric: string;
  fit: string;
  care: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
  sku: string;
  pairingProductIds?: string[];
  reviews: Review[];
}

export interface CategoryCircle {
  id: string;
  name: string;
  image?: string;
  isSale?: boolean;
  count: number;
  badge?: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36 },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52 },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.0 },
};

export const CATEGORY_CIRCLES: CategoryCircle[] = [
  {
    id: 'women',
    name: 'Women',
    image: '/src/assets/images/prod_linen_blazer_1791555607097.jpg',
    count: 64,
  },
  {
    id: 'men',
    name: 'Men',
    image: '/src/assets/images/cat_mens_collection_1791555457090.jpg',
    count: 42,
  },
  {
    id: 'dresses',
    name: 'Dresses',
    image: '/src/assets/images/cat_dresses_collection_1791555469714.jpg',
    count: 38,
  },
  {
    id: 'tops',
    name: 'Tops',
    image: '/src/assets/images/prod_ribbed_top_1791555649475.jpg',
    count: 51,
  },
  {
    id: 'shoes',
    name: 'Shoes',
    image: '/src/assets/images/prod_strappy_heels_1791555681618.jpg',
    count: 29,
  },
  {
    id: 'bags',
    name: 'Bags',
    image: '/src/assets/images/prod_leather_bag_1791555670968.jpg',
    count: 24,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/src/assets/images/prod_sunglasses_1791555692169.jpg',
    count: 33,
  },
  {
    id: 'sale',
    name: 'Sale',
    isSale: true,
    count: 48,
    badge: 'Up to 50% Off',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Linen Blend Blazer',
    category: 'Outerwear',
    price: 89.99,
    originalPrice: 120.0,
    rating: 5.0,
    reviewsCount: 124,
    image: '/src/assets/images/prod_linen_blazer_1791555607097.jpg',
    secondaryImage: '/src/assets/images/hero_blazer_model_1791555424939.jpg',
    badge: 'Bestseller',
    sku: 'ARV-OUT-019',
    description:
      'A relaxed yet structured single-breasted blazer woven from European flax linen and soft breathable viscose. Designed with notch lapels, horn buttons, interior satin binding, and an effortless drape suited for all climates.',
    fabric: '55% European Flax Linen, 45% Viscose. Lining: 100% Cotton voile.',
    fit: 'Relaxed tailored silhouette. Hits at the lower hip. True to size for intentional slight oversized styling.',
    care: 'Dry clean only or delicate cold hand wash. Low heat iron on reverse side.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Sand', hex: '#D7C4B0' },
      { name: 'Oatmeal', hex: '#EAE4DC' },
      { name: 'Noir', hex: '#1C1A18' },
    ],
    inStock: true,
    featured: true,
    pairingProductIds: ['prod-3', 'prod-4', 'prod-6'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Camille R.',
        location: 'New York, NY',
        rating: 5,
        date: 'March 24, 2026',
        title: 'The holy grail of blazers',
        comment:
          'The drape on this is unmatched. It feels like an archival designer jacket without the four-figure price tag. It transitions seamlessly from gallery meetings to evening dinners.',
        verified: true,
        sizePurchased: 'S',
      },
      {
        id: 'rev-2',
        author: 'Eleanor V.',
        location: 'London, UK',
        rating: 5,
        date: 'March 18, 2026',
        title: 'Exquisite linen quality',
        comment:
          'Substantial weight, zero cheap synthetic stiffness. The sand tone is luminous and pairs effortlessly with crisp white denim or matching trousers.',
        verified: true,
        sizePurchased: 'M',
      },
    ],
  },
  {
    id: 'prod-2',
    name: 'Ribbed Knit Top',
    category: 'Tops',
    price: 29.99,
    originalPrice: 38.0,
    rating: 4.9,
    reviewsCount: 98,
    image: '/src/assets/images/prod_ribbed_top_1791555649475.jpg',
    badge: 'Essential',
    sku: 'ARV-TOP-004',
    description:
      'Ultra-soft micro-ribbed cap-sleeve tee crafted from modal and combed organic cotton. Features a clean boatneck collar, sculpted second-skin contour, and seamless flatlock stitching.',
    fabric: '62% Modal, 34% Organic Combed Cotton, 4% Elastane.',
    fit: 'Slim contour silhouette with flattering recovery stretch.',
    care: 'Machine wash cold on gentle cycle. Lay flat to dry.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pure Noir', hex: '#111010' },
      { name: 'Chalk White', hex: '#FAF8F5' },
      { name: 'Muted Espresso', hex: '#3B332F' },
    ],
    inStock: true,
    featured: true,
    pairingProductIds: ['prod-1', 'prod-3', 'prod-5'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Sora K.',
        location: 'Tokyo, JP',
        rating: 5,
        date: 'March 20, 2026',
        title: 'Perfect neckline and recovery',
        comment: 'Holds its shape wash after wash. The modal blend feels like cashmere against the skin.',
        verified: true,
        sizePurchased: 'XS',
      },
    ],
  },
  {
    id: 'prod-3',
    name: 'Wide Leg Trousers',
    category: 'Bottoms',
    price: 59.99,
    originalPrice: 78.0,
    rating: 4.8,
    reviewsCount: 76,
    image: '/src/assets/images/prod_wide_trousers_1791555661352.jpg',
    secondaryImage: '/src/assets/images/cat_womens_collection_1791555446091.jpg',
    badge: 'Signature',
    sku: 'ARV-BOT-011',
    description:
      'High-waisted tailored trousers featuring deep inverted pleats, angled side slash pockets, blind hem finish, and an elongated fluid wide leg that glides with every stride.',
    fabric: '70% Wool blend gabardine, 30% Lyocell.',
    fit: 'High rise, generous wide leg. Inseam 32 inches.',
    care: 'Dry clean recommended. Cool iron.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: [
      { name: 'Ivory Cream', hex: '#EDE6DA' },
      { name: 'Camel Tan', hex: '#C29B72' },
      { name: 'Black Onyx', hex: '#181716' },
    ],
    inStock: true,
    featured: true,
    pairingProductIds: ['prod-1', 'prod-2', 'prod-5'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Elena M.',
        location: 'Milan, Italy',
        rating: 5,
        date: 'March 15, 2026',
        title: 'Elongating and regal',
        comment: 'The pleat placement creates the longest silhouette. Received countless compliments at the studio.',
        verified: true,
        sizePurchased: '28',
      },
    ],
  },
  {
    id: 'prod-4',
    name: 'Leather Shoulder Bag',
    category: 'Bags',
    price: 79.99,
    originalPrice: 110.0,
    rating: 5.0,
    reviewsCount: 112,
    image: '/src/assets/images/prod_leather_bag_1791555670968.jpg',
    secondaryImage: '/src/assets/images/cat_accessories_bag_1791555481939.jpg',
    badge: 'Handcrafted',
    sku: 'ARV-BAG-008',
    description:
      'Structured tote in pebble-grained Italian calfskin with dual reinforced top handles, subtle foiled logo, golden brass hardware, and a suede-lined split compartment.',
    fabric: '100% Full-grain calf leather. Interior: Soft microfiber suede.',
    fit: 'Dimensions: 13.5" W x 10.5" H x 5" D. Fits 13" laptop & tablet comfortably.',
    care: 'Wipe clean with soft microfiber cloth. Condition annually with leather balm.',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac Saddle', hex: '#A25F2E' },
      { name: 'Trench Beige', hex: '#D6C6B2' },
      { name: 'Midnight Black', hex: '#171717' },
    ],
    inStock: true,
    featured: true,
    pairingProductIds: ['prod-1', 'prod-6', 'prod-5'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Hannah G.',
        location: 'Toronto, Canada',
        rating: 5,
        date: 'March 27, 2026',
        title: 'My everyday signature tote',
        comment: 'Leather smells incredible, fits my laptop, and maintains its architectural shape effortlessly.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-5',
    name: 'Minimal Strappy Heels',
    category: 'Footwear',
    price: 49.99,
    originalPrice: 65.0,
    rating: 4.7,
    reviewsCount: 64,
    image: '/src/assets/images/prod_strappy_heels_1791555681618.jpg',
    badge: 'Trending',
    sku: 'ARV-SHOE-003',
    description:
      'Architectural stiletto sandals with delicate asymmetric straps, memory-foam insole cushioning, square open toe, and an adjustable buckle ankle restraint.',
    fabric: 'Upper: Premium smooth nappa leather. Sole: Flexible rubber composite.',
    fit: 'Heel height: 85mm (3.3 inches). Padded footbed. True to EU sizing.',
    care: 'Store in protective dust bag provided. Clean with damp leather sponge.',
    sizes: ['36 EU (6 US)', '37 EU (7 US)', '38 EU (8 US)', '39 EU (9 US)', '40 EU (10 US)'],
    colors: [
      { name: 'Nappa Black', hex: '#121212' },
      { name: 'Nude Almond', hex: '#DECAA9' },
    ],
    inStock: true,
    featured: true,
    pairingProductIds: ['prod-7', 'prod-4'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Sabrina T.',
        location: 'Paris, France',
        rating: 5,
        date: 'March 11, 2026',
        title: 'Comfortable 85mm height',
        comment: 'The cushioned insole makes these wearable for entire 6-hour gala evenings without discomfort.',
        verified: true,
        sizePurchased: '38 EU (8 US)',
      },
    ],
  },
  {
    id: 'prod-6',
    name: 'Oversized Sunglasses',
    category: 'Accessories',
    price: 19.99,
    originalPrice: 32.0,
    rating: 4.9,
    reviewsCount: 53,
    image: '/src/assets/images/prod_sunglasses_1791555692169.jpg',
    badge: 'UV400',
    sku: 'ARV-ACC-015',
    description:
      'Bold square statement frames molded in hand-polished cellulose acetate. Fitted with category 3 scratch-resistant lenses for complete UV protection.',
    fabric: 'Handmade Italian cellulose acetate. 100% UVA/UVB gradient lenses.',
    fit: 'Lens width: 54mm, Bridge: 18mm, Temple: 145mm. Universal optical fit.',
    care: 'Clean with included microfiber cloth. Keep in custom Arvina hardcase.',
    sizes: ['One Size'],
    colors: [
      { name: 'Dark Tortoise', hex: '#4B3728' },
      { name: 'Gloss Noir', hex: '#151515' },
      { name: 'Honey Amber', hex: '#B57C3D' },
    ],
    inStock: true,
    featured: true,
    pairingProductIds: ['prod-1', 'prod-8'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Vivian L.',
        location: 'San Francisco, CA',
        rating: 5,
        date: 'March 22, 2026',
        title: 'Instant movie-star presence',
        comment: 'Weighty, high quality, zero optical distortion. The tortoiseshell pattern has deep, rich flecks.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-7',
    name: 'Satin Wrap Midi Dress',
    category: 'Dresses',
    price: 110.0,
    originalPrice: 145.0,
    rating: 4.9,
    reviewsCount: 88,
    image: '/src/assets/images/cat_dresses_collection_1791555469714.jpg',
    badge: 'New Arrival',
    sku: 'ARV-DRS-022',
    description:
      'Cut from heavy hammered satin with a fluid, liquid drape. Features a self-tying waist belt, soft bishop sleeves, and a deep graceful V-neckline designed for confidence and movement.',
    fabric: '100% Recycled hammered silk-touch satin.',
    fit: 'Midi length. Fully adjustable wrap tie waist. Fits true to size.',
    care: 'Hand wash cold or gentle dry clean. Steam on low heat.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Noir', hex: '#161616' },
      { name: 'Champagne Sand', hex: '#E6D9C8' },
    ],
    inStock: true,
    featured: false,
    pairingProductIds: ['prod-5', 'prod-4', 'prod-6'],
    reviews: [
      {
        id: 'rev-8',
        author: 'Genevieve B.',
        location: 'Chicago, IL',
        rating: 5,
        date: 'March 09, 2026',
        title: 'Pure liquid luxury',
        comment: 'Drapes like a dream. The fabric does not cling and catches ambient light with an understated luster.',
        verified: true,
        sizePurchased: 'M',
      },
    ],
  },
  {
    id: 'prod-8',
    name: 'Classic Trench Overcoat',
    category: 'Outerwear',
    price: 135.0,
    originalPrice: 180.0,
    rating: 5.0,
    reviewsCount: 142,
    image: '/src/assets/images/editorial_trench_spring_1791555493745.jpg',
    badge: 'Iconic Edit',
    sku: 'ARV-OUT-002',
    description:
      'Double-breasted water-resistant cotton twill trench coat with epaulettes, buckled storm collar, belted waist, and horn buckle hardware. A year-round wardrobe cornerstone.',
    fabric: '100% Compact organic cotton twill. Water-repellent finish.',
    fit: 'Classic tailored trench fit. Hits below the knee.',
    care: 'Dry clean only. Reproof water repellent annually.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Classic Khaki', hex: '#C2B198' },
      { name: 'Oatmeal Taupe', hex: '#DED6CA' },
    ],
    inStock: true,
    featured: false,
    pairingProductIds: ['prod-2', 'prod-3', 'prod-6'],
    reviews: [
      {
        id: 'rev-9',
        author: 'Clara D.',
        location: 'Boston, MA',
        rating: 5,
        date: 'March 03, 2026',
        title: 'Timeless investment piece',
        comment: 'The storm flap and belt hardware are heirloom quality. Kept me dry during an unexpected spring downpour.',
        verified: true,
        sizePurchased: 'S',
      },
    ],
  },
  {
    id: 'prod-9',
    name: 'Tailored Suede Overshirt',
    category: 'Outerwear',
    price: 125.0,
    originalPrice: 160.0,
    rating: 4.9,
    reviewsCount: 47,
    image: '/src/assets/images/cat_mens_collection_1791555457090.jpg',
    badge: 'Modern Classic',
    sku: 'ARV-MEN-007',
    description:
      'Unstructured overshirt jacket in velvety vegan micro-suede. Features brass snap buttons, twin flap chest pockets, and a clean point collar. Engineered for effortless layering.',
    fabric: '100% Technical Micro-Suede. Soft cotton interior yoke.',
    fit: 'Straight modern cut. Layer over tees or fine gauge knits.',
    care: 'Specialist suede dry clean or gentle brush with suede brush.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Rich Tobacco', hex: '#8B5A2B' },
      { name: 'Espresso Bean', hex: '#3B2F2F' },
    ],
    inStock: true,
    featured: false,
    pairingProductIds: ['prod-6'],
    reviews: [
      {
        id: 'rev-10',
        author: 'Marcus H.',
        location: 'Seattle, WA',
        rating: 5,
        date: 'March 14, 2026',
        title: 'Subtle luxury at its finest',
        comment: 'Incredible texture. Fits tailored in the shoulders without restricting movement.',
        verified: true,
        sizePurchased: 'L',
      },
    ],
  },
  {
    id: 'prod-10',
    name: 'Relaxed Ivory Linen Suit',
    category: 'Outerwear',
    price: 165.0,
    originalPrice: 210.0,
    rating: 5.0,
    reviewsCount: 61,
    image: '/src/assets/images/cat_womens_collection_1791555446091.jpg',
    badge: 'Limited Run',
    sku: 'ARV-SET-001',
    description:
      'Two-piece relaxed suit consisting of an unstructured oversized blazer and flowing wide-leg trousers crafted from pre-washed Normandy flax linen.',
    fabric: '100% Normandy Flax Linen. Pre-shrunk finish.',
    fit: 'Relaxed loungewear-inspired tailoring.',
    care: 'Cold gentle wash. Line dry in shade.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Natural', hex: '#F0ECE1' },
      { name: 'Desert Sand', hex: '#D2C2AD' },
    ],
    inStock: true,
    featured: false,
    pairingProductIds: ['prod-4', 'prod-6'],
    reviews: [
      {
        id: 'rev-11',
        author: 'Isolde W.',
        location: 'Vienna, Austria',
        rating: 5,
        date: 'March 29, 2026',
        title: 'Unbelievably chic',
        comment: 'Wearing this feels like being transported to the Amalfi coast. Effortless luxury.',
        verified: true,
        sizePurchased: 'S',
      },
    ],
  },
];

export const TRUST_FEATURES = [
  {
    id: 'shipping',
    title: 'FREE SHIPPING',
    subtitle: 'On orders over $99',
    icon: 'truck',
  },
  {
    id: 'returns',
    title: 'EASY RETURNS',
    subtitle: '30-day window',
    icon: 'refresh',
  },
  {
    id: 'payment',
    title: 'SECURE PAYMENT',
    subtitle: '100% protected',
    icon: 'shield',
  },
  {
    id: 'support',
    title: '24/7 SUPPORT',
    subtitle: "We're here to help",
    icon: 'headset',
  },
];

export const LOOKBOOK_STORIES = [
  {
    id: 'look-1',
    chapter: 'Chapter 01',
    title: 'The Spring Tailoring Edit',
    subtitle: 'Crisp lines, breathable linens, and effortless monochromatic suiting crafted for daytime warmth.',
    image: '/src/assets/images/cat_womens_collection_1791555446091.jpg',
    featuredProduct: 'Relaxed Ivory Linen Suit',
    productId: 'prod-10',
    hotspots: [
      { x: 50, y: 35, title: 'Unstructured Linen Blazer', price: '$89.99', id: 'prod-1' },
      { x: 42, y: 75, title: 'Relaxed Pleated Trousers', price: '$59.99', id: 'prod-3' },
    ],
  },
  {
    id: 'look-2',
    chapter: 'Chapter 02',
    title: 'Modern Architecture in Silk',
    subtitle: 'Fluid silhouettes for gallery vernissages, quiet cocktail rooftops, and evening galas.',
    image: '/src/assets/images/cat_dresses_collection_1791555469714.jpg',
    featuredProduct: 'Satin Wrap Midi Dress',
    productId: 'prod-7',
    hotspots: [
      { x: 48, y: 40, title: 'Heavy Hammered Satin Wrap Dress', price: '$110.00', id: 'prod-7' },
    ],
  },
  {
    id: 'look-3',
    chapter: 'Chapter 03',
    title: 'Structured Essentials',
    subtitle: 'Hand-finished Tuscan calfskin and statement tortoiseshell eyewear: the finishing signatures.',
    image: '/src/assets/images/cat_accessories_bag_1791555481939.jpg',
    featuredProduct: 'Leather Shoulder Bag',
    productId: 'prod-4',
    hotspots: [
      { x: 52, y: 60, title: 'Italian Calfskin Shoulder Tote', price: '$79.99', id: 'prod-4' },
      { x: 48, y: 20, title: 'Minimalist Gold Cuff & Rings', price: '$45.00', id: 'prod-6' },
    ],
  },
  {
    id: 'look-4',
    chapter: 'Chapter 04',
    title: 'The Modern Trench Persona',
    subtitle: 'Double-breasted water-repellent protection engineered for cosmopolitan mornings.',
    image: '/src/assets/images/editorial_trench_spring_1791555493745.jpg',
    featuredProduct: 'Classic Trench Overcoat',
    productId: 'prod-8',
    hotspots: [
      { x: 50, y: 45, title: 'Organic Cotton Twill Trench', price: '$135.00', id: 'prod-8' },
      { x: 50, y: 15, title: 'Acetate Sunglasses', price: '$19.99', id: 'prod-6' },
    ],
  },
];

export const FAQS = [
  {
    category: 'Orders & Shipping',
    question: 'How long does standard and express shipping take?',
    answer:
      'We offer complimentary worldwide standard express shipping on all orders over $99 (typically 2-4 business days within North America and Europe). Standard shipping for orders under $99 is a flat $12. Overnight priority express is also available at checkout for $25.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Can I track my order in real-time?',
    answer:
      'Yes. As soon as your parcel departs our atelier, you will receive a tracking link via email and SMS. You can also track your shipment anytime directly on our website using the VIP & Order Tracking portal in your account menu.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return window from the delivery date for all unworn garments with original tags attached. Returns within the US and EU include complimentary prepaid return shipping labels.',
  },
  {
    category: 'Sizing & Materials',
    question: 'Where are Arvina garments produced?',
    answer:
      'Our garments are sustainably produced across family-owned ateliers in Portugal, Northern Italy, and Turkey. We exclusively source OEKO-TEX certified European flax linen, GOTS certified organic cotton, and vegetable-tanned leather from certified tanneries.',
  },
  {
    category: 'Sizing & Materials',
    question: 'How do I choose the correct size?',
    answer:
      'Please consult our interactive Size & Fit Guide with international conversions (US, UK, EU, IT, JP) and garment measurements. If you are between sizes or seeking specific drape advice, our concierge is available 24/7 via live chat.',
  },
];

export const SIZE_CHART = [
  { size: 'XS', us: '0 - 2', uk: '4 - 6', eu: '32 - 34', bustIn: '31 - 32"', bustCm: '79 - 82cm', waistIn: '24 - 25"', waistCm: '61 - 64cm', hipIn: '34 - 35"', hipCm: '86 - 89cm' },
  { size: 'S', us: '4 - 6', uk: '8 - 10', eu: '36 - 38', bustIn: '33 - 34"', bustCm: '84 - 87cm', waistIn: '26 - 27"', waistCm: '66 - 69cm', hipIn: '36 - 37"', hipCm: '91 - 94cm' },
  { size: 'M', us: '8 - 10', uk: '12 - 14', eu: '40 - 42', bustIn: '35 - 37"', bustCm: '89 - 94cm', waistIn: '28 - 30"', waistCm: '71 - 76cm', hipIn: '38 - 40"', hipCm: '97 - 102cm' },
  { size: 'L', us: '12 - 14', uk: '16 - 18', eu: '44 - 46', bustIn: '38 - 40"', bustCm: '97 - 102cm', waistIn: '31 - 33"', waistCm: '79 - 84cm', hipIn: '41 - 43"', hipCm: '104 - 109cm' },
  { size: 'XL', us: '16', uk: '20', eu: '48', bustIn: '41 - 43"', bustCm: '104 - 109cm', waistIn: '34 - 36"', waistCm: '86 - 91cm', hipIn: '44 - 46"', hipCm: '112 - 117cm' },
];
