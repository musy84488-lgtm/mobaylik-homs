'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiPhone } from 'react-icons/fi'
import { getCartCount } from '@/lib/data'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }
    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    const interval = setInterval(updateCartCount, 1000)
    return () => {
      window.removeEventListener('storage', updateCartCount)
      clearInterval(interval)
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/products?category=new-phones', label: 'هواتف جديدة' },
    { href: '/products?category=used-phones', label: 'هواتف مستعملة' },
    { href: '/products?category=accessories', label: 'إكسسوارات' },
    { href: '/products?category=parts', label: 'قطع غيار' },
  ]

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xl">📱</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">موبايلك حمص</h1>
              <p className="text-xs text-gray-400 -mt-1">أفضل الهواتف بأفضل الأسعار</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="ابحث عن هاتفك..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-dark-card border border-gray-700 text-white placeholder-gray-500 text-sm focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-dark-card transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Phone */}
            <a
              href="tel:+963967768408"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-card hover:bg-dark-lighter transition-colors"
            >
              <FiPhone className="text-primary" />
              <span className="text-sm text-gray-300">+963 967 768 408</span>
            </a>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-dark-card hover:bg-dark-lighter transition-colors group"
            >
              <FiShoppingCart className="text-xl text-gray-300 group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-dark text-xs font-bold flex items-center justify-center animate-pulse-glow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-dark-card hover:bg-dark-lighter transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-gray-800">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن هاتفك..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl bg-dark-card border border-gray-700 text-white placeholder-gray-500 text-sm"
              />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-dark-card transition-all"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="tel:+963967768408"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary"
            >
              <FiPhone />
              <span>+963 967 768 408</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
