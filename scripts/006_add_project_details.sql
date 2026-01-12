-- Add detailed fields to projects table for case study pages
ALTER TABLE projects ADD COLUMN IF NOT EXISTS year TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS my_role TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS impact_results TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_overview TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS user_research TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS design_solution TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS user_flow TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results_impact TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS usability_testing TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS data_insights JSONB;
