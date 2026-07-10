# 🏪 موبايلك حمص

متجر إلكتروني احترافي لبيع الهواتف المحمولة والإكسسوارات في حمص - سوريا.

## ✨ المميزات

- 🎨 تصميم احترافي Dark Mode
- 📱 متجاوب 100% (Mobile-first)
- 🛒 سلة مشتريات كاملة
- 📦 إدارة طلبات
- 💾 تخزين محلي (LocalStorage)
- 🔥 Supabase جاهز للربط
- 💬 زر واتساب عائم
- 🔍 بحث وتصفية منتجات
- ⭐ تقييمات المنتجات

## 🚀 التشغيل

### 1. تثبيت الحزم
```bash
npm install
```

### 2. تشغيل التطوير
```bash
npm run dev
```

### 3. البناء للإنتاج
```bash
npm run build
```

## 🔧 Supabase Setup

1. أنشئ حساباً على [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. انسخ مفاتيح الـ API
4. أضفها في ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### جداول قاعدة البيانات

```sql
-- جدول المنتجات
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL,
  image TEXT,
  badge TEXT,
  specs TEXT[],
  description TEXT,
  in_stock BOOLEAN DEFAULT true,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول الطلبات
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📞 التواصل

- **للطلب:** +963 967 768 408
- **للتطوير:** 0938626949

## 📝 الترخيص

MIT License
