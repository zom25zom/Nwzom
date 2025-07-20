/*
  # إنشاء جدول ملفات المستخدمين

  1. الجداول الجديدة
    - `user_profiles`
      - `id` (uuid, primary key, foreign key to auth.users)
      - `full_name` (text, الاسم الكامل)
      - `business_name` (text, اسم العمل/الشاليه)
      - `phone_number` (text, رقم الهاتف)
      - `address` (text, العنوان)
      - `created_at` (timestamptz, تاريخ الإنشاء)
      - `updated_at` (timestamptz, تاريخ التحديث)

  2. الأمان
    - تفعيل RLS على جدول `user_profiles`
    - إضافة سياسات للمستخدمين للوصول إلى ملفهم الشخصي فقط

  3. الوظائف
    - دالة لإنشاء ملف شخصي تلقائياً عند التسجيل
*/

-- إنشاء جدول ملفات المستخدمين
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  business_name text DEFAULT 'شاليه',
  phone_number text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة: المستخدمون يمكنهم قراءة ملفهم الشخصي فقط
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- سياسة للإدراج: المستخدمون يمكنهم إنشاء ملفهم الشخصي فقط
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- سياسة للتحديث: المستخدمون يمكنهم تحديث ملفهم الشخصي فقط
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- إنشاء trigger لتحديث updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- دالة لإنشاء ملف شخصي تلقائياً عند التسجيل
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء trigger لإنشاء ملف شخصي تلقائياً
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();