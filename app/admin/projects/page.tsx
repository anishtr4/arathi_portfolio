"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DesignVisual {
  url: string;
  type: 'web' | 'mobile' | 'both';
  caption: string;
}

interface ColorSwatch {
  name: string;
  hex: string;
  usage: string;
}

interface Typography {
  primary_font?: string;
  secondary_font?: string;
  heading_sizes?: string;
  body_sizes?: string;
}

interface BeforeAfter {
  before_url: string;
  after_url: string;
  caption: string;
  type: 'wireframe' | 'prototype' | 'design';
}

interface Project {
  id?: string;
  title: string;
  description: string;
  metrics: string | string[];
  gradient: string;
  image_url?: string;
  category?: string;
  order_index?: number;
  year?: string;
  my_role?: string;
  tags?: string;
  impact_results?: string;
  project_overview?: string;
  challenge?: string;
  user_research?: string;
  design_solution?: string;
  user_flow?: string;
  results_impact?: string;
  usability_testing?: string;
  design_visuals?: DesignVisual[];
  color_palette?: ColorSwatch[];
  typography?: Typography;
  before_after_designs?: BeforeAfter[];
  is_draft?: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    for (const project of projects) {
      const { id, ...projectData } = project;
      
      const metricsArray = typeof project.metrics === 'string' 
        ? project.metrics.split(',').map(m => m.trim()).filter(m => m)
        : project.metrics;

      const tagsArray = typeof project.tags === 'string' && project.tags
        ? project.tags.split(',').map(t => t.trim()).filter(t => t)
        : [];

      await supabase.from("projects").insert({
        ...projectData,
        metrics: metricsArray,
        tags: tagsArray,
        category: project.category || 'Featured Work',
        order_index: project.order_index || 0,
        design_visuals: project.design_visuals || [],
        color_palette: project.color_palette || [],
        typography: project.typography || {},
        before_after_designs: project.before_after_designs || [],
        is_draft: project.is_draft || false
      });
    }

    setIsSaving(false);
    router.push("/admin");
  };

  const addProject = () => {
    setProjects([...projects, { 
      title: "", 
      description: "", 
      metrics: "", 
      gradient: "from-blue-500 to-purple-500", 
      image_url: "",
      year: "",
      my_role: "",
      tags: "",
      category: "Featured Work",
      design_visuals: [],
      color_palette: [],
      typography: {},
      before_after_designs: [],
      is_draft: false,
      order_index: projects.length
    }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[] | DesignVisual[] | Typography | ColorSwatch[] | boolean) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const addDesignVisual = (projectIndex: number) => {
    const updated = [...projects];
    const visuals = updated[projectIndex].design_visuals || [];
    visuals.push({ url: '', type: 'web', caption: '' });
    updated[projectIndex].design_visuals = visuals;
    setProjects(updated);
  };

  const removeDesignVisual = (projectIndex: number, visualIndex: number) => {
    const updated = [...projects];
    const visuals = updated[projectIndex].design_visuals || [];
    visuals.splice(visualIndex, 1);
    updated[projectIndex].design_visuals = visuals;
    setProjects(updated);
  };

  const updateDesignVisual = (projectIndex: number, visualIndex: number, field: keyof DesignVisual, value: string) => {
    const updated = [...projects];
    const visuals = updated[projectIndex].design_visuals || [];
    visuals[visualIndex] = { ...visuals[visualIndex], [field]: value };
    updated[projectIndex].design_visuals = visuals;
    setProjects(updated);
  };

  const moveProjectUp = (index: number) => {
    if (index === 0) return;
    const updated = [...projects];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    updated.forEach((p, i) => p.order_index = i);
    setProjects(updated);
  };

  const moveProjectDown = (index: number) => {
    if (index === projects.length - 1) return;
    const updated = [...projects];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    updated.forEach((p, i) => p.order_index = i);
    setProjects(updated);
  };

  const addColorSwatch = (projectIndex: number) => {
    const updated = [...projects];
    const palette = updated[projectIndex].color_palette || [];
    palette.push({ name: '', hex: '#000000', usage: '' });
    updated[projectIndex].color_palette = palette;
    setProjects(updated);
  };

  const removeColorSwatch = (projectIndex: number, swatchIndex: number) => {
    const updated = [...projects];
    const palette = updated[projectIndex].color_palette || [];
    palette.splice(swatchIndex, 1);
    updated[projectIndex].color_palette = palette;
    setProjects(updated);
  };

  const updateColorSwatch = (projectIndex: number, swatchIndex: number, field: keyof ColorSwatch, value: string) => {
    const updated = [...projects];
    const palette = updated[projectIndex].color_palette || [];
    palette[swatchIndex] = { ...palette[swatchIndex], [field]: value };
    updated[projectIndex].color_palette = palette;
    setProjects(updated);
  };

  const addBeforeAfter = (projectIndex: number) => {
    const updated = [...projects];
    const comparisons = updated[projectIndex].before_after_designs || [];
    comparisons.push({ before_url: '', after_url: '', caption: '', type: 'design' });
    updated[projectIndex].before_after_designs = comparisons;
    setProjects(updated);
  };

  const removeBeforeAfter = (projectIndex: number, comparisonIndex: number) => {
    const updated = [...projects];
    const comparisons = updated[projectIndex].before_after_designs || [];
    comparisons.splice(comparisonIndex, 1);
    updated[projectIndex].before_after_designs = comparisons;
    setProjects(updated);
  };

  const updateBeforeAfter = (projectIndex: number, comparisonIndex: number, field: keyof BeforeAfter, value: string) => {
    const updated = [...projects];
    const comparisons = updated[projectIndex].before_after_designs || [];
    comparisons[comparisonIndex] = { ...comparisons[comparisonIndex], [field]: value };
    updated[projectIndex].before_after_designs = comparisons;
    setProjects(updated);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-4xl font-bold">Edit Projects</h1>
            <Link href="/admin">
              <Button variant="outline" className="border-2 border-black">Back</Button>
            </Link>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="border-2 border-black p-4 space-y-4 bg-accent/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold">Project {index + 1}</h3>
                    {project.is_draft && (
                      <span className="px-2 py-1 bg-yellow-300 text-black text-xs font-bold border-2 border-black">
                        DRAFT
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveProjectUp(index)}
                      disabled={index === 0}
                      className="border-2 border-black"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveProjectDown(index)}
                      disabled={index === projects.length - 1}
                      className="border-2 border-black"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeProject(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`draft-${index}`}
                    checked={project.is_draft || false}
                    onChange={(e) => updateProject(index, "is_draft", e.target.checked)}
                    className="w-4 h-4 border-2 border-black"
                  />
                  <Label htmlFor={`draft-${index}`} className="font-bold">
                    Save as Draft (Hidden from public)
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title (Optional)</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(index, "title", e.target.value)}
                      className="border-2 border-black"
                      placeholder="Project Title"
                    />
                  </div>

                  <div>
                    <Label>Year (Optional)</Label>
                    <Input
                      value={project.year || ""}
                      onChange={(e) => updateProject(index, "year", e.target.value)}
                      className="border-2 border-black"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    className="border-2 border-black"
                    placeholder="Brief project description"
                  />
                </div>

                <div>
                  <ImageUpload
                    value={project.image_url || ""}
                    onChange={(url) => updateProject(index, "image_url", url)}
                    label="Project Hero Image (Optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>My Role (Optional)</Label>
                    <Input
                      value={project.my_role || ""}
                      onChange={(e) => updateProject(index, "my_role", e.target.value)}
                      className="border-2 border-black"
                      placeholder="Lead Designer"
                    />
                  </div>

                  <div>
                    <Label>Tags (Optional, comma-separated)</Label>
                    <Input
                      value={project.tags || ""}
                      onChange={(e) => updateProject(index, "tags", e.target.value)}
                      className="border-2 border-black"
                      placeholder="UX, UI, Mobile"
                    />
                  </div>
                </div>

                <div>
                  <Label>Metrics (Optional, comma-separated)</Label>
                  <Input
                    value={typeof project.metrics === 'string' ? project.metrics : project.metrics.join(', ')}
                    onChange={(e) => updateProject(index, "metrics", e.target.value)}
                    className="border-2 border-black"
                    placeholder="50% increase, 2x engagement"
                  />
                </div>

                <details className="border-2 border-black p-4 bg-white">
                  <summary className="font-bold cursor-pointer">Detailed Content (Optional - for project page)</summary>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Project Overview (Optional)</Label>
                      <Textarea
                        value={project.project_overview || ""}
                        onChange={(e) => updateProject(index, "project_overview", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>The Challenge (Optional)</Label>
                      <Textarea
                        value={project.challenge || ""}
                        onChange={(e) => updateProject(index, "challenge", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>User Research & Insights (Optional)</Label>
                      <Textarea
                        value={project.user_research || ""}
                        onChange={(e) => updateProject(index, "user_research", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Design Solution (Optional)</Label>
                      <Textarea
                        value={project.design_solution || ""}
                        onChange={(e) => updateProject(index, "design_solution", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>User Flow & Journey Mapping (Optional)</Label>
                      <Textarea
                        value={project.user_flow || ""}
                        onChange={(e) => updateProject(index, "user_flow", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Results & Impact (Optional)</Label>
                      <Textarea
                        value={project.results_impact || ""}
                        onChange={(e) => updateProject(index, "results_impact", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Usability Testing & Validation (Optional)</Label>
                      <Textarea
                        value={project.usability_testing || ""}
                        onChange={(e) => updateProject(index, "usability_testing", e.target.value)}
                        className="border-2 border-black"
                        rows={3}
                      />
                    </div>

                    <div className="border-2 border-accent p-4 bg-accent/10">
                      <div className="flex justify-between items-center mb-4">
                        <Label className="text-lg font-bold">Design Visuals & Wireframes (Optional)</Label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addDesignVisual(index)}
                          className="border-2 border-black"
                        >
                          Add Visual
                        </Button>
                      </div>
                      
                      {(project.design_visuals || []).map((visual, vIndex) => (
                        <div key={vIndex} className="border-2 border-black p-3 mb-3 bg-white space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm">Visual {vIndex + 1}</span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeDesignVisual(index, vIndex)}
                            >
                              Remove
                            </Button>
                          </div>

                          <ImageUpload
                            value={visual.url}
                            onChange={(url) => updateDesignVisual(index, vIndex, 'url', url)}
                            label="Design Image"
                          />

                          <div>
                            <Label>Type</Label>
                            <select
                              value={visual.type}
                              onChange={(e) => updateDesignVisual(index, vIndex, 'type', e.target.value)}
                              className="w-full border-2 border-black p-2 rounded"
                            >
                              <option value="web">Web Design</option>
                              <option value="mobile">Mobile Design</option>
                              <option value="both">Web & Mobile</option>
                            </select>
                          </div>

                          <div>
                            <Label>Caption (Optional)</Label>
                            <Input
                              value={visual.caption}
                              onChange={(e) => updateDesignVisual(index, vIndex, 'caption', e.target.value)}
                              className="border-2 border-black"
                              placeholder="Describe this design visual"
                            />
                          </div>
                        </div>
                      ))}

                      {(!project.design_visuals || project.design_visuals.length === 0) && (
                        <p className="text-sm text-muted-foreground italic">No design visuals added yet. Click "Add Visual" to showcase your designs.</p>
                      )}
                    </div>

                    <div className="border-2 border-accent p-4 bg-accent/10">
                      <div className="flex justify-between items-center mb-4">
                        <Label className="text-lg font-bold">🎨 Color Palette (Optional)</Label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addColorSwatch(index)}
                          className="border-2 border-black"
                        >
                          Add Color
                        </Button>
                      </div>
                      
                      {(project.color_palette || []).map((swatch, sIndex) => (
                        <div key={sIndex} className="border-2 border-black p-3 mb-3 bg-white grid grid-cols-4 gap-3 items-end">
                          <div>
                            <Label>Color Name</Label>
                            <Input
                              value={swatch.name}
                              onChange={(e) => updateColorSwatch(index, sIndex, 'name', e.target.value)}
                              className="border-2 border-black"
                              placeholder="Primary Blue"
                            />
                          </div>
                          <div>
                            <Label>Hex Code</Label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={swatch.hex}
                                onChange={(e) => updateColorSwatch(index, sIndex, 'hex', e.target.value)}
                                className="w-12 h-10 border-2 border-black cursor-pointer"
                              />
                              <Input
                                value={swatch.hex}
                                onChange={(e) => updateColorSwatch(index, sIndex, 'hex', e.target.value)}
                                className="border-2 border-black flex-1"
                                placeholder="#0066FF"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Usage</Label>
                            <Input
                              value={swatch.usage}
                              onChange={(e) => updateColorSwatch(index, sIndex, 'usage', e.target.value)}
                              className="border-2 border-black"
                              placeholder="Buttons, Links"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeColorSwatch(index, sIndex)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="border-2 border-accent p-4 bg-accent/10 space-y-3">
                      <Label className="text-lg font-bold">✍️ Typography (Optional)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Primary Font</Label>
                          <Input
                            value={project.typography?.primary_font || ''}
                            onChange={(e) => updateProject(index, 'typography', { ...project.typography, primary_font: e.target.value })}
                            className="border-2 border-black"
                            placeholder="Inter, sans-serif"
                          />
                        </div>
                        <div>
                          <Label>Secondary Font</Label>
                          <Input
                            value={project.typography?.secondary_font || ''}
                            onChange={(e) => updateProject(index, 'typography', { ...project.typography, secondary_font: e.target.value })}
                            className="border-2 border-black"
                            placeholder="Playfair Display"
                          />
                        </div>
                        <div>
                          <Label>Heading Sizes</Label>
                          <Input
                            value={project.typography?.heading_sizes || ''}
                            onChange={(e) => updateProject(index, 'typography', { ...project.typography, heading_sizes: e.target.value })}
                            className="border-2 border-black"
                            placeholder="48px, 36px, 24px"
                          />
                        </div>
                        <div>
                          <Label>Body Sizes</Label>
                          <Input
                            value={project.typography?.body_sizes || ''}
                            onChange={(e) => updateProject(index, 'typography', { ...project.typography, body_sizes: e.target.value })}
                            className="border-2 border-black"
                            placeholder="16px, 14px"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-accent p-4 bg-accent/10">
                      <div className="flex justify-between items-center mb-4">
                        <Label className="text-lg font-bold">🔄 Before & After Comparisons (Optional)</Label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addBeforeAfter(index)}
                          className="border-2 border-black"
                        >
                          Add Comparison
                        </Button>
                      </div>
                      
                      {(project.before_after_designs || []).map((comparison, cIndex) => (
                        <div key={cIndex} className="border-2 border-black p-3 mb-3 bg-white space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm">Comparison {cIndex + 1}</span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeBeforeAfter(index, cIndex)}
                            >
                              Remove
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <ImageUpload
                              value={comparison.before_url}
                              onChange={(url) => updateBeforeAfter(index, cIndex, 'before_url', url)}
                              label="Before Image"
                            />
                            <ImageUpload
                              value={comparison.after_url}
                              onChange={(url) => updateBeforeAfter(index, cIndex, 'after_url', url)}
                              label="After Image"
                            />
                          </div>

                          <div>
                            <Label>Type</Label>
                            <select
                              value={comparison.type}
                              onChange={(e) => updateBeforeAfter(index, cIndex, 'type', e.target.value)}
                              className="w-full border-2 border-black p-2 rounded"
                            >
                              <option value="wireframe">Wireframe</option>
                              <option value="prototype">Prototype</option>
                              <option value="design">Final Design</option>
                            </select>
                          </div>

                          <div>
                            <Label>Caption (Optional)</Label>
                            <Input
                              value={comparison.caption}
                              onChange={(e) => updateBeforeAfter(index, cIndex, 'caption', e.target.value)}
                              className="border-2 border-black"
                              placeholder="Describe the improvements"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>

                <div>
                  <Label>Gradient (Tailwind classes - fallback if no image)</Label>
                  <Input
                    value={project.gradient}
                    onChange={(e) => updateProject(index, "gradient", e.target.value)}
                    className="border-2 border-black"
                    placeholder="from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            ))}

            <Button 
              type="button" 
              onClick={addProject}
              variant="outline"
              className="w-full border-2 border-black"
            >
              Add Project
            </Button>

            <Button 
              type="submit" 
              className="w-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save All Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
