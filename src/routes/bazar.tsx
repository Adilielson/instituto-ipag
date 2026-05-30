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
      <section className="relative overflow-hidden gradient-flame py-24 text-primary-foreground md:py-32">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">Bazar Solidário IPAG</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Transforme o que você não usa em esperança.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/90">
              O Bazar Solidário IPAG conecta solidariedade e transformação social. Sua doação contribui diretamente
              para ações que beneficiam famílias e fortalecem nossos projetos.
            </p>
          </Reveal>
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
