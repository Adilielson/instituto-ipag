-- Create a storage bucket for event assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-assets', 'event-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Add video_url to eventos table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'eventos' AND column_name = 'video_url') THEN
        ALTER TABLE public.eventos ADD COLUMN video_url TEXT;
    END IF;
END $$;

-- Drop existing policies if they exist to avoid conflict
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload event assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update event assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete event assets" ON storage.objects;

-- Policies for event-assets bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'event-assets');

CREATE POLICY "Authenticated users can upload event assets" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'event-assets');

CREATE POLICY "Authenticated users can update event assets" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'event-assets');

CREATE POLICY "Authenticated users can delete event assets" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'event-assets');
