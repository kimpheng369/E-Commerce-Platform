/* ==========================================================================
   AURA E-COMMERCE PLATFORM - REACT DATA & CONFIGURATION
   ========================================================================== */

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, name: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP (£)' }
};

export const COUPONS = {
  'AURAFUTURE': { discountPercent: 15, description: '15% Off Your Entire Order' },
  'FREESHIP': { freeShipping: true, description: 'Free Express Priority Shipping' },
  'SAVE50': { discountAmount: 50, minOrder: 250, description: '$50 Off Orders Over $250' }
};

export const PRODUCTS = [
  {
    id: 'aura-pulse-pro',
    name: 'AURA Pulse Pro Wireless ANC',
    category: 'audio',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewCount: 184,
    badge: 'BESTSELLER',
    stock: 6,
    description: 'Ultra-low latency lossless planar magnetic headphones with neural active noise cancellation, custom beryllium drivers, and 60-hour spatial battery playback.',
    specs: {
      'Driver Type': '50mm Planar Magnetic',
      'Battery Life': '60 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.4, Ultra-Wideband & USB-C DAC',
      'Weight': '295g Aerospace Aluminum',
      'Frequency Response': '5Hz - 45,000Hz'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#1e2022', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Moonlight Silver', hex: '#d1d5db', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Midnight Violet', hex: '#6b21a8', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'chronos-v-smartwatch',
    name: 'Chronos V Titanium Smartwatch',
    category: 'wearables',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewCount: 96,
    badge: 'NEW DROP',
    stock: 9,
    description: 'Forged Grade 5 titanium chassis featuring sapphire crystal, continuous ECG & SpO2 tracking, dual-frequency multi-satellite GPS, and 14-day battery reserve.',
    specs: {
      'Case Material': 'Grade 5 Brushed Titanium',
      'Display': '1.43" Ultra-Bright AMOLED (2000 nits)',
      'Water Resistance': '10 ATM (100m Submersible)',
      'Sensors': 'Optical Biometric ECG, Temp, SpO2, Barometer',
      'Battery': '14 Days Standard / 48hr Full GPS'
    },
    colors: [
      { name: 'Titanium Gray', hex: '#64748b', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
      { name: 'Space Black', hex: '#0f172a', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'lumina-ambient-sphere',
    name: 'Lumina Dynamic Ambient Lamp',
    category: 'smart-home',
    price: 189,
    originalPrice: 229,
    rating: 4.7,
    reviewCount: 64,
    badge: 'SALE',
    stock: 14,
    description: 'Algorithmic circadian ambient luminaire with 16 million synchronized colors, sound-reactive fluid light mapping, and native HomeKit / Matter smart integration.',
    specs: {
      'Luminance': '1200 Lumens Circadian CRI 98+',
      'Connectivity': 'Matter, Thread, Wi-Fi 6, Zigbee',
      'Glass Material': 'Hand-blown Frosted Borosilicate Glass',
      'Power': 'USB-C PD 30W Fast Charge / Integrated Cord'
    },
    colors: [
      { name: 'Opal White', hex: '#f8fafc', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80' },
      { name: 'Smoked Amber', hex: '#d97706', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'cyber-deck-keypad',
    name: 'CyberBlade 75% Mechanical Keyboard',
    category: 'workstations',
    price: 279,
    originalPrice: 329,
    rating: 5.0,
    reviewCount: 240,
    badge: 'BESTSELLER',
    stock: 4,
    description: 'Gasket-mounted acoustic powerhouse featuring hot-swappable tactile hall-effect magnetic switches, OLED customizable telemetric screen, and CNC brass weight.',
    specs: {
      'Switch Type': 'Magnetic Hall Effect Rapid Trigger',
      'Case': 'CNC Machined Anodized 6063 Aluminum',
      'Polling Rate': '8,000Hz Ultra-Low Latency',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Battery': '8,000mAh Dual-Cell Wireless'
    },
    colors: [
      { name: 'Cyber Void', hex: '#111827', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80' },
      { name: 'Arctic Ice', hex: '#e2e8f0', img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'glide-zenith-mouse',
    name: 'Zenith Aerodynamic Wireless Mouse',
    category: 'workstations',
    price: 139,
    originalPrice: 169,
    rating: 4.8,
    reviewCount: 112,
    badge: 'SALE',
    stock: 18,
    description: 'Ultralight magnesium alloy exoskeleton weighing only 46g. Features 32,000 DPI optical sensor, zero-smoothing tracking, and diamond-grade pure PTFE skates.',
    specs: {
      'Weight': '46 grams',
      'Sensor': 'PixArt Focus Pro 32K Optical',
      'Battery Life': '110 Continuous Gaming Hours',
      'Micro-Switches': 'Optical 100M Click Rated',
      'Connection': 'HyperSpeed Wireless 2.4GHz + Type-C'
    },
    colors: [
      { name: 'Matte Stealth', hex: '#18181b', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80' },
      { name: 'Chalk White', hex: '#f4f4f5', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'sound-core-capsule',
    name: 'AURA Capsule 360° Spatial Speaker',
    category: 'audio',
    price: 219,
    originalPrice: 259,
    rating: 4.7,
    reviewCount: 77,
    badge: 'NEW DROP',
    stock: 11,
    description: 'Portable architectural acoustics engineered with dual opposing passive radiators, quad acoustic beamformers, and IP67 waterproof floating capability.',
    specs: {
      'Acoustic Output': '65W RMS Peak Clean Power',
      'Waterproof': 'IP67 Submersible & Dustproof',
      'Battery Life': '24 Hours Playback & Powerbank Out',
      'Pairing': 'Multi-room True Wireless Stereo Link'
    },
    colors: [
      { name: 'Charcoal', hex: '#27272a', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80' },
      { name: 'Forest Teal', hex: '#115e59', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'neuro-glasses-vision',
    name: 'Prism AR Smart Audio Sunglasses',
    category: 'wearables',
    price: 389,
    originalPrice: 449,
    rating: 4.6,
    reviewCount: 53,
    badge: 'NEW DROP',
    stock: 7,
    description: 'Ultra-thin carbon fiber frames featuring micro-directional bone conduction audio, polarization UV400 lenses, and AI voice assistance via dual noise-filtering mics.',
    specs: {
      'Lenses': 'Polarized UV400 Scratch-Resistant',
      'Microphones': 'Dual Beamforming Wind-Canceling',
      'Battery': '8 Hours Active Talk & Audio Stream',
      'Frame Weight': '38g Featherweight Carbon Fiber'
    },
    colors: [
      { name: 'Midnight Onyx', hex: '#09090b', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' },
      { name: 'Tortoise Brown', hex: '#78350f', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'studio-desk-mat',
    name: 'Hydro-Felt Magnetic Desk Mat Pro',
    category: 'accessories',
    price: 69,
    originalPrice: 89,
    rating: 4.9,
    reviewCount: 310,
    badge: 'BESTSELLER',
    stock: 25,
    description: 'Vegan leather and anti-fray merino wool layered with built-in magnetic cable organizer bar, spill-resistant nano coating, and non-slip honeycomb base.',
    specs: {
      'Dimensions': '900mm x 400mm x 4mm',
      'Top Surface': 'Spill-Proof Vegan Nappa Leather',
      'Underlayer': 'High-Density Wool Felt & Natural Cork',
      'Cable Clamps': '2x Neodymium Magnetic Anchor Blocks'
    },
    colors: [
      { name: 'Midnight Slate', hex: '#1e293b', img: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cognac Saddle', hex: '#9a3412', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'mag-charge-dock-3in1',
    name: 'Gravity 3-in-1 GaN Wireless Station',
    category: 'accessories',
    price: 129,
    originalPrice: 159,
    rating: 4.8,
    reviewCount: 140,
    badge: 'SALE',
    stock: 12,
    description: 'Floating cantilever design crafted from aerospace billet aluminum with 15W Qi2 certified fast-charging for Phone, Watch, and Earbuds simultaneously.',
    specs: {
      'Charging Output': '15W Phone + 5W Watch + 5W Earbuds',
      'Technology': 'Qi2 Certified & GaN III Heat Dissipation',
      'Weight': '420g Heavy Solid Weighted Base',
      'Included': '65W Compact GaN Wall Brick & Braided Cable'
    },
    colors: [
      { name: 'Space Gray', hex: '#475569', img: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silver White', hex: '#e2e8f0', img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'studio-monitor-arm',
    name: 'AeroLift Heavy-Duty Monitor Arm',
    category: 'workstations',
    price: 179,
    originalPrice: 219,
    rating: 4.9,
    reviewCount: 88,
    badge: 'BESTSELLER',
    stock: 5,
    description: 'Precision mechanical spring counterbalance supporting ultrawide displays up to 49" (20kg) with integrated magnetic cable routing channels.',
    specs: {
      'Screen Size': '17" to 49" Curved & Flat Displays',
      'Weight Capacity': 'Up to 20kg (44 lbs)',
      'VESA Mount': '75x75mm / 100x100mm Quick-Release',
      'Motion Range': '360° Rotation, +90°/-45° Tilt, 180° Swivel'
    },
    colors: [
      { name: 'Matte Black', hex: '#111827', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80' },
      { name: 'Pure White', hex: '#ffffff', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'aura-air-purifier',
    name: 'AURA Pure Ionic Air Purifier',
    category: 'smart-home',
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    reviewCount: 42,
    badge: 'NEW DROP',
    stock: 8,
    description: 'Medical-grade True HEPA H14 filter with active carbon honeycomb, laser particulate air quality sensor, and whisper-quiet 21dB night operation.',
    specs: {
      'Coverage': 'Up to 800 sq ft (75 m²)',
      'Filtration': 'HEPA H14 (99.995% @ 0.1 microns)',
      'Noise Level': '21dB Sleep Mode to 48dB Max Turbo',
      'Sensors': 'Real-time PM2.5, VOC, Humidity, Temp'
    },
    colors: [
      { name: 'Ceramic White', hex: '#f1f5f9', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80' },
      { name: 'Gunmetal Gray', hex: '#334155', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'sonic-hifi-dac',
    name: 'AURA Sonic Master Hi-Fi DAC & Amp',
    category: 'audio',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 165,
    badge: 'BESTSELLER',
    stock: 3,
    description: 'Dual ESS Sabre ES9038PRO reference DAC chips with THX AAA balanced headphone amplification, 32-bit/768kHz PCM, and native DSD512 hardware decoding.',
    specs: {
      'DAC Chipset': 'Dual ESS ES9038PRO HyperStream II',
      'Output Power': '2400mW @ 32 Ohms Balanced 4.4mm',
      'Inputs': 'USB-C XMOS XU216, Optical, Coaxial, Bluetooth LDAC',
      'Dynamic Range': '132dB / THD+N: 0.00015%'
    },
    colors: [
      { name: 'Brushed Charcoal', hex: '#262626', img: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80' },
      { name: 'Champagne Silver', hex: '#e2e8f0', img: 'https://images.unsplash.com/photo-1520170350707-b2da599700a8?auto=format&fit=crop&w=800&q=80' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520170350707-b2da599700a8?auto=format&fit=crop&w=800&q=80'
    ]
  }
];
