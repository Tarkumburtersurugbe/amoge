import { useEffect, useMemo, useState } from 'react'
import {
  Home, LayoutGrid, Search, Heart, ShoppingBag, UserRound, Bell, MapPin, ChevronDown,
  ChevronRight, Star, Clock3, Plus, Minus, X, ArrowLeft, Trash2,
  ShoppingCart, Menu, PackageCheck, Bike, Store, ChartNoAxesCombined, CheckCircle2,
  Rocket, Salad, CreditCard, UtensilsCrossed
} from 'lucide-react'
import { categories, foods } from './data'
import type { CartLine, Food, Order, View } from './types'

const money = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)

const read = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartLine[]>(() => read('amoge-cart', []))
  const [favorites, setFavorites] = useState<number[]>(() => read('amoge-favorites', []))
  const [orders, setOrders] = useState<Order[]>(() => read('amoge-orders', []))
  const [selected, setSelected] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [address, setAddress] = useState('12 Admiralty Way, Lekki Phase 1, Lagos')
  const [payment, setPayment] = useState('Pay on delivery')
  const [role, setRole] = useState('Customer')
  const [toast, setToast] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => { localStorage.setItem('amoge-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('amoge-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('amoge-orders', JSON.stringify(orders)) }, [orders])

  const subtotal = cart.reduce((sum, line) => sum + line.food.price * line.quantity, 0)
  const deliveryFee = subtotal > 15000 || subtotal === 0 ? 0 : 1000
  const serviceFee = subtotal ? 300 : 0
  const total = subtotal + deliveryFee + serviceFee

  const filtered = useMemo(
    () =>
      foods.filter(
        food =>
          (category === 'All' || food.category === category) &&
          (food.name.toLowerCase().includes(query.toLowerCase()) ||
            food.restaurant.toLowerCase().includes(query.toLowerCase()))
      ),
    [category, query]
  )

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const addToCart = (food: Food, count = 1) => {
    setCart(current => {
      const existing = current.find(line => line.food.id === food.id)
      return existing
        ? current.map(line =>
            line.food.id === food.id ? { ...line, quantity: line.quantity + count } : line
          )
        : [...current, { food, quantity: count }]
    })
    notify(`${food.name} added to your cart`)
  }

  const changeQty = (id: number, delta: number) =>
    setCart(current =>
      current
        .map(line => (line.food.id === id ? { ...line, quantity: line.quantity + delta } : line))
        .filter(line => line.quantity > 0)
    )

  const toggleFavorite = (id: number) => {
    setFavorites(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    )
    notify(favorites.includes(id) ? 'Removed from favorites' : 'Saved to favorites')
  }

  const openFood = (food: Food) => {
    setSelected(food)
    setQuantity(1)
  }

  const placeOrder = () => {
    if (!cart.length) return
    const order: Order = {
      id: `AMG-${Date.now().toString().slice(-7)}`,
      items: cart,
      total,
      address,
      status: 'Order received',
      createdAt: new Date().toLocaleString('en-NG'),
    }
    setOrders(current => [order, ...current])
    setCart([])
    setView('orders')
    notify('Your order has been placed!')
  }

  const navItems: { id: View; label: string; icon: typeof Home }[] = [
    { id: 'home',      label: 'Home',       icon: Home      },
    { id: 'categories',label: 'Categories', icon: LayoutGrid},
    { id: 'orders',    label: 'Orders',     icon: ShoppingBag},
    { id: 'favorites', label: 'Favorites',  icon: Heart     },
    { id: 'profile',   label: 'Profile',    icon: UserRound },
  ]

  // ─── Food Card ────────────────────────────────────────────────────────────
  const FoodCard = ({ food, horizontal = false }: { food: Food; horizontal?: boolean }) => (
    <article className={`food-card ${horizontal ? 'food-horizontal' : ''}`}>
      <button
        className="food-image-wrap"
        onClick={() => openFood(food)}
        aria-label={`View ${food.name}`}
      >
        <img src={food.image} alt={food.name} className="food-image" />
        {food.tag && <span className="food-tag">{food.tag}</span>}
      </button>
      <button
        className={`heart-btn ${favorites.includes(food.id) ? 'is-favorite' : ''}`}
        onClick={() => toggleFavorite(food.id)}
        aria-label="Toggle favorite"
      >
        <Heart size={18} fill={favorites.includes(food.id) ? 'currentColor' : 'none'} />
      </button>
      <div className="food-info">
        <button className="food-name" onClick={() => openFood(food)}>{food.name}</button>
        <div className="food-restaurant">{food.restaurant}</div>
        <div className="food-meta">
          <span><Star size={13} fill="currentColor" /> {food.rating}</span>
          <span><Clock3 size={13} /> {food.time}</span>
        </div>
        <div className="food-bottom">
          <strong>{money(food.price)}</strong>
          <button className="add-small" onClick={() => addToCart(food)} aria-label="Add to cart">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  )

  
  const BottomNav = () => (
    <nav className="bottom-nav">
      {navItems.map(item => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            className={view === item.id ? 'active' : ''}
            onClick={() => { setView(item.id); setSelected(null) }}
          >
            <Icon size={20} />
            <span>{item.label}</span>
            {item.id === 'orders' && cart.length > 0 && <i className="nav-dot" />}
          </button>
        )
      })}
    </nav>
  )

  return (
    <div className="app-shell">
      
      <header className="topbar">
        <button className="brand" onClick={() => setView('home')}>
          <span className="brand-mark">A</span>
          <span>AMOGE<span className="brand-dot">.</span></span>
        </button>
        <button
          className="location-pill"
          onClick={() => notify('Address selection will be connected to your account later')}
        >
          <MapPin size={16} /><span>Jalingo, Taraba</span><ChevronDown size={14} />
        </button>
        <div className="top-actions">
          <button
            className="icon-button notification"
            onClick={() => notify('You are all caught up!')}
            aria-label="Notifications"
          >
            <Bell size={19} />
          </button>
          <button className="cart-top" onClick={() => setView('cart')}>
            <ShoppingBag size={18} /><span>Cart</span>
            <b>{cart.reduce((s, l) => s + l.quantity, 0)}</b>
          </button>
          <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <Menu />
          </button>
        </div>
      </header>

      {mobileMenu && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setView(item.id); setMobileMenu(false) }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main className="main-content">
        
        {view === 'home' && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow">GOOD FOOD, GREAT MOOD</span>
                <h1>Cravings?<br /><em>We've got you.</em></h1>
                <p>Discover the best meals around you and get them delivered fresh to your door.</p>
                <button className="primary-btn" onClick={() => { setView('categories'); setCategory('All') }}>
                  Explore food <ChevronRight size={17} />
                </button>
              </div>
              <div className="hero-art">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000"
                  alt="Freshly prepared pizza and food"
                />
              </div>
              <div className="hero-stamp">Fresh<br /> &amp; fast <span>✦</span></div>
            </section>

           
            <section className="quick-stats">
              <div>
                <span className="stat-icon"><Rocket size={20} /></span>
                <span><b>Fast delivery</b><small>At your doorstep</small></span>
              </div>
              <div>
                <span className="stat-icon"><Salad size={20} /></span>
                <span><b>Fresh meals</b><small>Made with care</small></span>
              </div>
              <div>
                <span className="stat-icon"><CreditCard size={20} /></span>
                <span><b>Easy payment</b><small>Pay your way</small></span>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">WHAT ARE YOU CRAVING?</span>
                  <h2>Explore categories</h2>
                </div>
                <button className="text-link" onClick={() => setView('categories')}>
                  View all <ChevronRight size={16} />
                </button>
              </div>
              <div className="category-strip">
                {categories
                  .filter(c => c.name !== 'All')
                  .map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        className={`category-tile ${category === item.name ? 'selected' : ''}`}
                        key={item.name}
                        onClick={() => { setCategory(item.name); setView('categories') }}
                      >
                        <Icon size={26} />
                        <b>{item.name}</b>
                      </button>
                    )
                  })}
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">HANDPICKED FOR YOU</span>
                  <h2>Popular near you</h2>
                </div>
                <button className="text-link" onClick={() => setView('categories')}>
                  See all <ChevronRight size={16} />
                </button>
              </div>
              <div className="food-grid">
                {foods.slice(0, 4).map(food => <FoodCard key={food.id} food={food} />)}
              </div>
            </section>

            <section className="promo-banner">
              <div>
                <span className="eyebrow">A LITTLE TREAT</span>
                <h2>Good food deserves<br />a good deal.</h2>
                <p>Enjoy free delivery on orders above ₦15,000.</p>
                <button className="light-btn" onClick={() => setView('categories')}>
                  Order now <ChevronRight size={16} />
                </button>
              </div>
              <div className="promo-icon"><UtensilsCrossed size={80} strokeWidth={1.2} /></div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">MORE TO LOVE</span>
                  <h2>New on AMOGE</h2>
                </div>
              </div>
              <div className="food-grid">
                {foods.slice(4, 8).map(food => <FoodCard key={food.id} food={food} />)}
              </div>
            </section>
          </>
        )}

        
        {view === 'categories' && (
          <section className="page-section">
            <div className="page-title">
              <span className="eyebrow">FIND YOUR FAVOURITE</span>
              <h1>Explore food</h1>
              <p>Something delicious is waiting for you.</p>
            </div>
            <div className="filter-chips">
              {categories.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    className={category === item.name ? 'chip active' : 'chip'}
                    onClick={() => setCategory(item.name)}
                  >
                    <Icon size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                    {item.name}
                  </button>
                )
              })}
            </div>
            <div className="food-grid">
              {filtered.map(food => <FoodCard key={food.id} food={food} />)}
            </div>
            {!filtered.length && (
              <div className="empty-state">
                <span><UtensilsCrossed size={42} /></span>
                <h3>No meals found</h3>
                <p>Try another category.</p>
              </div>
            )}
          </section>
        )}

        
        {view === 'search' && (
          <section className="page-section">
            <div className="page-title">
              <span className="eyebrow">DISCOVER SOMETHING DELICIOUS</span>
              <h1>Search</h1>
            </div>
            <div className="search-box large">
              <Search />
              <input
                autoFocus
                placeholder="Search food or restaurant..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button onClick={() => setQuery('')}><X size={17} /></button>
            </div>
            <h3 className="subheading">Popular searches</h3>
            <div className="filter-chips">
              {['Jollof', 'Burger', 'Suya', 'Pizza', 'Shawarma'].map(term => (
                <button className="chip" key={term} onClick={() => setQuery(term)}>{term}</button>
              ))}
            </div>
            <h3 className="subheading">{query ? `Results for "${query}"` : 'Popular meals'}</h3>
            <div className="food-grid">
              {filtered.map(food => <FoodCard key={food.id} food={food} />)}
            </div>
          </section>
        )}

        
        {view === 'favorites' && (
          <section className="page-section">
            <div className="page-title">
              <span className="eyebrow">SAVED FOR LATER</span>
              <h1>Your favorites</h1>
              <p>All the meals you love, in one place.</p>
            </div>
            <div className="food-grid">
              {foods.filter(food => favorites.includes(food.id)).map(food => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
            {!favorites.length && (
              <div className="empty-state">
                <span><Heart size={42} /></span>
                <h3>No favorites yet</h3>
                <p>Tap the heart on a meal to save it here.</p>
                <button className="primary-btn" onClick={() => setView('categories')}>Explore meals</button>
              </div>
            )}
          </section>
        )}

        
        {view === 'cart' && (
          <section className="page-section narrow">
            <div className="page-title">
              <span className="eyebrow">ALMOST THERE</span>
              <h1>Your cart</h1>
              <p>Review your delicious picks.</p>
            </div>
            {!cart.length ? (
              <div className="empty-state">
                <span><ShoppingBag size={42} /></span>
                <h3>Your cart is empty</h3>
                <p>Find something tasty to get started.</p>
                <button className="primary-btn" onClick={() => setView('categories')}>Browse meals</button>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {cart.map(line => (
                    <div className="cart-line" key={line.food.id}>
                      <img src={line.food.image} alt={line.food.name} />
                      <div className="cart-line-info">
                        <b>{line.food.name}</b>
                        <small>{line.food.restaurant}</small>
                        <strong>{money(line.food.price * line.quantity)}</strong>
                        <div className="qty-control">
                          <button onClick={() => changeQty(line.food.id, -1)}><Minus size={14} /></button>
                          <span>{line.quantity}</span>
                          <button onClick={() => changeQty(line.food.id, 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => setCart(current => current.filter(item => item.food.id !== line.food.id))}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="summary-card">
                  <h3>Order summary</h3>
                  <div><span>Subtotal</span><b>{money(subtotal)}</b></div>
                  <div><span>Delivery fee</span><b>{deliveryFee ? money(deliveryFee) : 'FREE'}</b></div>
                  <div><span>Service fee</span><b>{money(serviceFee)}</b></div>
                  <div className="summary-total">
                    <strong>Total</strong><strong>{money(total)}</strong>
                  </div>
                  <button className="primary-btn full" onClick={() => setView('checkout')}>
                    Proceed to checkout <ChevronRight size={18} />
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        
        {view === 'checkout' && (
          <section className="page-section narrow">
            <div className="page-title">
              <span className="eyebrow">ONE LAST STEP</span>
              <h1>Checkout</h1>
              <p>Confirm your delivery details.</p>
            </div>
            <div className="checkout-card">
              <h3><MapPin /> Delivery address</h3>
              <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} />
              <small>Enter a complete address in your delivery area.</small>
            </div>
            <div className="checkout-card">
              <h3><Clock3 /> Delivery time</h3>
              <div className="delivery-choice">
                <b>As soon as possible</b>
                <span>Usually 25–45 minutes</span>
                <CheckCircle2 />
              </div>
            </div>
            <div className="checkout-card">
              <h3><ShoppingBag /> Payment method</h3>
              {['Pay on delivery', 'Bank transfer', 'Card payment'].map(method => (
                <label className="payment-option" key={method}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
            <div className="summary-card">
              <h3>Payment summary</h3>
              <div><span>Subtotal</span><b>{money(subtotal)}</b></div>
              <div><span>Delivery &amp; service</span><b>{money(deliveryFee + serviceFee)}</b></div>
              <div className="summary-total">
                <strong>Total to pay</strong><strong>{money(total)}</strong>
              </div>
              <button
                className="primary-btn full"
                disabled={!cart.length || !address.trim()}
                onClick={placeOrder}
              >
                Place order · {money(total)}
              </button>
              <p className="fine-print">Demo checkout: no real payment will be collected.</p>
            </div>
          </section>
        )}

        {/* ── Orders ── */}
        {view === 'orders' && (
          <section className="page-section">
            <div className="page-title">
              <span className="eyebrow">YOUR DELIVERIES</span>
              <h1>My orders</h1>
              <p>Keep up with your latest orders.</p>
            </div>
            {!orders.length ? (
              <div className="empty-state">
                <span><PackageCheck size={42} /></span>
                <h3>No orders yet</h3>
                <p>Your orders will show up here.</p>
                <button className="primary-btn" onClick={() => setView('categories')}>Order something</button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div className="order-card" key={order.id}>
                    <div className="order-head">
                      <div><b>{order.id}</b><small>{order.createdAt}</small></div>
                      <span className="status-pill">{order.status}</span>
                    </div>
                    {order.items.map(line => (
                      <div className="order-item" key={line.food.id}>
                        <img src={line.food.image} alt="" />
                        <span>{line.quantity} × {line.food.name}</span>
                        <b>{money(line.food.price * line.quantity)}</b>
                      </div>
                    ))}
                    <div className="order-foot">
                      <span>Delivering to: {order.address}</span>
                      <b>{money(order.total)}</b>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        
        {view === 'profile' && (
          <section className="page-section narrow">
            <div className="page-title">
              <span className="eyebrow">YOUR ACCOUNT</span>
              <h1>Profile</h1>
              <p>Manage your AMOGE experience.</p>
            </div>
            <div className="profile-card">
              <div className="avatar">A</div>
              <div>
                <h3>Welcome to AMOGE</h3>
                <p>Guest account · Lagos, Nigeria</p>
              </div>
            </div>
            <div className="profile-links">
              <button onClick={() => setView('orders')}><PackageCheck /> My orders <ChevronRight /></button>
              <button onClick={() => setView('favorites')}><Heart /> Favorites <ChevronRight /></button>
              <button onClick={() => setView('cart')}><ShoppingCart /> Shopping cart <ChevronRight /></button>
            </div>
            <div className="checkout-card">
              <h3>Preview dashboard</h3>
              <p className="muted">Switch between demo roles to preview the different platform dashboards.</p>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option>Customer</option>
                <option>Restaurant manager</option>
                <option>Delivery rider</option>
                <option>Super admin</option>
              </select>
              <button className="primary-btn full" onClick={() => setView('dashboard')}>
                Open {role} dashboard
              </button>
            </div>
          </section>
        )}

        {/* ── Dashboard ── */}
        {view === 'dashboard' && (
          <section className="page-section">
            <div className="page-title">
              <span className="eyebrow">AMOGE CONTROL CENTRE</span>
              <h1>{role} dashboard</h1>
              <p>Demo dashboard preview. Live data will come from the backend.</p>
            </div>
            <div className="dashboard-stats">
              <div><Store /><small>Restaurants</small><b>12</b></div>
              <div><ShoppingBag /><small>Orders today</small><b>{orders.length}</b></div>
              <div><Bike /><small>Active riders</small><b>8</b></div>
              <div>
                <ChartNoAxesCombined />
                <small>Revenue (demo)</small>
                <b>{money(orders.reduce((s, o) => s + o.total, 0))}</b>
              </div>
            </div>
            <div className="dashboard-panel">
              <h3>Quick actions</h3>
              <div className="dashboard-actions">
                <button onClick={() => setView('categories')}>Browse menu</button>
                <button onClick={() => setView('orders')}>View orders</button>
                <button onClick={() => notify('Menu editor will be connected in the next build stage')}>
                  Manage menu
                </button>
                <button onClick={() => notify('Rider assignment will be connected to the backend')}>
                  Manage deliveries
                </button>
              </div>
            </div>
            <button className="text-link" onClick={() => setView('profile')}>
              <ArrowLeft size={16} /> Back to profile
            </button>
          </section>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">A</span>
          <b>AMOGE.</b>
          <p>Good food. Good mood. Delivered.</p>
        </div>
        <div>
          <b>Explore</b>
          <button onClick={() => setView('categories')}>Browse food</button>
          <button onClick={() => setView('favorites')}>Favorites</button>
        </div>
        <div>
          <b>Your orders</b>
          <button onClick={() => setView('orders')}>Order history</button>
          <button onClick={() => setView('profile')}>Your account</button>
        </div>
        <small>© 2026 AMOGE. Demo frontend for Nigeria.</small>
      </footer>

      {/* ── Food detail modal ── */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="food-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X /></button>
            <img src={selected.image} alt={selected.name} />
            <div className="modal-content">
              <span className="eyebrow">{selected.restaurant}</span>
              <h2>{selected.name}</h2>
              <div className="food-meta">
                <span><Star size={14} fill="currentColor" /> {selected.rating}</span>
                <span><Clock3 size={14} /> {selected.time}</span>
              </div>
              <p>{selected.description}</p>
              <div className="modal-buy">
                <div>
                  <strong>{money(selected.price * quantity)}</strong>
                  <small>Quantity</small>
                </div>
                <div className="qty-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button>
                </div>
              </div>
              <button
                className="primary-btn full"
                onClick={() => { addToCart(selected, quantity); setSelected(null) }}
              >
                Add to cart · {money(selected.price * quantity)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />{toast}
        </div>
      )}

      <BottomNav />
    </div>
  )
}
