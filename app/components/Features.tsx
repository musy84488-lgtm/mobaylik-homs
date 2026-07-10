'use client'

import { motion } from 'framer-motion'
import { FiTruck, FiShield, FiHeadphones, FiTag } from 'react-icons/fi'

const features = [
  {
    icon: FiTruck,
    title: 'توصيل سريع',
    description: 'توصيل مجاني داخل حمص خلال 24 ساعة',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: FiShield,
    title: 'ضمان شامل',
    description: 'ضمان شهر كامل على كل جهاز نبيعه',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: FiHeadphones,
    title: 'دعم فني',
    description: 'فريق دعم متخصص جاهز لمساعدتك',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: FiTag,
    title: 'أسعار تنافسية',
    description: 'أفضل الأسعار في السوق مع جودة مضمونة',
    color: 'from-primary to-primary-dark',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-dark-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">لماذا تختار موبايلك حمص؟</h2>
          <p className="text-gray-400">نقدم لك أفضل تجربة تسوق للهواتف المحمولة</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-dark-card border border-gray-800 hover:border-primary/30 transition-all card-hover"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
