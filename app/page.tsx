'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiShoppingBag, FiPercent } from 'react-icons/fi'
import ProductCard from './components/ProductCard'
import Marquee from './components/Marquee'
import Features from './components/Features'
import { demoProducts, categories, formatPrice } from '@/lib/data'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState(demoProducts)

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(demoProducts)
    } else {
      setFilteredProducts(demoProducts.filter(p => p.category === activeCategory))
    }
  }, [activeCategory])

  const featuredProducts = demoProducts.filter(p => p.badge === 'عرض خاص').slice(0, 4)
  const newProducts = demoProducts.filter(p => p.badge === 'جديد').slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-dark">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(245,158,11,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(16,185,129,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">متجر الهواتف الأول في حمص</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                اكتشف أحدث
                <span className="gradient-text block">الهواتف المحمولة</span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                أفضل الماركات العالمية بأسعار تنافسية. توصيل مجاني داخل حمص وضمان شهر على كل جهاز.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-primary text-dark font-bold text-lg"
                >
                  <FiShoppingBag />
                  <span>تسوق الآن</span>
                </Link>
                <Link
                  href="/products?category=used-phones"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-dark-card border border-gray-700 text-white font-bold text-lg hover:border-primary transition-colors"
                >
                  <FiPercent />
                  <span>عروض مستعملة</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
                <div>
                  <p className="text-2xl font-black text-primary">500+</p>
                  <p className="text-sm text-gray-500">عميل سعيد</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-primary">50+</p>
                  <p className="text-sm text-gray-500">منتج متاح</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-primary">24h</p>
                  <p className="text-sm text-gray-500">توصيل سريع</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-3xl blur-3xl" />
                <div className="relative bg-dark-card rounded-3xl p-8 border border-gray-800">
                  <div className="grid grid-cols-2 gap-4">
                    {demoProducts.slice(0, 4).map((product, i) => (
                      <div
                        key={product.id}
                        className="bg-dark rounded-xl p-3 border border-gray-800 hover:border-primary/30 transition-all"
                      >
                        <div className="aspect-square rounded-lg bg-dark-lighter mb-2 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1">{product.name}</p>
                        <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-dark'
                    : 'bg-dark-card text-gray-400 hover:text-white border border-gray-800 hover:border-primary/30'
                }`}
              >
                <span className="ml-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {activeCategory === 'all' ? 'جميع المنتجات' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <Link
              href="/products"
              className="flex items-center gap-1 text-primary hover:text-primary-light transition-colors text-sm font-medium"
            >
              <span>عرض الكل</span>
              <FiArrowLeft />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-danger/10 text-danger text-sm font-bold mb-4">
              🔥 عروض خاصة
            </span>
            <h2 className="text-3xl font-bold text-white">خصومات حصرية لفترة محدودة</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-4">
              ✨ وصل حديثاً
            </span>
            <h2 className="text-3xl font-bold text-white">أحدث الواصلين</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-dark-card to-primary-dark/20 border border-primary/20 p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.1),transparent_70%)]" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                هل تريد متجراً إلكترونياً مثل هذا؟
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                نصمم ونطور متاجر إلكترونية احترافية مخصصة لنشاطك التجاري. تواصل معنا الآن واحصل على متجرك الخاص!
              </p>
              <a
                href="https://wa.me/963938626949"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-primary text-dark font-bold text-lg"
              >
                <span>📞 تواصل معنا: 0938626949</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
