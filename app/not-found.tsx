'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiHome } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-4"
      >
        <div className="text-8xl mb-6">📱❓</div>
        <h1 className="text-6xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">
          الصفحة غير موجودة
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة للصفحة الرئيسية أو تصفح منتجاتنا.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-primary text-dark font-bold"
          >
            <FiHome />
            <span>الصفحة الرئيسية</span>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-dark-card border border-gray-700 text-white font-bold hover:border-primary transition-colors"
          >
            <FiArrowLeft />
            <span>تصفح المنتجات</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
