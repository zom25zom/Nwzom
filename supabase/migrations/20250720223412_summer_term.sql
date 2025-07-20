/*
  # إضافة بيانات تجريبية

  1. بيانات تجريبية
    - إضافة بعض الحجوزات التجريبية للاختبار
    - تأكد من أن البيانات تتبع القيود والقواعد المحددة

  ملاحظة: هذه البيانات للاختبار فقط ويمكن حذفها لاحقاً
*/

-- إدراج بيانات تجريبية للحجوزات (ستحتاج إلى user_id صحيح)
-- هذه البيانات ستكون مرئية فقط للمستخدم الذي يملك user_id المحدد

-- يمكنك تشغيل هذا الاستعلام بعد إنشاء حساب مستخدم
-- استبدل 'YOUR_USER_ID' بـ user_id الفعلي من جدول auth.users

/*
INSERT INTO bookings (
  user_id,
  customer_name,
  phone_number,
  email,
  check_in_date,
  check_out_date,
  number_of_nights,
  number_of_guests,
  price_per_night,
  total_amount,
  paid_amount,
  remaining_balance,
  payment_method,
  payment_status,
  special_requests,
  notes
) VALUES 
(
  'YOUR_USER_ID', -- استبدل بـ user_id الفعلي
  'أحمد محمد العلي',
  '0501234567',
  'ahmed@example.com',
  '2025-02-01',
  '2025-02-03',
  2,
  4,
  500.00,
  1000.00,
  1000.00,
  0.00,
  'cash',
  'paid',
  'طلب إفطار إضافي',
  'عميل مميز - حجز عائلي'
),
(
  'YOUR_USER_ID', -- استبدل بـ user_id الفعلي
  'فاطمة أحمد السالم',
  '0507654321',
  'fatima@example.com',
  '2025-02-10',
  '2025-02-12',
  2,
  2,
  600.00,
  1200.00,
  600.00,
  600.00,
  'bank_transfer',
  'partial',
  'حجز شهر العسل',
  'طلب تزيين خاص للغرفة'
);
*/

-- إنشاء view لإحصائيات سريعة
CREATE OR REPLACE VIEW booking_stats AS
SELECT 
  user_id,
  COUNT(*) as total_bookings,
  SUM(total_amount) as total_revenue,
  SUM(paid_amount) as total_paid,
  SUM(remaining_balance) as total_pending,
  AVG(total_amount) as avg_booking_value,
  COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_bookings,
  COUNT(CASE WHEN payment_status = 'pending' THEN 1 END) as pending_bookings,
  COUNT(CASE WHEN payment_status = 'partial' THEN 1 END) as partial_bookings
FROM bookings
GROUP BY user_id;

-- تفعيل RLS على الـ view
ALTER VIEW booking_stats SET (security_invoker = true);

-- سياسة للـ view
CREATE POLICY "Users can read own booking stats"
  ON booking_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);