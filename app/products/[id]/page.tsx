'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiArrowRight, FiCheck, FiStar, FiShare2, FiHeart } from 'react-icons/fi'
import { demoProducts, addToCart, formatPrice, type Product } from '@/lib/data'
import ProductCard from '../../components/ProductCard'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isAdded, setIsAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const found = demoProducts.find(p => p.id === productId)
    if (found) {
      setProduct(found)
      // Get related products from same category
      const related = demoProducts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
      window.dispatchEvent(new Event('storage'))
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-xl font-bold text-white">المنتج غير موجود</h2>
          <Link href="/products" className="text-primary mt-4 inline-block">
            العودة للمنتجات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-dark-card border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <FiArrowRight className="rotate-180" />
            <Link href="/products" className="hover:text-primary transition-colors">المنتجات</Link>
            <FiArrowRight className="rotate-180" />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-dark-card border border-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold text-white ${
                    product.badge === 'جديد' ? 'bg-blue-500' :
                    product.badge === 'مستعمل' ? 'bg-gray-500' :
                    'bg-danger'
                  }`}>
                    {product.badge}
                  </span>
                )}

                {/* Like button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-dark/80 flex items-center justify-center hover:bg-dark transition-colors"
                >
                  <FiHeart className={`text-xl ${isLiked ? 'text-danger fill-danger' : 'text-white'}`} />
                </button>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'text-primary fill-primary' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">({product.rating} / 5)</span>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 rounded-full bg-danger/10 text-danger text-sm font-bold">
                    خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-success' : 'bg-danger'} animate-pulse`} />
                <span className={product.inStock ? 'text-success' : 'text-danger'}>
                  {product.inStock ? 'متوفر في المخزن' : 'غير متوفر'}
                </span>
              </div>

              {/* Specs */}
              <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">المواصفات</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FiCheck className="text-primary flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center bg-dark-card rounded-xl border border-gray-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-success text-white'
                      : 'btn-primary text-dark'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <FiCheck className="text-xl" />
                      <span>تمت الإضافة للسلة!</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="text-xl" />
                      <span>أضف للسلة - {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Inquiry */}
              <a
                href={`https://wa.me/963967768408?text=مرحباً، أريد الاستفسار عن: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-colors"
              >
                <span>💬 استفسر عبر واتساب</span>
              </a>

              {/* Share */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href,
                    })
                  }
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <FiShare2 />
                <span>مشاركة المنتج</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-dark-card/30 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
