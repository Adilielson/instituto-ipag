import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Package, Heart, Shirt } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/bazar")({
  head: () => ({
    meta: [
      { title: "Bazar Solidário — IPAG" },
      { name: "description", content: "Doe roupas, calçados, brinquedos e livros. Transforme o que você não usa em esperança." },
      { property: "og:title", content: "Bazar Solidário IPAG" },
      { property: "og:description", content: "Solidariedade que financia projetos sociais em São Mateus." },
    ],
  }),
  component: Bazar,
});

function Bazar() {
  const items = [
    { icon: Shirt, label: "Roupas e calçados" },
    { icon: Package, label: "Brinquedos" },
    { icon: Heart, label: "Livros e utensílios" },
  ];
  return (
    <>
      <section className="relative overflow-hidden py-32 md:py-48 bg-dark -mt-[142px] md:-mt-[120px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/KpnYrxHV/image.png" 
            alt="Bazar Solidário" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
        </div>
        
        <div className="max-container relative z-10 px-4 md:px-8">
          <div className="max-w-4xl">
            <Reveal>
              <span className="text-primary font-black uppercase tracking-[0.4em] mb-8 block text-xs">Bazar Solidário IPAG</span>
              <h1 className="gf-heading-lg text-white mb-10 leading-[0.9] uppercase tracking-tighter">
                Transforme o que <br />você não usa em <br /><span className="text-primary">esperança.</span>
              </h1>
              <p className="text-2xl text-white/70 max-w-2xl font-light leading-relaxed mb-12">
                O Bazar Solidário IPAG conecta solidariedade e transformação social. Sua doação contribui diretamente para ações que beneficiam famílias e fortalecem nossos projetos.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold md:text-4xl">O que aceitamos</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {items.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.08}>
                <div className="rounded-3xl border border-border bg-background p-8 shadow-card-utility">
                  <it.icon className="h-9 w-9 text-primary" />
                  <p className="mt-5 text-lg font-semibold">{it.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Em bom estado de conservação.</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-3xl gradient-flame-soft p-10 md:p-12">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Ponto de entrega</h3>
                  <p className="mt-2 text-muted-foreground">{SITE.address}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
