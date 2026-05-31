import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowLeft, Share2, Clock } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/eventos/$slug")({
  loader: async ({ params }) => {
    const { data: evento, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("slug", params.slug)
      .maybeSingle();
      
    if (error || !evento) throw new Error("Evento não encontrado");
    return { evento };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.evento?.titulo} — IPAG` },
      { name: "description", content: loaderData?.evento?.descricao?.slice(0, 160) },
    ],
  }),
  component: EventoPage,
});

function EventoPage() {
  const { evento } = Route.useLoaderData();

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Header/Hero */}
      <header className="relative h-[40vh] min-h-[400px] w-full overflow-hidden bg-dark">
        <img 
          src={evento.imagem_destaque || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"} 
          alt={evento.titulo}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-4 pb-12 md:px-8">
            <Reveal direction="up">
              <Link 
                to="/eventos" 
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar para eventos
              </Link>
              <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
                {evento.titulo}
              </h1>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_300px]">
        <main className="space-y-8">
          <Reveal delay={0.2}>
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-gray/80 prose-p:leading-relaxed font-light">
              {evento.descricao?.split('\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* Vídeo */}
          {evento.video_url && (
            <Reveal delay={0.3}>
              <section className="pt-12">
                <h2 className="mb-8 text-2xl font-black uppercase tracking-tight">Vídeo do Evento</h2>
                <div className="relative aspect-video overflow-hidden rounded-[32px] border border-black/5 bg-black shadow-premium">
                  <video 
                    src={evento.video_url} 
                    controls 
                    className="h-full w-full object-contain"
                  />
                </div>
              </section>
            </Reveal>
          )}

          {/* Galeria */}
          {evento.galeria && evento.galeria.length > 0 && (
            <Reveal delay={0.4}>
              <section className="pt-12">
                <h2 className="mb-8 text-2xl font-black uppercase tracking-tight">Galeria de Fotos</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {evento.galeria.map((img: string, i: number) => (
                    <div 
                      key={i} 
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm"
                    >
                      <img 
                        src={img} 
                        alt={`Imagem ${i + 1} de ${evento.titulo}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}
        </main>

        <aside className="space-y-6">
          <Reveal delay={0.3} direction="left">
            <div className="sticky top-24 space-y-6 rounded-[32px] border border-black/5 bg-[#F7F8FA] p-8 shadow-card-utility">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Informações</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-primary shadow-sm">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray/50">Data</p>
                    <p className="font-bold text-dark">{new Date(evento.data_evento).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-primary shadow-sm">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray/50">Horário</p>
                    <p className="font-bold text-dark">{new Date(evento.data_evento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-primary shadow-sm">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray/50">Local</p>
                    <p className="font-bold text-dark">{evento.local}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button className="gf-button-primary w-full shadow-warm-utility">
                  <Share2 className="mr-2 h-4 w-4" /> Compartilhar
                </Button>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </article>
  );
}