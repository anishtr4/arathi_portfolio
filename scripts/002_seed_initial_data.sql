-- Insert default hero content
INSERT INTO hero_content (title, subtitle, years_experience) VALUES
('Senior UI/UX Designer', 'Crafting delightful digital experiences', 13)
ON CONFLICT DO NOTHING;

-- Insert default about content
INSERT INTO about_content (bio) VALUES
('With over 13 years of experience in UI/UX design, I specialize in creating intuitive, accessible, and delightful digital experiences. My passion lies in solving complex problems through thoughtful design and collaboration.')
ON CONFLICT DO NOTHING;

-- Insert default projects
INSERT INTO projects (title, description, category, impact, users, rating, row_span, col_span, order_index) VALUES
('HealthTech Dashboard', 'Redesigned patient portal for major healthcare provider', 'Healthcare', '45% increase in patient engagement', '2M+ users', '4.8/5', 2, 2, 1),
('E-Commerce Revolution', 'Complete redesign of mobile shopping experience', 'E-Commerce', '60% increase in conversions', '500K+ users', '4.9/5', 1, 2, 2),
('Banking App Redesign', 'Modern mobile banking experience', 'FinTech', '35% increase in user satisfaction', '1M+ users', '4.7/5', 1, 1, 3),
('SaaS Platform', 'B2B dashboard for enterprise clients', 'SaaS', '50% reduction in support tickets', '100K+ users', '4.8/5', 1, 1, 4),
('Travel Booking App', 'Streamlined booking experience', 'Travel', '40% faster booking time', '300K+ users', '4.6/5', 2, 1, 5),
('Eco Tracker', 'Sustainability tracking mobile app', 'Lifestyle', '200K+ downloads', '200K+ users', '4.7/5', 1, 2, 6)
ON CONFLICT DO NOTHING;

-- Insert default skills
INSERT INTO skills (name, category, color, order_index) VALUES
('Figma', 'Design Tools', 'bg-pink-100 text-pink-800', 1),
('Sketch', 'Design Tools', 'bg-yellow-100 text-yellow-800', 2),
('Adobe XD', 'Design Tools', 'bg-purple-100 text-purple-800', 3),
('User Research', 'Research', 'bg-blue-100 text-blue-800', 4),
('Usability Testing', 'Research', 'bg-teal-100 text-teal-800', 5),
('Wireframing', 'Design', 'bg-green-100 text-green-800', 6),
('Prototyping', 'Design', 'bg-orange-100 text-orange-800', 7),
('Design Systems', 'Systems', 'bg-indigo-100 text-indigo-800', 8),
('Accessibility', 'Standards', 'bg-red-100 text-red-800', 9),
('HTML/CSS', 'Development', 'bg-cyan-100 text-cyan-800', 10)
ON CONFLICT DO NOTHING;

-- Insert default experience
INSERT INTO experience (company, role, duration, description, achievements, order_index) VALUES
('TechCorp Inc.', 'Senior UI/UX Designer', '2020 - Present', 'Leading design initiatives for enterprise products', '["Led redesign of flagship product", "Established company-wide design system", "Mentored 5 junior designers"]'::jsonb, 1),
('DesignStudio', 'UI/UX Designer', '2017 - 2020', 'Worked on diverse client projects across industries', '["Delivered 20+ client projects", "Improved user satisfaction by 40%", "Led user research initiatives"]'::jsonb, 2),
('StartupXYZ', 'Product Designer', '2015 - 2017', 'Built product from concept to launch', '["Designed MVP from scratch", "Conducted user interviews", "Created brand identity"]'::jsonb, 3),
('Creative Agency', 'Junior Designer', '2012 - 2015', 'Supported senior designers on various projects', '["Assisted in 30+ projects", "Created wireframes and mockups", "Learned industry best practices"]'::jsonb, 4)
ON CONFLICT DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (name, role, company, content, order_index) VALUES
('Sarah Johnson', 'Product Manager', 'TechCorp', 'Working with this designer has been an absolute pleasure. Their attention to detail and user-centric approach transformed our product.', 1),
('Michael Chen', 'CEO', 'StartupXYZ', 'An exceptional designer who truly understands both business goals and user needs. Highly recommend!', 2),
('Emily Rodriguez', 'Engineering Lead', 'DesignStudio', 'The design systems created were not only beautiful but also incredibly developer-friendly. A true professional.', 3)
ON CONFLICT DO NOTHING;

-- Insert default brands
INSERT INTO brands (name, logo_url, order_index) VALUES
('Takeda', '/placeholder.svg?height=80&width=160', 1),
('Regeneron', '/placeholder.svg?height=80&width=160', 2),
('GSK', '/placeholder.svg?height=80&width=160', 3),
('Jos Alukkas', '/placeholder.svg?height=80&width=160', 4),
('Bristol Myers Squibb', '/placeholder.svg?height=80&width=160', 5)
ON CONFLICT DO NOTHING;
