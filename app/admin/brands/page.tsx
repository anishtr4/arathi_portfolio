"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";

interface Brand {
  id?: string;
  name: string;
  logo_url: string;
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("brands")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setBrands(data);
    }
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await supabase.from("brands").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    for (const brand of brands) {
      const { id, ...brandData } = brand;
      await supabase.from("brands").insert(brandData);
    }

    setIsSaving(false);
    router.push("/admin");
  };

  const addBrand = () => {
    setBrands([...brands, { name: "", logo_url: "" }]);
  };

  const removeBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  const updateBrand = (index: number, field: keyof Brand, value: string) => {
    const updated = [...brands];
    updated[index] = { ...updated[index], [field]: value };
    setBrands(updated);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-4xl font-bold">Edit Brands</h1>
            <Link href="/admin">
              <Button variant="outline" className="border-2 border-black">Back</Button>
            </Link>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {brands.map((brand, index) => (
              <div key={index} className="border-2 border-black p-4 space-y-4 bg-accent/20 flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 w-full">
                  <Label>Brand Name</Label>
                  <Input
                    value={brand.name}
                    onChange={(e) => updateBrand(index, "name", e.target.value)}
                    className="border-2 border-black"
                    required
                  />
                </div>

                <div className="flex-1 w-full">
                  <ImageUpload
                    value={brand.logo_url}
                    onChange={(url) => updateBrand(index, "logo_url", url)}
                    label="Brand Logo"
                  />
                </div>

                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeBrand(index)}
                  className="mt-8"
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button 
              type="button" 
              onClick={addBrand}
              variant="outline"
              className="w-full border-2 border-black"
            >
              Add Brand
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
