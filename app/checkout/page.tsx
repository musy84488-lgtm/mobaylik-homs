'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiArrowLeft, FiCheck, FiMapPin, FiPhone, FiUser, FiFileText } from 'react-icons/fi'
import { getCart, getCartTotal, clearCart, addOrder, formatPrice, storeInfo, type CartItem } from '@/lib/data'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'حمص',
    address: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const cartItems = getCart()
    if (cartItems.length === 0) {
      router.push('/cart')
      return
    }
    setCart(cartItems)
  }, [router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'الاسم مطلوب'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^\d{7,10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم هاتف غير صالح'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const order = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      notes: formData.notes,
      items: cart,
      total: getCartTotal(),
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    }

    addOrder(order)
    setOrderNumber(order.id)
    clearCart()
    setIsSuccess(true)
    setIsSubmitting(false)
    window.dispatchEvent(new Event('storage'))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const subtotal = getCartTotal()
  const deliveryFee = 0
  const total = subtotal + deliveryFee

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">
            تم استلام طلبك بنجاح!
          </h2>
          <p className="text-gray-400 mb-2">
            رقم الطلب: <span className="text-primary font-bold">#{orderNumber}</span>
          </p>
          <p className="text-gray-400 mb-8">
            سنتواصل معك خلال ساعة على الرقم المسجل
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-4 rounded-xl btn-primary text-dark font-bold"
            >
              العودة للرئيسية
            </Link>
            <a
              href={storeInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-colors"
            >
              💬 متابعة الطلب عبر واتساب
            </a>
          </div>
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
              إتمام الطلب
            </h1>
            <p className="text-gray-400">
              أدخل بياناتك لإتمام عملية الشراء
            </p>
          </motion.div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Info */}
                <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <FiUser className="text-primary" />
                    معلومات العميل
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">الاسم الكامل *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="محمد أحمد"
                        className={`w-full px-4 py-3 rounded-xl bg-dark border ${
                          errors.customerName ? 'border-danger' : 'border-gray-700'
                        } text-white placeholder-gray-500 focus:border-primary transition-colors`}
                      />
                      {errors.customerName && (
                        <p className="text-danger text-sm mt-1">{errors.customerName}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">رقم الهاتف *</label>
                      <div className="relative">
                        <FiPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0938626949"
                          className={`w-full pr-10 pl-4 py-3 rounded-xl bg-dark border ${
                            errors.phone ? 'border-danger' : 'border-gray-700'
                          } text-white placeholder-gray-500 focus:border-primary transition-colors`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-danger text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">المحافظة *</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark border border-gray-700 text-white focus:border-primary transition-colors"
                      >
                        <option value="حمص">حمص</option>
                        <option value="دمشق">دمشق</option>
                        <option value="حلب">حلب</option>
                        <option value="اللاذقية">اللاذقية</option>
                        <option value="طرطوس">طرطوس</option>
                        <option value="حماة">حماة</option>
                        <option value="درعا">درعا</option>
                        <option value="السويداء">السويداء</option>
                        <option value="إدلب">إدلب</option>
                        <option value="الرقة">الرقة</option>
                        <option value="الحسكة">الحسكة</option>
                        <option value="دير الزور">دير الزور</option>
                      </select>
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">العنوان التفصيلي *</label>
                      <div className="relative">
                        <FiMapPin className="absolute right-3 top-3 text-gray-500" />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="شارع الحديقة - مقابل جامع خالد بن الوليد"
                          rows={3}
                          className={`w-full pr-10 pl-4 py-3 rounded-xl bg-dark border ${
                            errors.address ? 'border-danger' : 'border-gray-700'
                          } text-white placeholder-gray-500 focus:border-primary transition-colors resize-none`}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-danger text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">ملاحظات (اختياري)</label>
                      <div className="relative">
                        <FiFileText className="absolute right-3 top-3 text-gray-500" />
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="أي ملاحظات خاصة بالطلب..."
                          rows={2}
                          className="w-full pr-10 pl-4 py-3 rounded-xl bg-dark border border-gray-700 text-white placeholder-gray-500 focus:border-primary transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-6">طريقة الدفع</h3>
                  <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <FiCheck className="text-success" />
                      </div>
                      <div>
                        <p className="font-bold text-white">الدفع عند الاستلام</p>
                        <p className="text-sm text-gray-400">ادفع نقداً عند استلام طلبك</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Mobile */}
                <div className="lg:hidden">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl btn-success text-white font-bold text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        جاري معالجة الطلب...
                      </span>
                    ) : (
                      `تأكيد الطلب - ${formatPrice(total)}`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Items */}
                <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-4">المنتجات</h3>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-lighter flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-4">ملخص الطلب</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <span>المجموع الفرعي</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>رسوم التوصيل</span>
                      <span className="text-success">مجاني</span>
                    </div>
                    <div className="border-t border-gray-800 pt-3">
                      <div className="flex justify-between text-xl font-black text-white">
                        <span>الإجمالي</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button - Desktop */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="hidden lg:flex w-full mt-6 py-4 rounded-xl btn-success text-white font-bold text-lg items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>جاري معالجة الطلب...</span>
                      </>
                    ) : (
                      <>
                        <FiCheck />
                        <span>تأكيد الطلب</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Contact */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-gray-400 text-center">
                    لاستفساراتكم:<br />
                    <a href={`tel:${storeInfo.phone}`} className="text-primary font-bold">
                      {storeInfo.phone}
                    </a>
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
