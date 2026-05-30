import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";

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
      <section className="gradient-flame-soft py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contato</span>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Vamos <span className="text-gradient-flame">conversar</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Endereço", value: SITE.address },
                { icon: Mail, label: "E-mail", value: SITE.email },
                { icon: Phone, label: "WhatsApp", value: SITE.whatsapp },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-flame text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                    <p className="mt-1 font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl border border-border bg-background p-8 shadow-card"
            >
              <h2 className="text-2xl font-bold">Envie uma mensagem</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Input placeholder="Nome" required />
                <Input type="email" placeholder="E-mail" required />
              </div>
              <Input className="mt-4" placeholder="Assunto" required />
              <Textarea className="mt-4 min-h-[140px]" placeholder="Mensagem" required />
              <Button type="submit" size="lg" className="mt-6 gradient-flame text-primary-foreground">
                <Send className="mr-2 h-4 w-4" /> Enviar mensagem
              </Button>
              {sent && <p className="mt-4 text-sm font-medium text-primary">Mensagem enviada! Em breve retornaremos.</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
