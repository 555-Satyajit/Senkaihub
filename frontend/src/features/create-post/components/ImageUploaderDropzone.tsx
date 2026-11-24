"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderDropzoneProps {
  imageUrl: string;
  onChange: (url: string) => void;
}

export function ImageUploaderDropzone({ imageUrl, onChange }: ImageUploaderDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Artwork / Media
      </span>

      {imageUrl ? (
        <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-border/80 bg-black/40 group shadow-lg">
          <Image
            src={imageUrl}
            alt="Upload preview"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold gap-1.5"
            >
              <ImageIcon className="w-4 h-4" /> Change Image
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onChange("")}
              className="text-xs font-semibold gap-1.5"
            >
              <X className="w-4 h-4" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-[240px] sm:h-[300px] rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 p-6 select-none ${
            dragActive
              ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(255,42,54,0.15)]"
              : "border-border/80 hover:border-border bg-card/50 hover:bg-card"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors border border-border/60 shadow-sm">
            <UploadCloud className="w-7 h-7 stroke-[1.8]" />
          </div>

          <div className="text-center">
            <p className="font-heading font-bold text-sm text-foreground">
              Drop anime art or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports PNG, JPG, WebP or GIF (Up to 25MB)
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs font-semibold rounded-xl border-border/80 mt-1 pointer-events-none"
          >
            Select from device
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
        className="hidden"
      />
    </div>
  );
}
