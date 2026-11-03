import type { Food } from './types'
import { UtensilsCrossed, Wheat, Drumstick, Flame, Sandwich, GlassWater, Cake } from 'lucide-react'

export const categories = [
  { name: 'All',       icon: UtensilsCrossed },
  { name: 'Rice',      icon: Wheat           },
  { name: 'Swallow',   icon: Drumstick       },
  { name: 'Grills',    icon: Flame           },
  { name: 'Fast Food', icon: Sandwich        },
  { name: 'Drinks',    icon: GlassWater      },
  { name: 'Desserts',  icon: Cake            },
]

export const foods: Food[] = [
  { id: 1,  name: 'Jollof Rice & Chicken',        restaurant: 'Mama T\'s Kitchen',   category: 'Rice',      price: 4500,  rating: 4.9, time: '25–35 min', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=900', description: 'Smoky party jollof rice served with juicy grilled chicken and fresh vegetables.', tag: 'Bestseller' },
  { id: 2,  name: 'Egusi & Pounded Yam',           restaurant: 'Naija Pot',           category: 'Swallow',   price: 5200,  rating: 4.8, time: '30–40 min', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900', description: 'Rich egusi soup with assorted meat and a smooth serving of pounded yam.' },
  { id: 3,  name: 'Suya Platter',                  restaurant: 'Abuja Suya Spot',     category: 'Grills',    price: 3800,  rating: 4.7, time: '20–30 min', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900', description: 'Spiced grilled beef suya with onions, tomatoes and yaji pepper.', tag: 'Popular' },
  { id: 4,  name: 'Classic Beef Burger',           restaurant: 'Burger District',     category: 'Fast Food', price: 6500,  rating: 4.6, time: '20–30 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900', description: 'A juicy beef patty with cheese, lettuce and house sauce in a toasted bun.' },
  { id: 5,  name: 'Pounded Yam & Edikang Ikong',   restaurant: 'Mama T\'s Kitchen',   category: 'Swallow',   price: 5800,  rating: 4.9, time: '35–45 min', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900', description: 'A rich vegetable soup with assorted protein and pounded yam.' },
  { id: 6,  name: 'Pepperoni Pizza',               restaurant: 'Crust & Co.',         category: 'Fast Food', price: 12500, rating: 4.8, time: '30–40 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900', description: 'Oven-baked pizza with mozzarella, pepperoni and tomato sauce.', tag: 'Special' },
  { id: 7,  name: 'Zobo (Chilled)',                restaurant: 'Fresh Sip',           category: 'Drinks',    price: 1200,  rating: 4.7, time: '15–20 min', image: 'https://images.unsplash.com/photo-1560508180-03f285f67ded?w=900', description: 'Refreshing hibiscus drink with natural fruit and ginger notes.' },
  { id: 8,  name: 'Chocolate Cake',               restaurant: 'Dessert Haven',       category: 'Desserts',  price: 3500,  rating: 4.8, time: '20–30 min', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900', description: 'Moist chocolate cake layered with smooth chocolate frosting.' },
  { id: 9,  name: 'Grilled Chicken & Chips',       restaurant: 'Burger District',     category: 'Grills',    price: 7200,  rating: 4.7, time: '25–35 min', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900', description: 'Well-seasoned grilled chicken with crispy golden fries.' },
  { id: 10, name: 'Fried Rice & Turkey',           restaurant: 'Naija Pot',           category: 'Rice',      price: 5600,  rating: 4.8, time: '25–35 min', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900', description: 'Colourful Nigerian fried rice served with tender turkey.' },
  { id: 11, name: 'Chapman',                       restaurant: 'Fresh Sip',           category: 'Drinks',    price: 1800,  rating: 4.6, time: '10–15 min', image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=900', description: 'A fruity Nigerian classic, chilled and freshly mixed.' },
  { id: 12, name: 'Chicken Shawarma',              restaurant: 'Crust & Co.',         category: 'Fast Food', price: 4200,  rating: 4.7, time: '15–25 min', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=900', description: 'Chicken shawarma wrapped with vegetables and creamy sauce.' }
]
