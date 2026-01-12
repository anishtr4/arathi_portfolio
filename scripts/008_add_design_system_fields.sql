-- Add design system and management fields to projects table

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS color_palette JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS typography JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS before_after_designs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT false;

-- Update order_index to ensure it exists and has a default
ALTER TABLE projects
ALTER COLUMN order_index SET DEFAULT 0;

COMMENT ON COLUMN projects.color_palette IS 'Array of color objects: [{ name, hex, usage }]';
COMMENT ON COLUMN projects.typography IS 'Typography settings: { primary_font, secondary_font, heading_sizes, body_sizes }';
COMMENT ON COLUMN projects.before_after_designs IS 'Array of before/after comparisons: [{ before_url, after_url, caption, type }]';
COMMENT ON COLUMN projects.is_draft IS 'If true, project is hidden from public view';
