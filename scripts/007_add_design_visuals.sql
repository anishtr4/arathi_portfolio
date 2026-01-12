-- Add design visuals field to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS design_visuals JSONB DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN projects.design_visuals IS 'Array of design visual objects with url, type (web/mobile/both), and caption';
