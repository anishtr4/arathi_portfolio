"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Loader2, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  label = "Image", 
  bucket = "portfolio-images" 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative w-full h-48 border-2 border-black bg-gray-100 rounded-md overflow-hidden group">
          <div className="absolute top-2 right-2 z-10">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Image
            src={value || "/placeholder.svg"}
            alt="Uploaded image"
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="border-2 border-black cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium"
          />
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
      )}
      
      {/* Fallback for manual URL entry if needed */}
      {!value && (
        <div className="text-xs text-muted-foreground mt-1">
          Or enter a URL manually:
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="https://..." 
            className="mt-1 border-2 border-black h-8 text-xs"
          />
        </div>
      )}
    </div>
  );
}
