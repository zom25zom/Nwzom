# دليل إعداد قاعدة البيانات

## ✅ تم تحديث إعدادات الاتصال

تم تحديث ملف `public/supabase-config.js` بمعلومات مشروعك:
- **Project URL:** https://zjtrypxtkqnblyufflug.supabase.co
- **API Key:** تم إدراجه في الملف

## 📋 الخطوات التالية المطلوبة:

### 1. إعداد قاعدة البيانات
اذهب إلى لوحة تحكم Supabase: https://zjtrypxtkqnblyufflug.supabase.co

### 2. تشغيل ملفات الهجرة (SQL)
في **SQL Editor** في Supabase، شغل الملفات التالية بالترتيب:

#### أ) إنشاء جدول الحجوزات:
```sql
-- انسخ والصق محتوى ملف: supabase/migrations/20250720223344_curly_stream.sql
```

#### ب) إنشاء جدول ملفات المستخدمين:
```sql
-- انسخ والصق محتوى ملف: supabase/migrations/20250720223401_odd_trail.sql
```

#### ج) إضافة البيانات التجريبية (اختياري):
```sql
-- انسخ والصق محتوى ملف: supabase/migrations/20250720223412_summer_term.sql
```

### 3. التحقق من الإعداد
بعد تشغيل ملفات SQL:
1. اذهب إلى **Table Editor** في Supabase
2. تأكد من وجود الجداول التالية:
   - `bookings` (جدول الحجوزات)
   - `user_profiles` (ملفات المستخدمين)
3. تحقق من تفعيل **Row Level Security (RLS)** على الجداول

### 4. اختبار التطبيق
1. افتح `index.html` في المتصفح
2. سجل حساب جديد
3. جرب إضافة حجز جديد
4. تحقق من ظهور البيانات في لوحة تحكم Supabase

## 🔧 معلومات إضافية:

### كلمة مرور قاعدة البيانات:
```
Aa5333616nwaf@#
```
(ستحتاجها فقط للاتصال المباشر بقاعدة البيانات)

### رابط لوحة التحكم:
https://supabase.com/dashboard/project/zjtrypxtkqnblyufflug

## ⚠️ ملاحظات أمنية:
- تأكد من عدم مشاركة API Key مع أشخاص غير مخولين
- استخدم Environment Variables في الإنتاج
- راجع إعدادات RLS للتأكد من الأمان

## 🆘 في حالة وجود مشاكل:
1. تحقق من صحة URL و API Key
2. تأكد من تشغيل جميع ملفات SQL
3. راجع Console في المتصفح للأخطاء
4. تحقق من إعدادات CORS في Supabase
</parameter>