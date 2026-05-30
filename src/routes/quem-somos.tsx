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

      <section className="bg-bg py-32 md:py-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        </div>

        <div className="max-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Missão - Large Bento Box */}
            <div className="md:col-span-8 group">
              <Reveal direction="up">
                <div className="h-full min-h-[400px] rounded-[40px] md:rounded-[60px] bg-white p-10 md:p-16 shadow-premium-utility border border-black/5 hover:shadow-warm-utility transition-all duration-700 relative overflow-hidden flex flex-col justify-end group">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-dark mb-8 leading-none">Missão</h3>
                    <p className="text-xl md:text-2xl text-gray/70 leading-relaxed font-light max-w-2xl">
                      Promover o desenvolvimento social através de ações que gerem oportunidades, inclusão, cidadania e valorização da vida.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Visão - Vertical Bento Box */}
            <div className="md:col-span-4 group">
              <Reveal delay={0.1} direction="up">
                <div className="h-full min-h-[400px] rounded-[40px] md:rounded-[60px] bg-dark p-10 md:p-14 shadow-premium-utility border border-white/5 hover:shadow-2xl transition-all duration-700 relative overflow-hidden flex flex-col group">
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-10 text-white group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-8 leading-none">Visão</h3>
                    <p className="text-xl text-white/60 leading-relaxed font-light mt-auto">
                      Ser referência regional em desenvolvimento social, educação e transformação comunitária com excelência.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Valores - Long Horizontal Bento Box */}
            <div className="md:col-span-12 group">
              <Reveal delay={0.2} direction="up">
                <div className="rounded-[40px] md:rounded-[60px] bg-white p-10 md:p-16 shadow-premium-utility border border-black/5 hover:shadow-warm-utility transition-all duration-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                      <div className="max-w-md">
                        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-10 text-primary group-hover:scale-110 transition-transform duration-500">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-dark mb-6 leading-none">Valores</h3>
                        <p className="text-xl text-gray/50 leading-relaxed font-light">
                          Os pilares que sustentam cada ação e decisão do Instituto Pastor Antonio Gomes.
                        </p>
                      </div>

                      <div className="flex-grow">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                          {VALUES.map((v, idx) => (
                            <div key={v} className="flex items-center gap-4 group/item">
                              <span className="h-2 w-2 rounded-full bg-primary shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                              <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-dark/70 group-hover/item:text-primary transition-colors">
                                {v}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
