-- Add image_url to about_content
ALTER TABLE about_content ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add metrics and gradient to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metrics JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gradient TEXT;
