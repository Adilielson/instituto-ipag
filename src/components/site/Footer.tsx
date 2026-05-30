import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
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
            <div className="flex gap-3">
              <a href="#" className="rounded-full border border-background/20 p-2.5 transition-colors hover:bg-primary hover:border-primary" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" width="16" height="16" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="rounded-full border border-background/20 p-2.5 transition-colors hover:bg-primary hover:border-primary" aria-label="Instagram">
                <svg className="h-4 w-4 fill-current" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="rounded-full border border-background/20 p-2.5 transition-colors hover:bg-primary hover:border-primary" aria-label="Youtube">
                <svg className="h-4 w-4 fill-current" width="16" height="16" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
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
