
-- Add columns to profiles for subscriptions and doctor verification
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS premium_reason text,
  ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS specialization text,
  ADD COLUMN IF NOT EXISTS registration_number text;

-- Feature flags table
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  enabled boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

CREATE POLICY "Admins manage feature flags" ON public.feature_flags
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated read feature flags" ON public.feature_flags
  FOR SELECT TO authenticated USING (true);

INSERT INTO public.feature_flags (key, enabled) VALUES
  ('ai_symptom_checker', true),
  ('ai_report_analysis', true),
  ('health_adventure', false),
  ('new_registrations', true)
ON CONFLICT (key) DO NOTHING;

-- Platform settings table
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

CREATE POLICY "Admins manage platform settings" ON public.platform_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated read platform settings" ON public.platform_settings
  FOR SELECT TO authenticated USING (true);

INSERT INTO public.platform_settings (key, value) VALUES
  ('platform_name', 'ZENVIA Health'),
  ('contact_email', 'hello@zenviahealth.com')
ON CONFLICT (key) DO NOTHING;

-- Reports storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload own reports" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'reports' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users view own reports" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'reports' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Update handle_new_user for founding user premium
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_count integer;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  INSERT INTO public.profiles (id, full_name, subscription_tier, premium_reason, specialization, registration_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE WHEN user_count < 50 THEN 'premium' ELSE 'free' END,
    CASE WHEN user_count < 50 THEN 'founding_user' ELSE NULL END,
    NEW.raw_user_meta_data->>'specialty',
    NEW.raw_user_meta_data->>'registration_number'
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'user'));
  
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (NEW.id, 'Welcome to ZENVIA Health!', 'Your health journey starts here. Complete your profile to get personalized insights.', 'info');
  
  RETURN NEW;
END;
$$;
