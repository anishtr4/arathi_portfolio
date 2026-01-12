"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";

interface Experience {
  id?: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string;
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("experience")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setExperiences(data);
    }
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await supabase.from("experience").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    for (const exp of experiences) {
      const { id, ...expData } = exp;
      await supabase.from("experience").insert(expData);
    }

    setIsSaving(false);
    router.push("/admin");
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", period: "", description: "", achievements: "" }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-4xl font-bold">Edit Experience</h1>
            <Link href="/admin">
              <Button variant="outline" className="border-2 border-black">Back</Button>
            </Link>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-2 border-black p-4 space-y-4 bg-accent/20">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Experience {index + 1}</h3>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      className="border-2 border-black"
                      required
                    />
                  </div>

                  <div>
                    <Label>Role</Label>
                    <Input
                      value={exp.role}
                      onChange={(e) => updateExperience(index, "role", e.target.value)}
                      className="border-2 border-black"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Period (e.g., "2020 - Present")</Label>
                  <Input
                    value={exp.period}
                    onChange={(e) => updateExperience(index, "period", e.target.value)}
                    className="border-2 border-black"
                    required
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    className="border-2 border-black"
                    required
                  />
                </div>

                <div>
                  <Label>Achievements (comma-separated)</Label>
                  <Textarea
                    value={exp.achievements}
                    onChange={(e) => updateExperience(index, "achievements", e.target.value)}
                    className="border-2 border-black"
                    placeholder="Achievement 1, Achievement 2, Achievement 3"
                    required
                  />
                </div>
              </div>
            ))}

            <Button 
              type="button" 
              onClick={addExperience}
              variant="outline"
              className="w-full border-2 border-black"
            >
              Add Experience
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
