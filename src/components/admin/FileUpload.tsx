import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  onRemove: () => void;
  value?: string;
  label: string;
  bucket?: string;
  accept?: string;
  type?: "image" | "video";
}

export function FileUpload({ 
  onUploadComplete, 
  onRemove, 
  value, 
  label, 
  bucket = "event-assets",
  accept = "image/*",
  type = "image"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      toast.success(`${type === "image" ? "Imagem" : "Vídeo"} enviada com sucesso!`);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Erro ao enviar arquivo: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]">{label}</p>
      
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-black/5 aspect-video bg-[#F7F8FA] flex items-center justify-center">
          {type === "image" ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Play className="h-8 w-8 text-primary" />
              <span className="text-[10px] font-bold uppercase text-[#8E8E8F]">Vídeo Carregado</span>
            </div>
          )}
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-black/5 bg-[#F7F8FA] cursor-pointer hover:bg-black/[0.02] transition-colors group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            ) : (
              <>
                <Upload className="h-8 w-8 text-[#8E8E8F] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] font-black uppercase tracking-widest text-[#8E8E8F]">Clique para enviar</p>
                <p className="text-[9px] font-bold text-[#8E8E8F]/60 mt-1 uppercase">{type === "image" ? "PNG, JPG ou GIF" : "MP4, WebM"}</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleUpload} 
            accept={accept}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
