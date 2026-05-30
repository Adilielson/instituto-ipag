import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { VALUES } from "@/data/site";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — IPAG" },
      { name: "description", content: "Conheça a história do IPAG, idealizada pelo Pastor Antonio Gomes em 2006." },
      { property: "og:title", content: "Quem Somos — IPAG" },
      { property: "og:description", content: "Quase duas décadas de história, missão, visão e valores." },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  return (
    <>
      <section className="gradient-flame-soft py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Quem somos</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Um instituto que nasceu para <span className="text-gradient-flame">servir pessoas</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-muted-foreground md:px-8">
          <Reveal>
            <p>
              O Instituto de Desenvolvimento Social Pastor Antonio Gomes (IPAG) nasceu do desejo de promover
              desenvolvimento social, inclusão e qualidade de vida para a população de São Mateus e região.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Sua história começou em 2006, idealizada pelo Pastor Antonio Gomes, conhecido carinhosamente como
              <strong className="text-foreground"> Pastor Toninho</strong>. Homem dedicado às causas sociais,
              acreditava que a transformação de uma comunidade acontece quando pessoas se unem em torno de um
              propósito maior.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Ao longo dos anos, centenas de pessoas foram alcançadas por projetos educacionais, culturais e
              assistenciais desenvolvidos por voluntários, parceiros e apoiadores.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Em 2017, a instituição passou a se chamar <strong className="text-foreground">Instituto de
              Desenvolvimento Social Pastor Antonio Gomes</strong>, preservando o legado de um líder que dedicou
              sua vida ao cuidado das pessoas.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {[
            { title: "Missão", text: "Promover o desenvolvimento social através de ações que gerem oportunidades, inclusão, cidadania e valorização da vida." },
            { title: "Visão", text: "Ser referência regional em desenvolvimento social, educação e transformação comunitária." },
            { title: "Valores", list: VALUES },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-background p-8 shadow-card">
                <div className="h-1.5 w-12 rounded-full gradient-flame" />
                <h3 className="mt-5 text-2xl font-bold">{b.title}</h3>
                {b.text && <p className="mt-4 text-muted-foreground">{b.text}</p>}
                {b.list && (
                  <ul className="mt-4 space-y-2">
                    {b.list.map((v) => (
                      <li key={v} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {v}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
