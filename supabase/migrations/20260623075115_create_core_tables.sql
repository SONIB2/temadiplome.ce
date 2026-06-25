-- Services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  includes JSONB DEFAULT '[]'::jsonb,
  price_note TEXT DEFAULT 'Kërko ofertë',
  price_cents INTEGER,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Packages table
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  contents JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  file_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table (service requests / quote requests)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  university TEXT,
  field_of_study TEXT,
  study_level TEXT,
  work_type TEXT,
  subject_area TEXT,
  deadline DATE,
  has_existing_material BOOLEAN DEFAULT false,
  uploaded_files JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  budget_note TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
  payer_name TEXT NOT NULL,
  payer_email TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  method TEXT DEFAULT 'manual',
  status TEXT DEFAULT 'pending',
  payment_proof_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  university TEXT,
  rating INTEGER DEFAULT 5,
  message TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter table
CREATE TABLE newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Faq table
CREATE TABLE faq (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "select_services" ON services FOR SELECT TO anon USING (true);
CREATE POLICY "select_packages" ON packages FOR SELECT TO anon USING (true);
CREATE POLICY "select_courses" ON courses FOR SELECT TO anon USING (true);
CREATE POLICY "select_testimonials" ON testimonials FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "select_blog_published" ON blog_posts FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "select_faq" ON faq FOR SELECT TO anon USING (true);

-- Public insert for forms
CREATE POLICY "insert_orders" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_payments" ON payments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_newsletter" ON newsletter FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "insert_contact_messages" ON contact_messages FOR INSERT TO anon WITH CHECK (true);

-- Admin (authenticated) full access
CREATE POLICY "admin_services_all" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_packages_all" ON packages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_courses_all" ON courses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_orders_all" ON orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_payments_all" ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_testimonials_all" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_newsletter_all" ON newsletter FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_blog_all" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_faq_all" ON faq FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_contact_messages_all" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
