# HTML

A modern HTML project utilizing Tailwind CSS for building responsive web applications with minimal setup.

## 🗄️ قاعدة البيانات (Supabase)

يستخدم هذا المشروع Supabase كقاعدة بيانات. للإعداد:

### الإعداد الأولي

1. **إنشاء مشروع Supabase جديد:**
   - اذهب إلى [supabase.com](https://supabase.com)
   - أنشئ حساب جديد أو سجل الدخول
   - أنشئ مشروع جديد

2. **الحصول على بيانات الاتصال:**
   - من لوحة تحكم Supabase، اذهب إلى Settings > API
   - انسخ `Project URL` و `anon public key`

3. **تحديث إعدادات الاتصال:**
   - افتح ملف `public/supabase-config.js`
   - استبدل `SUPABASE_URL` و `SUPABASE_ANON_KEY` بالقيم الخاصة بك

### إعداد قاعدة البيانات

1. **تشغيل ملفات الهجرة:**
   - في لوحة تحكم Supabase، اذهب إلى SQL Editor
   - انسخ والصق محتوى كل ملف من مجلد `supabase/migrations/`
   - شغل الملفات بالترتيب التالي:
     1. `create_bookings_table.sql`
     2. `create_user_profiles.sql`
     3. `add_sample_data.sql` (اختياري للبيانات التجريبية)

2. **التحقق من الإعداد:**
   - تأكد من إنشاء الجداول في قسم Table Editor
   - تحقق من تفعيل Row Level Security (RLS)

### هيكل قاعدة البيانات

#### جدول `bookings`
- معلومات الحجوزات الأساسية
- ربط بالمستخدم عبر `user_id`
- حماية بـ RLS للوصول الآمن

#### جدول `user_profiles`
- ملفات المستخدمين الشخصية
- معلومات إضافية عن المستخدم والعمل
- إنشاء تلقائي عند التسجيل

#### عرض `booking_stats`
- إحصائيات سريعة للحجوزات
- حسابات تلقائية للإيرادات والمدفوعات

## 🚀 Features

- **HTML5** - Modern HTML structure with best practices
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Custom Components** - Pre-built component classes for buttons and containers
- **NPM Scripts** - Easy-to-use commands for development and building
- **Responsive Design** - Mobile-first approach for all screen sizes

## 📋 Prerequisites

- Node.js (v12.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
html_app/
├── css/
│   ├── tailwind.css   # Tailwind source file with custom utilities
│   └── main.css       # Compiled CSS (generated)
├── pages/             # HTML pages
├── index.html         # Main entry point
├── package.json       # Project dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Custom utility classes include:


## 🧩 Customization

To customize the Tailwind configuration, edit the `tailwind.config.js` file:


## 📦 Build for Production

Build the CSS for production:

```bash
npm run build:css
# or
yarn build:css
```

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by HTML and Tailwind CSS

Built with ❤️ on Rocket.new
