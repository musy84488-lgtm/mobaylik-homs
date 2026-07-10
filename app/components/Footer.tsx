'use client'

import Link from 'next/link'
import { FiPhone, FiMapPin, FiClock, FiTruck, FiShield, FiHeart } from 'react-icons/fi'
import { storeInfo } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-gray-800 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text">موبايلك حمص</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              متجر متخصص في بيع الهواتف المحمولة والإكسسوارات في حمص. نقدم أفضل المنتجات بأسعار تنافسية مع ضمان وجودة مضمونة.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FiMapPin className="text-primary flex-shrink-0" />
              <span>{storeInfo.address}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'الصفحة الرئيسية' },
                { href: '/products?category=new-phones', label: 'هواتف جديدة' },
                { href: '/products?category=used-phones', label: 'هواتف مستعملة' },
                { href: '/products?category=accessories', label: 'إكسسوارات' },
                { href: '/products?category=parts', label: 'قطع غيار' },
                { href: '/cart', label: 'سلة المشتريات' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">خدماتنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiTruck className="text-primary" />
                <span>{storeInfo.delivery}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiShield className="text-primary" />
                <span>{storeInfo.warranty}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiClock className="text-primary" />
                <span>ساعات العمل: {storeInfo.workingHours}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiPhone className="text-primary" />
                <span>دعم فني على مدار الساعة</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">تواصل معنا</h4>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-dark border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">📞 للطلب والاستفسار</p>
                <a
                  href={`tel:${storeInfo.phone.replace(/\s/g, '')}`}
                  className="text-lg font-bold text-primary hover:text-primary-light transition-colors"
                >
                  {storeInfo.phone}
                </a>
                <p className="text-xs text-gray-500 mt-1">واتساب متاح - ساعات العمل: 9 ص - 9 م</p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary-dark/10 border border-primary/20">
                <p className="text-sm text-gray-400 mb-1">🏪 هل تريد متجراً مشابهاً؟</p>
                <a
                  href={storeInfo.developerWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-primary hover:text-primary-light transition-colors"
                >
                  {storeInfo.developerPhone}
                </a>
                <p className="text-xs text-gray-500 mt-1">تصميم وتطوير متاجر إلكترونية احترافية</p>
              </div>

              <a
                href={storeInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-colors"
              >
                <span>💬 تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 موبايلك حمص. جميع الحقوق محفوظة.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              صنع بـ <FiHeart className="text-danger" /> في حمص
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
