'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft, FiTruck } from 'react-icons/fi'
import { getCart, removeFromCart, updateQuantity, getCartTotal, clearCart, type CartItem, formatPrice } from '@/lib/data'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCart(getCart())
    setIsLoading(false)
  }, [])

  const handleRemove = (productId: string) => {
    setCart(removeFromCart(productId))
    window.dispatchEvent(new Event('storage'))
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(updateQuantity(productId, newQuantity))
    window.dispatchEvent(new Event('storage'))
  }

  const handleClearCart = () => {
    if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
      clearCart()
      setCart([])
      window.dispatchEvent(new Event('storage'))
    }
  }

  const subtotal = getCartTotal()
  const deliveryFee = subtotal > 0 ? 0 : 0 // Free delivery
  const total = subtotal + deliveryFee

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-white mb-4">سلة المشتريات فارغة</h2>
          <p className="text-gray-400 mb-8">ابدأ التسوق واكتشف منتجاتنا الرائعة</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-primary text-dark font-bold"
          >
            <FiShoppingBag />
            <span>تسوق الآن</span>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-dark-card border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              سلة المشتريات
            </h1>
            <p className="text-gray-400">
              لديك {cart.reduce((sum, item) => sum + item.quantity, 0)} منتج في السلة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear Cart */}
              <div className="flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 text-danger hover:text-danger-dark transition-colors text-sm"
                >
                  <FiTrash2 />
                  <span>إفراغ السلة</span>
                </button>
              </div>

              {/* Items */}
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card rounded-2xl p-4 sm:p-6 border border-gray-800 flex flex-col sm:flex-row gap-4"
                >
                  {/* Image */}
                  <Link href={`/products/${item.id}`} className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-bold text-white hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400">{item.specs[0]}</p>
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center bg-dark rounded-xl border border-gray-800">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      >
                        <FiMinus />
                      </button>
                      <span className="w-10 text-center font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="text-xl font-black text-white">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="flex items-center gap-1 text-danger hover:text-danger-dark transition-colors text-sm mt-2"
                      >
                        <FiTrash2 />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-dark-card rounded-2xl p-6 border border-gray-800 space-y-6">
                <h3 className="text-xl font-bold text-white">ملخص الطلب</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>المجموع الفرعي</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiTruck className="text-success" />
                      رسوم التوصيل
                    </span>
                    <span className="text-success">مجاني</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3">
                    <div className="flex justify-between text-xl font-black text-white">
                      <span>الإجمالي</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="block w-full py-4 rounded-xl btn-success text-white font-bold text-center text-lg"
                >
                  إتمام الطلب
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-primary transition-colors"
                >
                  <FiArrowLeft />
                  <span>مواصلة التسوق</span>
                </Link>

                {/* Delivery Info */}
                <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                  <p className="text-sm text-success text-center">
                    🚚 توصيل مجاني داخل حمص
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
