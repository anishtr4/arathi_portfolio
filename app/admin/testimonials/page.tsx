"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";

interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setTestimonials(data);
    }
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    for (const testimonial of testimonials) {
      const { id, ...testimonialData } = testimonial;
      await supabase.from("testimonials").insert(testimonialData);
    }

    setIsSaving(false);
    router.push("/admin");
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { name: "", role: "", company: "", content: "" }]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-4xl font-bold">Edit Testimonials</h1>
            <Link href="/admin">
              <Button variant="outline" className="border-2 border-black">Back</Button>
            </Link>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border-2 border-black p-4 space-y-4 bg-accent/20">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Testimonial {index + 1}</h3>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeTestimonial(index)}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                      className="border-2 border-black"
                      required
                    />
                  </div>

                  <div>
                    <Label>Role</Label>
                    <Input
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(index, "role", e.target.value)}
                      className="border-2 border-black"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Company</Label>
                  <Input
                    value={testimonial.company}
                    onChange={(e) => updateTestimonial(index, "company", e.target.value)}
                    className="border-2 border-black"
                    required
                  />
                </div>

                <div>
                  <Label>Testimonial Content</Label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) => updateTestimonial(index, "content", e.target.value)}
                    className="border-2 border-black min-h-[100px]"
                    required
                  />
                </div>
              </div>
            ))}

            <Button 
              type="button" 
              onClick={addTestimonial}
              variant="outline"
              className="w-full border-2 border-black"
            >
              Add Testimonial
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
