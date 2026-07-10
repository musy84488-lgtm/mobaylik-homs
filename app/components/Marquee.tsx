'use client'

export default function Marquee() {
  const items = [
    '🎁 توصيل مجاني لحمص',
    '💰 ضمان شهر على كل جهاز',
    '🚚 توصيل خلال 24 ساعة',
    '🔒 دفع آمن عند الاستلام',
    '⭐ أفضل الأسعار مضمونة',
    '📞 دعم فني على مدار الساعة',
  ]

  return (
    <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-y border-primary/20">
      <div className="marquee-container py-3">
        <div className="marquee-content">
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 mx-8 text-sm font-medium text-primary"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
