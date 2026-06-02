import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, HandHeart, Megaphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { PARTNERS } from "@/data/site";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Seja Parceiro — IPAG" },
      { name: "description", content: "Apoie projetos sociais de impacto duradouro em São Mateus – ES." },
      { property: "og:title", content: "Seja Parceiro IPAG" },
      { property: "og:description", content: "Patrocínio, doação, voluntariado corporativo e responsabilidade social." },
    ],
  }),
  component: Parceiros,
});

const WAYS = [
  { icon: Building2, title: "Patrocínio institucional", text: "Apoie financeiramente projetos com impacto mensurável." },
  { icon: HandHeart, title: "Doação de recursos", text: "Contribua com bens, materiais e infraestrutura." },
  { icon: Users, title: "Voluntariado corporativo", text: "Engaje seu time em ações comunitárias estruturadas." },
  { icon: Megaphone, title: "Responsabilidade social", text: "Desenvolva ações conjuntas alinhadas à sua marca." },
];

function Parceiros() {
  return (
    <>
      <PageHero 
        title="Grandes transformações acontecem juntos"
        subtitle="O IPAG busca constantemente parcerias que ampliem o alcance dos projetos e gerem impacto social duradouro."
        image="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
        category="Parceiros e Investidores"
      >
        <Button asChild size="lg" className="mb-8 gradient-flame text-primary-foreground"><Link to="/contato">Quero ser parceiro</Link></Button>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          {WAYS.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-border bg-background p-7 shadow-card-utility">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-flame text-primary-foreground">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold md:text-4xl">Parceiros que caminham conosco</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {PARTNERS.map((p) => (
              <div key={p} className="flex h-20 items-center justify-center rounded-xl border border-border bg-background px-4 text-center text-sm font-semibold text-muted-foreground">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
