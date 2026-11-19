import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { publicPartners } from "@/lib/institutional/functions";
import type { InstitutionalItem } from "@/lib/institutional/functions";
import { Button } from "@/components/ui/button";
export function PartnerDisplay({ carousel = false }: { carousel?: boolean }) {
  const read = useServerFn(publicPartners);
  const [rows, setRows] = useState<InstitutionalItem[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [paused, setPaused] = useState(false);
  async function load() {
    setError("");
    try {
      setRows(await read());
    } catch {
      setError("Não foi possível carregar os parceiros.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
    const focus = () => void load();
    window.addEventListener("focus", focus);
    return () => window.removeEventListener("focus", focus);
  }, []);
  if (loading)
    return (
      <p role="status" className="p-8 text-center text-muted-foreground">
        Carregando parceiros…
      </p>
    );
  if (error)
    return (
      <div role="alert" className="p-8 text-center">
        {error}{" "}
        <Button variant="outline" onClick={load}>
          Tentar novamente
        </Button>
      </div>
    );
  if (!rows.length)
    return (
      <p className="p-8 text-center text-muted-foreground">
        Em breve, conheça nossa rede de parceiros.
      </p>
    );
  const logo = (row: InstitutionalItem) => <PartnerLogo row={row} />;
  if (!carousel || rows.length === 1)
    return (
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl bg-white px-6 py-4">
            {logo(row)}
          </div>
        ))}
      </div>
    );
  return (
    <div className="border-y border-black/5 py-8">
      <style>{`@keyframes ipag-partners {to {transform:translateX(-50%)}} .ipag-partner-track {animation:ipag-partners 35s linear infinite;} .ipag-partner-track:hover {animation-play-state:paused!important;} @media(prefers-reduced-motion:reduce){.ipag-partner-track{animation:none!important}.ipag-partner-copy{display:none}}`}</style>
      <div className="overflow-x-auto" aria-label="Logomarcas dos parceiros">
        <div
          className="flex w-max ipag-partner-track"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <div className="flex shrink-0 items-center gap-12 px-6">
            {rows.map((row) => (
              <div key={row.id}>{logo(row)}</div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="ipag-partner-copy flex shrink-0 items-center gap-12 px-6"
          >
            {rows.map((row) => (
              <PartnerLogo key={row.id} row={row} />
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <Button variant="ghost" size="sm" onClick={() => setPaused(!paused)}>
          {paused ? "Continuar movimento" : "Pausar movimento"}
        </Button>
      </div>
    </div>
  );
}

function PartnerLogo({ row }: { row: InstitutionalItem }) {
  const [failed, setFailed] = useState(false),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    setFailed(false);
    setRetry(0);
  }, [row.url]);
  if (failed)
    return (
      <div className="h-24 w-48 flex flex-col items-center justify-center gap-1 text-center">
        <span className="font-bold text-sm">{row.name}</span>
        <button
          className="text-xs underline"
          onClick={() => {
            setFailed(false);
            setRetry(retry + 1);
          }}
        >
          Recarregar logomarca
        </button>
      </div>
    );
  const src = row.url + (retry ? `&retry=${retry}` : "");
  return (
    <img
      src={src}
      alt={row.name}
      title={row.name}
      width={600}
      height={300}
      className="h-24 w-48 object-contain"
      loading="lazy"
      decoding="async"
      onError={() => {
        if (!retry) setRetry(1);
        else setFailed(true);
      }}
    />
  );
}
