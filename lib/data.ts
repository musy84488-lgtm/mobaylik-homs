export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  badge?: string
  specs: string[]
  description: string
  inStock: boolean
  rating: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  phone: string
  address: string
  city: string
  notes?: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  createdAt: string
}

// Demo products
export const demoProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max - 256GB',
    price: 8500000,
    originalPrice: 9200000,
    category: 'new-phones',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400',
    badge: 'جديد',
    specs: ['شاشة 6.7"', 'معالج A17 Pro', 'بطارية 4422mAh', 'كاميرا 48MP'],
    description: 'أحدث هاتف من Apple مع معالج A17 Pro وتصميم تيتانيوم فاخر',
    inStock: true,
    rating: 5,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra - 512GB',
    price: 7200000,
    originalPrice: 7800000,
    category: 'new-phones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    badge: 'عرض خاص',
    specs: ['شاشة 6.8"', 'معالج Snapdragon 8 Gen 3', 'بطارية 5000mAh', 'كاميرا 200MP'],
    description: 'الهاتف الأقوى من Samsung مع قلم S Pen مدمج',
    inStock: true,
    rating: 5,
  },
  {
    id: '3',
    name: 'Xiaomi 14 Ultra - 256GB',
    price: 4800000,
    category: 'new-phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    specs: ['شاشة 6.73"', 'معالج Snapdragon 8 Gen 3', 'بطارية 5300mAh', 'كاميرا 50MP'],
    description: 'هاتف Xiaomi الرائد مع كاميرا Leica احترافية',
    inStock: true,
    rating: 4,
  },
  {
    id: '4',
    name: 'iPhone 13 Pro - 128GB (مستعمل نظيف)',
    price: 3200000,
    originalPrice: 4500000,
    category: 'used-phones',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
    badge: 'مستعمل',
    specs: ['شاشة 6.1"', 'معالج A15 Bionic', 'بطارية 3095mAh', 'كاميرا 12MP'],
    description: 'هاتف مستعمل بحالة ممتازة، بطارية 92%',
    inStock: true,
    rating: 4,
  },
  {
    id: '5',
    name: 'Samsung Galaxy A54 - 128GB',
    price: 1800000,
    category: 'new-phones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    specs: ['شاشة 6.4"', 'معالج Exynos 1380', 'بطارية 5000mAh', 'كاميرا 50MP'],
    description: 'هاتف متوسط المدى بأداء ممتاز وبطارية تدوم طويلاً',
    inStock: true,
    rating: 4,
  },
  {
    id: '6',
    name: 'سماعات AirPods Pro 2',
    price: 950000,
    originalPrice: 1100000,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
    badge: 'عرض خاص',
    specs: ['إلغاء ضوضاء نشط', 'صوت مكاني', 'مقاومة للعرق', 'شحن MagSafe'],
    description: 'سماعات Apple اللاسلكية مع إلغاء الضوضاء الاحترافي',
    inStock: true,
    rating: 5,
  },
  {
    id: '7',
    name: 'شاحن سريع 65W',
    price: 180000,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400',
    specs: ['65 واط', 'USB-C', 'شحن سريع', 'حماية من الحرارة'],
    description: 'شاحن سريع متعدد المنافذ لجميع الأجهزة',
    inStock: true,
    rating: 4,
  },
  {
    id: '8',
    name: 'كفر حماية iPhone 15 MagSafe',
    price: 120000,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
    specs: ['متوافق MagSafe', 'حماية كاملة', 'مضاد للصدمات', 'تصميم رفيع'],
    description: 'كفر حماية فاخر مع دعم MagSafe',
    inStock: true,
    rating: 4,
  },
  {
    id: '9',
    name: 'شاشة Samsung S23 Ultra أصلية',
    price: 650000,
    category: 'parts',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
    specs: ['6.8" AMOLED', '120Hz', 'أصلية 100%', 'ضمان تركيب'],
    description: 'شاشة أصلية مع ضمان تركيب مجاني',
    inStock: true,
    rating: 5,
  },
  {
    id: '10',
    name: 'بطارية iPhone 14 Pro أصلية',
    price: 380000,
    category: 'parts',
    image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=400',
    specs: ['3200mAh', 'أصلية Apple', 'ضمان 6 أشهر', 'تركيب مجاني'],
    description: 'بطارية أصلية مع ضمان وتركيب مجاني في المحل',
    inStock: true,
    rating: 5,
  },
  {
    id: '11',
    name: 'iPhone 14 Pro Max - 256GB',
    price: 6500000,
    originalPrice: 7500000,
    category: 'new-phones',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    badge: 'عرض خاص',
    specs: ['شاشة 6.7"', 'معالج A16 Bionic', 'بطارية 4323mAh', 'كاميرا 48MP'],
    description: 'هاتف Apple الرائد مع Dynamic Island وتصميم فاخر',
    inStock: true,
    rating: 5,
  },
  {
    id: '12',
    name: 'Samsung Galaxy Z Flip 5 - 256GB',
    price: 5500000,
    category: 'new-phones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    specs: ['شاشة 6.7" قابلة للطي', 'معالج Snapdragon 8 Gen 2', 'بطارية 3700mAh'],
    description: 'هاتف قابل للطي بتصميم أنيق ومبتكر',
    inStock: true,
    rating: 4,
  },
]

// Category labels
export const categories = [
  { id: 'all', name: 'الكل', icon: '📱' },
  { id: 'new-phones', name: 'هواتف جديدة', icon: '📱' },
  { id: 'used-phones', name: 'هواتف مستعملة', icon: '🔄' },
  { id: 'accessories', name: 'إكسسوارات', icon: '🎧' },
  { id: 'parts', name: 'قطع غيار', icon: '🔧' },
]

// Cart functions using localStorage
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('mobaylik-cart')
  return cart ? JSON.parse(cart) : []
}

export function addToCart(product: Product) {
  const cart = getCart()
  const existingItem = cart.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem('mobaylik-cart', JSON.stringify(cart))
  return cart
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.id !== productId)
  localStorage.setItem('mobaylik-cart', JSON.stringify(cart))
  return cart
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCart()
  const item = cart.find(item => item.id === productId)
  if (item) {
    item.quantity = Math.max(1, quantity)
  }
  localStorage.setItem('mobaylik-cart', JSON.stringify(cart))
  return cart
}

export function clearCart() {
  localStorage.removeItem('mobaylik-cart')
}

export function getCartTotal(): number {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartCount(): number {
  return getCart().reduce((count, item) => count + item.quantity, 0)
}

// Orders functions using localStorage
export function getOrders(): Order[] {
  if (typeof window === 'undefined') return []
  const orders = localStorage.getItem('mobaylik-orders')
  return orders ? JSON.parse(orders) : []
}

export function addOrder(order: Order) {
  const orders = getOrders()
  orders.unshift(order)
  localStorage.setItem('mobaylik-orders', JSON.stringify(orders))
  return orders
}

// Format price in Syrian Pounds
export function formatPrice(price: number): string {
  return price.toLocaleString('ar-SY') + ' ل.س'
}

// Store info
export const storeInfo = {
  name: 'موبايلك حمص',
  phone: '+963 967 768 408',
  whatsapp: 'https://wa.me/963967768408',
  developerPhone: '0938626949',
  developerWhatsapp: 'https://wa.me/963938626949',
  address: 'حمص - شارع الحديقة - مقابل جامع خالد بن الوليد',
  workingHours: '9:00 ص - 9:00 م',
  delivery: 'توصيل مجاني داخل حمص',
  warranty: 'ضمان شهر على كل جهاز',
}
