'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { addToCart, formatPrice, type Product } from '@/lib/data'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
    window.dispatchEvent(new Event('storage'))
  }

  const getBadgeColor = () => {
    switch (product.badge) {
      case 'جديد':
        return 'bg-blue-500'
      case 'مستعمل':
        return 'bg-gray-500'
      case 'عرض خاص':
        return 'bg-danger'
      default:
        return 'bg-primary'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-dark-card rounded-2xl overflow-hidden card-hover border border-gray-800 hover:border-primary/30">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-dark-lighter">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Badge */}
            {product.badge && (
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor()}`}>
                {product.badge}
              </span>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                عرض التفاصيل
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? 'text-primary fill-primary' : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 mr-1">({product.rating})</span>
            </div>

            {/* Name */}
            <h3 className="font-bold text-white text-sm line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Specs preview */}
            <p className="text-xs text-gray-500 line-clamp-1">
              {product.specs.slice(0, 2).join(' • ')}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                isAdded
                  ? 'bg-success text-white'
                  : 'btn-primary text-dark'
              }`}
            >
              {isAdded ? (
                <>
                  <span>✓ تمت الإضافة</span>
                </>
              ) : (
                <>
                  <FiShoppingCart />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
