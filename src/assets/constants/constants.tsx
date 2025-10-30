
// Ugandan meals + drinks
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  drinks: string[];
  color?: string; // placeholder background color if image missing
  media?: string; // filename under src/assets/media (image or video)
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Pizza (small)',
    description: '',
    price: 30000,
    category: 'Exotic',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'pizza-video.mp4'
  },
  {
    id: 2,
    name: 'Pizza (large)',
    description: '',
    price: 45000,
    category: 'Exotic',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'pizza-video.mp4'
  },
  {
    id: 3,
    name: 'Boiled Chicken',
    description: 'Served with either irish, cassava or smoked matooke and coleslaws.',
    price: 25000,
    category: 'Local food',
    drinks: ['Chapatti', 'Soda'],
    color: 'from-orange-100 to-orange-50',
    media: 'boiled-chicken.jpeg'
  },
  {
    id: 4,
    name: 'Boiled Meat',
    description: 'Served with either irish, cassava or smoked matooke and coleslaws.',
    price: 20000,
    category: 'Local food',
    drinks: ['Soda', 'Posho'],
    color: 'from-orange-100 to-orange-50',
    media: 'all-foods-and-fish.jpeg'
  },
  {
    id: 5,
    name: 'Grilled Chicken',
    description: 'Served with either smoked irish or matooke and coleslaws.',
    price: 35000,
    category: 'On the grill',
    drinks: ['Soda', 'Beer'],
    color: 'from-orange-100 to-orange-50',
    media: 'grilled-chicken.jpeg'
  },
  {
    id: 6,
    name: 'Pilau & Chicken',
    description: '',
    price: 20000,
    category: 'Quick meals',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'jollof-rice.jpeg'
  },
  {
    id: 7,
    name: 'Pilau & Beef',
    description: '',
    price: 15000,
    category: 'Quick meals',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'jollof-rice.jpeg'
  },
  {
    id: 8,
    name: 'All local foods',
    description: 'All local foods with prefered sauce (except fish sauce)',
    price: 20000,
    category: 'local food',
    drinks: ['Soda'],
    color: 'from-orange-100 to-orange-50',
    media: 'local-food.jpeg'
  },
  {
    id: 9,
    name: 'All local foods',
    description: 'All local foods with fish sauce',
    price: 30000,
    category: 'local food',
    drinks: ['Soda'],
    color: 'from-orange-100 to-orange-50',
    media: 'all-foods-and-fish.jpeg'
  },
  {
    id: 10,
    name: 'Goats meat (Roasted)',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'local food',
    drinks: ['Soda', 'Beer'],
    color: 'from-orange-100 to-orange-50',
    media: 'goats-meat-lusania.jpeg'
  },
  {
    id: 11,
    name: 'Goats meat (Boiled)',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'goats-meat-lusania.jpeg'
  },
  {
    id: 12,
    name: 'Black pepper chicken breast',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'local food',
    drinks: ['Soda'],
    color: 'from-orange-100 to-orange-50',
    media: 'fried-chicken.jpeg'
  },
  {
    id: 13,
    name: 'Jollof rice',
    description: 'Served with coleslaws',
    price: 15000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'jollof-rice.jpeg'
  },
  {
    id: 14,
    name: 'Jollof rice with chicken',
    description: 'Served with coleslaws',
    price: 25000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'jollof-rice.jpeg'
  },
  {
    id: 15,
    name: 'Jollof rice with pork',
    description: 'Served with coleslaws',
    price: 35000,
    category: 'local food',
    drinks: ['Soda', 'Beer'],
    color: 'from-orange-100 to-orange-50',
    media: 'jollof-rice.jpeg'
  },
  {
    id: 16,
    name: 'Jollof rice with beef',
    description: 'Served with coleslaws',
    price: 25000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-orange-100 to-orange-50',
    media: 'jollof-rice.jpeg'
  },
  {
    id: 17,
    name: 'Boiled offals',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'local food',
    drinks: ['Soda'],
    color: 'from-orange-100 to-orange-50',
    media: 'all-foods-and-fish.jpeg'
  },
  {
    id: 18,
    name: 'Chicken wings',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'snacking',
    drinks: ['Soda'],
    color: 'from-orange-100 to-orange-50',
    media: 'chicken-wings.jpeg'
  },
];