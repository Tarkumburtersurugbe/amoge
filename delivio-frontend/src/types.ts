export type Category = 'All' | 'Rice' | 'Swallow' | 'Grills' | 'Fast Food' | 'Drinks' | 'Desserts'
export type Food = {
  id: number; name: string; restaurant: string; category: Category; price: number;
  rating: number; time: string; image: string; description: string; tag?: string
}
export type CartLine = { food: Food; quantity: number }
export type Order = { id: string; items: CartLine[]; total: number; address: string; status: string; createdAt: string }
export type View = 'home' | 'categories' | 'search' | 'favorites' | 'cart' | 'checkout' | 'orders' | 'profile' | 'restaurant' | 'dashboard' 