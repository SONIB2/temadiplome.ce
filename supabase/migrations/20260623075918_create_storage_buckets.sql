INSERT INTO storage.buckets (id, name, public) VALUES ('order-files', 'order-files', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('course-files', 'course-files', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_order_files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id IN ('order-files', 'course-files'));
CREATE POLICY "public_upload_order_files" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id IN ('order-files', 'course-files'));
CREATE POLICY "authenticated_update_course_files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('order-files', 'course-files'));
CREATE POLICY "authenticated_delete_course_files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('order-files', 'course-files'));
