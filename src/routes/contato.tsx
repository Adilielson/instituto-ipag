import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/data/site";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — IPAG" },
      { name: "description", content: "Fale com o Instituto Pastor Antonio Gomes — endereço, e-mail e WhatsApp." },
      { property: "og:title", content: "Contato IPAG" },
      { property: "og:description", content: "Estamos disponíveis para parcerias, voluntariado e informações." },
    ],
  }),
  component: Contato,
});

function Contato() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero 
        title="Vamos conversar"
        image="https://imgur.com/4FYIlqO.png"
        category="Fale Conosco"
      />

      <section className="py-20 bg-white">
        <div className="max-container grid gap-24 lg:grid-cols-5">
          <Reveal className="lg:col-span-2" direction="up">
            <div className="space-y-10">
              {[
                { icon: MapPin, label: "Endereço", value: SITE.address },
                { icon: Mail, label: "E-mail", value: SITE.email },
                { icon: Phone, label: "WhatsApp", value: SITE.whatsapp },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-6 group">
                  <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl gradient-flame text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <c.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">{c.label}</p>
                    <p className="text-xl font-light text-gray/80 leading-relaxed">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3" direction="up">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-[60px] border border-black/5 bg-white p-12 md:p-16 shadow-premium-utility"
            >
              <h2 className="text-3xl font-black uppercase tracking-tight text-dark mb-10">Envie uma mensagem</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <Input placeholder="NOME" required className="h-16 rounded-2xl bg-bg border-none px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary" />
                <Input type="email" placeholder="E-MAIL" required className="h-16 rounded-2xl bg-bg border-none px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary" />
              </div>
              <Input className="mt-6 h-16 rounded-2xl bg-bg border-none px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary" placeholder="ASSUNTO" required />
              <Textarea className="mt-6 min-h-[200px] rounded-3xl bg-bg border-none p-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-primary" placeholder="MENSAGEM" required />
              <Button type="submit" size="lg" className="mt-10 gf-button gf-button-primary w-full h-auto py-6">
                <Send className="mr-3 h-5 w-5" /> ENVIAR MENSAGEM
              </Button>
              {sent && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center font-black uppercase tracking-[0.2em] text-primary"
                >
                  Mensagem enviada com sucesso!
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
