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
      <section className="gradient-flame-soft py-32 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
        <div className="max-container relative z-10">
          <Reveal>
            <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 block text-sm">Nossa Jornada</span>
            <h1 className="gf-heading-lg text-dark max-w-5xl">
              UM INSTITUTO QUE NASCEU <br />PARA <span className="text-gradient-flame">SERVIR PESSOAS</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-40">
        <div className="max-container grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 text-xl text-gray/80 leading-relaxed font-light">
            <Reveal>
              <p className="text-2xl text-dark font-medium border-l-4 border-primary pl-8 py-2">
                O IPAG nasceu em 2006 do desejo do Pastor Antonio Gomes de promover desenvolvimento, inclusão e dignidade em São Mateus.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Idealizado pelo <strong className="text-dark font-black">Pastor Toninho</strong>, o instituto acredita que a transformação de uma comunidade acontece quando pessoas se unem em torno de um propósito maior e ações concretas.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Ao longo das décadas, centenas de pessoas foram alcançadas por projetos educacionais, culturais e assistenciais desenvolvidos por uma rede sólida de voluntários e apoiadores.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Hoje, preservamos o legado de um líder que dedicou sua vida ao cuidado do próximo, unindo excelência institucional e acolhimento humano em cada projeto.
              </p>
            </Reveal>
          </div>
          
          <Reveal direction="left">
             <div className="relative rounded-[60px] overflow-hidden shadow-premium-utility aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop" 
                  alt="Legado IPAG" 
                  className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                />
             </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/40 py-24">
        <div className="max-container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Missão", text: "Promover o desenvolvimento social através de ações que gerem oportunidades, inclusão, cidadania e valorização da vida." },
            { title: "Visão", text: "Ser referência regional em desenvolvimento social, educação e transformação comunitária com excelência." },
            { title: "Valores", list: VALUES },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1} direction="up">
              <div className="h-full rounded-[40px] bg-white p-10 shadow-premium-utility border border-black/5 hover:shadow-warm-utility transition-all duration-700">
                <div className="h-2 w-16 rounded-full gradient-flame mb-8" />
                <h3 className="text-3xl font-black uppercase tracking-tight text-dark mb-6">{b.title}</h3>
                {b.text && <p className="text-lg text-gray/70 leading-relaxed font-light">{b.text}</p>}
                {b.list && (
                  <ul className="space-y-4">
                    {b.list.map((v) => (
                      <li key={v} className="flex items-center gap-3 text-lg text-gray/70 font-light">
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0" /> {v}
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
