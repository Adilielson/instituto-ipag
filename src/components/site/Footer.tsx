import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-symbol.png";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <img src={logo} alt="IPAG" className="h-16 w-16" />
          <p className="mt-4 max-w-sm text-sm text-background/70">
            {SITE.fullName}. Transformando vidas através da educação, da cultura e do desenvolvimento social em São Mateus – ES.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-full border border-background/20 p-2.5 transition-colors hover:bg-primary hover:border-primary"
                aria-label="Rede social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Institucional</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/quem-somos" className="hover:text-background">Quem Somos</Link></li>
            <li><Link to="/projetos" className="hover:text-background">Projetos</Link></li>
            <li><Link to="/transparencia" className="hover:text-background">Transparência</Link></li>
            <li><Link to="/eventos" className="hover:text-background">Eventos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Como apoiar</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/parceiros" className="hover:text-background">Seja Parceiro</Link></li>
            <li><Link to="/bazar" className="hover:text-background">Bazar Solidário</Link></li>
            <li><Link to="/contato" className="hover:text-background">Voluntariado</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{SITE.address}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" />{SITE.email}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" />{SITE.whatsapp}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-background/50 md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} {SITE.fullName}. Todos os direitos reservados.</p>
          <p>Organização da Sociedade Civil sem fins lucrativos.</p>
        </div>
      </div>
    </footer>
  );
}
