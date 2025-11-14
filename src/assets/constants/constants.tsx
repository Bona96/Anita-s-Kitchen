
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
    category: 'exotic',
    drinks: ['Soda', 'Water'],
    color: 'from-black/30 to-gray-200',
    media: 'pizza-video.mp4'
  },
  {
    id: 2,
    name: 'Pizza (large)',
    description: '',
    price: 45000,
    category: 'exotic',
    drinks: ['Soda', 'Water'],
    color: 'from-red-100 to-violet-200',
    media: 'pizza-video.mp4'
  },
  {
    id: 3,
    name: 'Boiled Chicken',
    description: 'Served with either irish, cassava or smoked matooke and coleslaws.',
    price: 25000,
    category: 'local food',
    drinks: ['Water', 'Soda'],
    color: 'from-cyan-100 to-violet-200',
    media: 'boiled-chicken.jpeg'
  },
  {
    id: 4,
    name: 'Beef',
    description: 'Served with either irish, cassava or smoked matooke and coleslaws.',
    price: 20000,
    category: 'local food',
    drinks: ['Soda', 'Posho'],
    color: 'from-gray-100 to-red-200',
    media: 'Beef.jpeg'
  },
  {
    id: 5,
    name: 'Grilled Chicken',
    description: 'Served with either smoked irish or matooke and coleslaws.',
    price: 35000,
    category: 'On the grill',
    drinks: ['Soda', 'Beer'],
    color: 'from-blue-100 to-violet-200',
    media: 'grilled-chicken.jpeg'
  },
  {
    id: 6,
    name: 'local foods',
    description: 'local foods with fish, beef, chicken, goat meat.',
    price: 30000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-gray-100 to-indigo-200',
    media: 'local-food.jpeg'
  },
  {
    id: 7,
    name: 'Black pepper chicken breast',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'Exotic',
    drinks: ['Soda'],
    color: 'from-cyan-100 to-cyan-200',
    media: 'Black-pepper-chicken-breast.jpeg'
  },
  {
    id: 8,
    name: 'Jollof rice with chicken',
    description: 'Served with coleslaws',
    price: 15000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-cyan-100 to-blue-200',
    media: 'jollof-rice-with-chicken-and-plantain.jpeg'
  },
  {
    id: 9,
    name: 'Jollof rice with Pork',
    description: 'Served with coleslaws',
    price: 25000,
    category: 'local food',
    drinks: ['Soda', 'Water'],
    color: 'from-indigo-100 to-gray-200',
    media: 'jollof-rice-with-pork.jpeg'
  },
  {
    id: 10,
    name: 'Fish',
    description: 'Served with coleslaws',
    price: 30000,
    category: 'Exotic',
    drinks: ['Soda'],
    color: 'from-cyan-100 to-violet-200',
    media: 'fish.jpeg'
  },
  {
    id: 11,
    name: 'Chicken wings',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'snacking',
    drinks: ['Soda'],
    color: 'from-blue-100 to-gray-200',
    media: 'chicken-wings.jpeg'
  },
  {
    id: 12,
    name: 'Grilled Chicken with Irish',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'on the grill',
    drinks: ['Soda', 'Water'],
    color: 'from-blue-100 to-gray-200',
    media: 'grilled-chicken-with-irish.jpeg'
  },
  {
    id: 13,
    name: 'Chips & Chicken',
    description: 'Served with coleslaws',
    price: 20000,
    category: 'on the grill',
    drinks: ['Soda', 'Water'],
    color: 'from-blue-100 to-gray-200',
    media: 'anita-s-kitchen-chips-and-chicken.jpg'
  },
];