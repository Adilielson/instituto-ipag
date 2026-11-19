import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export function PdfViewer({
  file,
  onClose,
  onRefresh,
}: {
  file: { title: string; url: string } | null;
  onClose: () => void;
  onRefresh?: () => void;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <Dialog
      open={!!file}
      onOpenChange={(open) => {
        if (!open) onClose();
        setLoading(true);
      }}
    >
      <DialogContent className="max-w-[96vw] sm:max-w-[1100px] h-[90dvh] flex flex-col p-4 sm:p-6">
        <DialogTitle className="pr-8">{file?.title}</DialogTitle>
        <DialogDescription>
          Visualização do documento institucional. Use os controles do leitor para navegar pelo PDF.
        </DialogDescription>
        {file && (
          <>
            <div className="flex gap-3 items-center text-xs">
              {loading && <span role="status">Carregando documento…</span>}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setLoading(true);
                  if (onRefresh) {
                    onRefresh();
                    return;
                  }
                  const frame = document.getElementById(
                    "institutional-pdf",
                  ) as HTMLIFrameElement | null;
                  if (frame) frame.src = file.url;
                }}
              >
                Recarregar PDF
              </Button>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="underline">
                Abrir em outra aba, se necessário
              </a>
            </div>
            <iframe
              id="institutional-pdf"
              title={file.title}
              src={file.url + "#view=FitH"}
              className="w-full flex-1 min-h-0 rounded-xl border bg-muted"
              onLoad={() => setLoading(false)}
            />
            <p className="text-xs text-muted-foreground">
              O PDF abre aqui no aplicativo. Se seu navegador não tiver leitor de PDF, use o link
              acima.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
