# دليل إعداد Supabase

## نظرة عامة
يحتوي هذا المجلد على ملفات الهجرة (migrations) وإعدادات Supabase اللازمة لتشغيل نظام إدارة حجوزات الشاليه.

## ملفات الهجرة

### 1. `create_bookings_table.sql`
- إنشاء جدول الحجوزات الرئيسي
- إعداد Row Level Security (RLS)
- إنشاء الفهارس لتحسين الأداء
- إضافة دالة تحديث التاريخ التلقائي

### 2. `create_user_profiles.sql`
- إنشاء جدول ملفات المستخدمين
- ربط تلقائي مع جدول المصادقة
- إنشاء ملف شخصي تلقائياً عند التسجيل

### 3. `add_sample_data.sql`
- بيانات تجريبية للاختبار
- إنشاء views للإحصائيات
- يمكن تخطي هذا الملف في الإنتاج

## خطوات التنفيذ

1. **إنشاء مشروع Supabase:**
   ```
   - اذهب إلى https://supabase.com
   - أنشئ مشروع جديد
   - احفظ Project URL و anon key
   ```

2. **تحديث إعدادات الاتصال:**
   ```javascript
   // في ملف public/supabase-config.js
   const SUPABASE_URL = 'your-project-url';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

3. **تشغيل ملفات الهجرة:**
   ```sql
   -- في SQL Editor في Supabase Dashboard
   -- شغل الملفات بالترتيب:
   -- 1. create_bookings_table.sql
   -- 2. create_user_profiles.sql
   -- 3. add_sample_data.sql (اختياري)
   ```

## الأمان

### Row Level Security (RLS)
- جميع الجداول محمية بـ RLS
- المستخدمون يمكنهم الوصول لبياناتهم فقط
- سياسات منفصلة للقراءة والكتابة والتحديث والحذف

### المصادقة
- استخدام نظام مصادقة Supabase المدمج
- دعم التسجيل بالبريد الإلكتروني وكلمة المرور
- إنشاء ملف شخصي تلقائياً

## الاستخدام

### إضافة حجز جديد
```javascript
const { data, error } = await Database.addBooking({
  customer_name: 'اسم العميل',
  check_in_date: '2025-02-01',
  check_out_date: '2025-02-03',
  // ... باقي البيانات
});
```

### جلب الحجوزات
```javascript
const { data, error } = await Database.getBookings(userId);
```

### تحديث حجز
```javascript
const { data, error } = await Database.updateBooking(bookingId, {
  payment_status: 'paid',
  paid_amount: 1000
});
```

## استكشاف الأخطاء

### مشاكل شائعة:
1. **خطأ في الاتصال:** تأكد من صحة URL و API Key
2. **خطأ في الصلاحيات:** تحقق من تفعيل RLS والسياسات
3. **خطأ في البيانات:** تأكد من تطابق أسماء الأعمدة

### فحص الحالة:
```sql
-- فحص الجداول
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- فحص السياسات
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

## الدعم
للمساعدة الإضافية، راجع:
- [وثائق Supabase](https://supabase.com/docs)
- [دليل Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)