"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";

interface Skill {
  id?: string;
  name: string;
  category: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setSkills(data);
    }
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await supabase.from("skills").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    for (const skill of skills) {
      const { id, ...skillData } = skill;
      await supabase.from("skills").insert(skillData);
    }

    setIsSaving(false);
    router.push("/admin");
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", category: "Design" }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-4xl font-bold">Edit Skills</h1>
            <Link href="/admin">
              <Button variant="outline" className="border-2 border-black">Back</Button>
            </Link>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="border-2 border-black p-4 space-y-4 bg-accent/20 flex gap-4 items-end">
                <div className="flex-1">
                  <Label>Skill Name</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    className="border-2 border-black"
                    required
                  />
                </div>

                <div className="flex-1">
                  <Label>Category</Label>
                  <Input
                    value={skill.category}
                    onChange={(e) => updateSkill(index, "category", e.target.value)}
                    className="border-2 border-black"
                    placeholder="Design, Development, etc."
                    required
                  />
                </div>

                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button 
              type="button" 
              onClick={addSkill}
              variant="outline"
              className="w-full border-2 border-black"
            >
              Add Skill
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
