/**
 * Hidden Gems HK - Data Layer
 * 
 * This file contains the core data structures and algorithms for the
 * gemstone-inspired 5D recommendation system.
 * 
 * 5D VALUE DIMENSIONS:
 * - Culture (Ruby): Heritage, traditions, arts, and historical significance
 * - Adventure (Emerald): Excitement, thrill, outdoor exploration
 * - Serenity (Sapphire): Peace, calm, relaxation, and tranquility
 * - Social (Citrine): Community, connection, vibrancy, and social energy
 * - Discovery (Amethyst): Hidden, unique, off-the-beaten-path experiences
 * 
 * RECOMMENDATION ALGORITHM:
 * The matching algorithm uses weighted scoring to find the best matches:
 * 1. User preferences are normalized to create a weighted profile (sum = 1.0)
 * 2. Each location's value scores (0-100) are multiplied by user weights
 * 3. Weighted scores are summed to calculate a final match percentage
 * 4. Locations are ranked by match score to prioritize best matches
 */

// 5D Value System
export type ValueDimension = 'culture' | 'adventure' | 'serenity' | 'social' | 'discovery';

export interface ValueScores {
  culture: number;      // Heritage, traditions, arts
  adventure: number;    // Excitement, thrill, exploration
  serenity: number;     // Peace, calm, relaxation
  social: number;       // Connection, community, vibrancy
  discovery: number;    // Hidden, unique, off-the-beaten-path
}

export interface HiddenGem {
  id: string;
  name: string;
  description: string;
  location: string;
  district: string;
  category: string;
  image: string;
  values: ValueScores;
  tags: string[];
  openingHours?: string;
  bestTimeToVisit?: string;
  accessInfo?: string;
  coordinates?: { lat: number; lng: number };
}

// Gemstone theme mapping to value dimensions
export const gemstoneThemes = {
  culture: {
    name: 'Ruby',
    color: '#E11D48',
    gradient: 'from-rose-600 to-red-600',
    icon: '💎',
    description: 'Deep heritage and artistic traditions'
  },
  adventure: {
    name: 'Emerald',
    color: '#059669',
    gradient: 'from-emerald-500 to-green-600',
    icon: '🌿',
    description: 'Thrilling exploration and excitement'
  },
  serenity: {
    name: 'Sapphire',
    color: '#2563EB',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '🌊',
    description: 'Peaceful tranquility and calm'
  },
  social: {
    name: 'Citrine',
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
    icon: '✨',
    description: 'Vibrant community connections'
  },
  discovery: {
    name: 'Amethyst',
    color: '#9333EA',
    gradient: 'from-purple-500 to-violet-600',
    icon: '🔮',
    description: 'Hidden treasures and secrets'
  }
};

export const hiddenGems: HiddenGem[] = [
  {
    id: 'hg-001',
    name: 'Tai Kwun Heritage Centre',
    description: 'A beautifully restored colonial-era police station transformed into a contemporary arts and heritage center, blending history with modern cultural experiences.',
    location: '10 Hollywood Road, Central',
    district: 'Central & Western',
    category: 'Cultural Center',
    image: 'https://images.unsplash.com/photo-1700798421839-f1ebb8370df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMHRyYWRpdGlvbmFsJTIwdGVtcGxlfGVufDF8fHx8MTc3NjM0NzY3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 95, adventure: 30, serenity: 60, social: 70, discovery: 75 },
    tags: ['heritage', 'art', 'history', 'architecture'],
    openingHours: '11:00 AM - 11:00 PM',
    bestTimeToVisit: 'Weekday afternoons'
  },
  {
    id: 'hg-002',
    name: 'Dragon\'s Back Trail',
    description: 'Hong Kong\'s most scenic hiking trail offering breathtaking panoramic views of pristine beaches, lush mountains, and the South China Sea.',
    location: 'Shek O Road, Shek O',
    district: 'Southern',
    category: 'Nature Trail',
    image: 'https://images.unsplash.com/photo-1621511251405-efc281f5d38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGhpa2luZyUyMHRyYWlsJTIwbmF0dXJlfGVufDF8fHx8MTc3NjM0NzY3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 20, adventure: 90, serenity: 85, social: 40, discovery: 70 },
    tags: ['hiking', 'nature', 'views', 'outdoor'],
    openingHours: 'Dawn to dusk',
    bestTimeToVisit: 'Early morning or late afternoon'
  },
  {
    id: 'hg-003',
    name: 'Nan Lian Garden',
    description: 'A stunning Tang Dynasty-style classical Chinese garden featuring meticulously manicured landscapes, wooden architecture, and koi ponds in the heart of the city.',
    location: 'Fung Tak Road, Diamond Hill',
    district: 'Wong Tai Sin',
    category: 'Garden',
    image: 'https://images.unsplash.com/photo-1752846529452-2903aa754afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGdhcmRlbiUyMHBhcmslMjB6ZW58ZW58MXx8fHwxNzc2MzQ3Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 85, adventure: 15, serenity: 98, social: 30, discovery: 65 },
    tags: ['garden', 'peaceful', 'traditional', 'zen'],
    openingHours: '7:00 AM - 9:00 PM',
    bestTimeToVisit: 'Early morning for tranquility'
  },
  {
    id: 'hg-004',
    name: 'PMQ (Police Married Quarters)',
    description: 'A creative hub housed in a renovated heritage building, featuring independent designer boutiques, artisan workshops, and innovative local brands.',
    location: '35 Aberdeen Street, Central',
    district: 'Central & Western',
    category: 'Shopping & Design',
    image: 'https://images.unsplash.com/photo-1680940653656-cc63e536fcbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMHZpbnRhZ2UlMjBzaG9wfGVufDF8fHx8MTc3NjM0NzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 75, adventure: 45, serenity: 40, social: 80, discovery: 88 },
    tags: ['design', 'shopping', 'creative', 'local'],
    openingHours: '11:00 AM - 8:00 PM',
    bestTimeToVisit: 'Weekday afternoons'
  },
  {
    id: 'hg-005',
    name: 'Graham Street Market',
    description: 'One of Hong Kong\'s oldest street markets where locals shop for fresh produce, traditional delicacies, and authentic Hong Kong street food in a vibrant atmosphere.',
    location: 'Graham Street, Central',
    district: 'Central & Western',
    category: 'Market',
    image: 'https://images.unsplash.com/photo-1672729524875-5c9d8c5c732d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGxvY2FsJTIwbWFya2V0JTIwZm9vZHxlbnwxfHx8fDE3NzYzNDc2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 88, adventure: 55, serenity: 25, social: 92, discovery: 70 },
    tags: ['market', 'food', 'local', 'authentic'],
    openingHours: '7:00 AM - 7:00 PM',
    bestTimeToVisit: 'Morning for freshest produce'
  },
  {
    id: 'hg-006',
    name: 'Lei Yue Mun Fishing Village',
    description: 'A charming waterfront village where you can select fresh seafood from market stalls and have it cooked at harbor-side restaurants while enjoying sunset views.',
    location: 'Lei Yue Mun, Kowloon',
    district: 'Kwun Tong',
    category: 'Dining & Village',
    image: 'https://images.unsplash.com/photo-1690276915308-e520da70aa1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGhhcmJvciUyMHN1bnNldHxlbnwxfHx8fDE3NzYzNDc2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 80, adventure: 50, serenity: 70, social: 85, discovery: 78 },
    tags: ['seafood', 'village', 'dining', 'waterfront'],
    openingHours: '5:00 PM - 11:00 PM',
    bestTimeToVisit: 'Sunset dinner time'
  },
  {
    id: 'hg-007',
    name: 'Sheung Wan Street Art',
    description: 'A neighborhood gallery of vibrant murals and street art tucked in historic alleyways, showcasing local and international artists.',
    location: 'Various streets in Sheung Wan',
    district: 'Central & Western',
    category: 'Street Art',
    image: 'https://images.unsplash.com/photo-1601106881793-6b5d0375f638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMHN0cmVldCUyMGFydCUyMG11cmFsfGVufDF8fHx8MTc3NjM0NzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 82, adventure: 60, serenity: 45, social: 70, discovery: 92 },
    tags: ['art', 'street', 'photography', 'culture'],
    openingHours: 'Always open',
    bestTimeToVisit: 'Late afternoon for best lighting'
  },
  {
    id: 'hg-008',
    name: 'Sai Wan Swimming Shed',
    description: 'An Instagram-famous floating pier and vintage swimming shed offering stunning sunset views over Victoria Harbour, perfect for photography.',
    location: 'Sai Wan, Kennedy Town',
    district: 'Central & Western',
    category: 'Viewpoint',
    image: 'https://images.unsplash.com/photo-1549165668-e60232aac641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGJlYWNoJTIwcXVpZXR8ZW58MXx8fHwxNzc2MzQ3Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 45, adventure: 55, serenity: 88, social: 60, discovery: 85 },
    tags: ['sunset', 'photography', 'waterfront', 'peaceful'],
    openingHours: 'Always open',
    bestTimeToVisit: 'Golden hour (sunset)'
  },
  {
    id: 'hg-009',
    name: 'Yau Ma Tei Theatre',
    description: 'Hong Kong\'s only surviving pre-war cinema, now restored as a venue for traditional Cantonese opera performances and cultural shows.',
    location: '6 Waterloo Road, Yau Ma Tei',
    district: 'Yau Tsim Mong',
    category: 'Theater',
    image: 'https://images.unsplash.com/photo-1774963492793-0ed0517ab6d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGhpZGRlbiUyMGFsbGV5JTIwc3RyZWV0fGVufDF8fHx8MTc3NjM0NzY3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 98, adventure: 35, serenity: 55, social: 65, discovery: 80 },
    tags: ['theater', 'opera', 'heritage', 'performance'],
    openingHours: 'Check schedule',
    bestTimeToVisit: 'During performances'
  },
  {
    id: 'hg-010',
    name: 'Temple Street Night Market',
    description: 'A bustling night bazaar offering everything from fortune tellers to street food, antiques, and local souvenirs in an electrifying atmosphere.',
    location: 'Temple Street, Jordan',
    district: 'Yau Tsim Mong',
    category: 'Night Market',
    image: 'https://images.unsplash.com/photo-1669275098427-5ae2c6d4bb91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMG5pZ2h0JTIwbWFya2V0fGVufDF8fHx8MTc3NjM0NzY3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 85, adventure: 70, serenity: 20, social: 95, discovery: 75 },
    tags: ['market', 'night', 'shopping', 'food'],
    openingHours: '6:00 PM - 12:00 AM',
    bestTimeToVisit: '8:00 PM - 10:00 PM'
  },
  {
    id: 'hg-011',
    name: 'Eslite Bookstore',
    description: 'A beautiful 24-hour bookstore and lifestyle space with curated books, design items, and a cozy café overlooking Victoria Harbour.',
    location: 'Hysan Place, Causeway Bay',
    district: 'Wan Chai',
    category: 'Bookstore & Café',
    image: 'https://images.unsplash.com/photo-1647496010778-b5900c296578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGJvb2tzdG9yZSUyMGNhZmV8ZW58MXx8fHwxNzc2MzQ3Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 72, adventure: 25, serenity: 85, social: 55, discovery: 68 },
    tags: ['books', 'café', 'quiet', 'design'],
    openingHours: '24 hours',
    bestTimeToVisit: 'Late evening for peace'
  },
  {
    id: 'hg-012',
    name: 'Peng Chau Island',
    description: 'A tiny, car-free island with a laid-back village atmosphere, colorful temples, artisan workshops, and stunning coastal walks.',
    location: 'Peng Chau, Outlying Islands',
    district: 'Islands',
    category: 'Island',
    image: 'https://images.unsplash.com/photo-1549165668-e60232aac641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25nJTIwS29uZyUyMGJlYWNoJTIwcXVpZXR8ZW58MXx8fHwxNzc2MzQ3Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    values: { culture: 78, adventure: 80, serenity: 92, social: 50, discovery: 95 },
    tags: ['island', 'village', 'peaceful', 'nature'],
    openingHours: 'Accessible by ferry',
    bestTimeToVisit: 'Weekday mornings'
  }
];

// 5D Recommendation Algorithm
export function calculateMatchScore(userPreferences: ValueScores, gem: HiddenGem): number {
  const weights = {
    culture: userPreferences.culture / 100,
    adventure: userPreferences.adventure / 100,
    serenity: userPreferences.serenity / 100,
    social: userPreferences.social / 100,
    discovery: userPreferences.discovery / 100
  };

  // Normalize weights to sum to 1
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const normalizedWeights = Object.fromEntries(
    Object.entries(weights).map(([k, v]) => [k, v / totalWeight])
  ) as ValueScores;

  // Calculate weighted score
  let score = 0;
  (Object.keys(normalizedWeights) as ValueDimension[]).forEach((dimension) => {
    score += normalizedWeights[dimension] * gem.values[dimension];
  });

  return Math.round(score);
}

export function getTopRecommendations(
  userPreferences: ValueScores,
  count: number = 6
): HiddenGem[] {
  const scored = hiddenGems.map((gem) => ({
    gem,
    score: calculateMatchScore(userPreferences, gem)
  }));

  scored.sort((a, b) => b.score - a.score);
  
  return scored.slice(0, count).map((item) => item.gem);
}

export function getDominantValue(values: ValueScores): ValueDimension {
  let maxValue = 0;
  let dominant: ValueDimension = 'discovery';
  
  (Object.entries(values) as [ValueDimension, number][]).forEach(([key, value]) => {
    if (value > maxValue) {
      maxValue = value;
      dominant = key;
    }
  });
  
  return dominant;
}