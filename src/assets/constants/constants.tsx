
// Ugandan meals + drinks
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  drinks: string[];
  color?: string; // placeholder background color if image missing
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Rolex (Chapati + Eggs)',
    description: 'A beloved street food: chapati filled with omelette, vegetables and spices.',
    price: 5000,
    category: 'Snacking',
    drinks: ['Upper (banana juice)', 'Millet porridge'],
    color: 'from-yellow-100 to-yellow-50'
  },
  {
    id: 2,
    name: 'All food & Groundnut Sauce',
    description: 'Steamed mashed green bananas (matooke) served with a rich groundnut (peanut) sauce.',
    price: 10000,
    category: 'Traditional',
    drinks: ['Black tea', 'Hibiscus (karkade)'],
    color: 'from-green-100 to-green-50'
  },
  {
    id: 3,
    name: 'Pasted Beef Sauce',
    description: 'Well grilled beef served - mixed, with a rich groundnut (peanut) sauce.',
    price: 15000,
    category: 'Traditional',
    drinks: ['Black tea', 'Hibiscus (karkade)'],
    color: 'from-green-100 to-green-50'
  },
  {
    id: 4,
    name: 'Luwombo (Chicken)',
    description: 'Slow-steamed chicken in banana leaves with traditional spices and sauce.',
    price: 25000,
    category: 'Specialties',
    drinks: ['Ginger juice', 'Fresh lemon'],
    color: 'from-orange-100 to-orange-50'
  },
  {
    id: 5,
    name: 'Luwombo (Goat)',
    description: 'Slow-steamed goat meat in banana leaves with traditional spices and sauce.',
    price: 25000,
    category: 'Specialties',
    drinks: ['Ginger juice', 'Fresh lemon'],
    color: 'from-orange-100 to-orange-50'
  }
];