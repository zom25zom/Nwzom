/*
  # إنشاء جدول الحجوزات

  1. الجداول الجديدة
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `customer_name` (text, اسم العميل)
      - `phone_number` (text, رقم الهاتف)
      - `email` (text, البريد الإلكتروني)
      - `check_in_date` (date, تاريخ الوصول)
      - `check_out_date` (date, تاريخ المغادرة)
      - `number_of_nights` (integer, عدد الليالي)
      - `number_of_guests` (integer, عدد الضيوف)
      - `price_per_night` (decimal, سعر الليلة)
      - `total_amount` (decimal, المبلغ الإجمالي)
      - `paid_amount` (decimal, المبلغ المدفوع)
      - `remaining_balance` (decimal, المبلغ المتبقي)
      - `payment_method` (text, طريقة الدفع)
      - `payment_status` (text, حالة الدفع)
      - `special_requests` (text, طلبات خاصة)
      - `notes` (text, ملاحظات)
      - `created_at` (timestamptz, تاريخ الإنشاء)
      - `updated_at` (timestamptz, تاريخ التحديث)

  2. الأمان
    - تفعيل RLS على جدول `bookings`
    - إضافة سياسات للمستخدمين المصرح لهم للوصول إلى بياناتهم فقط

  3. الفهارس
    - فهرس على `user_id` لتحسين الأداء
    - فهرس على `check_in_date` للبحث السريع
    - فهرس على `payment_status` للتصفية
*/

-- إنشاء جدول الحجوزات
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  customer_name text NOT NULL,
  phone_number text,
  email text,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  number_of_nights integer NOT NULL DEFAULT 1,
  number_of_guests integer NOT NULL DEFAULT 1,
  price_per_night decimal(10,2) NOT NULL DEFAULT 0.00,
  total_amount decimal(10,2) NOT NULL DEFAULT 0.00,
  paid_amount decimal(10,2) NOT NULL DEFAULT 0.00,
  remaining_balance decimal(10,2) NOT NULL DEFAULT 0.00,
  payment_method text DEFAULT 'cash',
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'cancelled')),
  special_requests text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة: المستخدمون يمكنهم قراءة حجوزاتهم فقط
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسة للإدراج: المستخدمون يمكنهم إضافة حجوزات جديدة
CREATE POLICY "Users can insert own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- سياسة للتحديث: المستخدمون يمكنهم تحديث حجوزاتهم فقط
CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- سياسة للحذف: المستخدمون يمكنهم حذف حجوزاتهم فقط
CREATE POLICY "Users can delete own bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in_date ON bookings(check_in_date);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء trigger لتحديث updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();