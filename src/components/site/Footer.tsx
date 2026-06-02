import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-symbol.png";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-24 grid-cols-1 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src="https://i.ibb.co/Z6Z7kLQN/LOGO-PNG-2.png" alt="IPAG" className="h-20 w-auto mb-8" />
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            {SITE.fullName}. <br />Transformando vidas através da educação, da cultura e do desenvolvimento social em São Mateus – ES.
          </p>
          <div className="flex gap-4">
            <a href={SITE.links.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" aria-label="Facebook">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={SITE.links.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" aria-label="Instagram">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">Institucional</h4>
          <ul className="space-y-4 text-sm font-bold text-white/50 uppercase tracking-wider">
            <li><Link to="/quem-somos" className="hover:text-primary transition-colors py-2 block">Quem Somos</Link></li>
            <li><Link to="/projetos" className="hover:text-primary transition-colors py-2 block">Projetos</Link></li>
            <li><Link to="/transparencia" className="hover:text-primary transition-colors py-2 block">Transparência</Link></li>
            <li><Link to="/eventos" className="hover:text-primary transition-colors py-2 block">Eventos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">Como apoiar</h4>
          <ul className="space-y-4 text-sm font-bold text-white/50 uppercase tracking-wider">
            <li><Link to="/parceiros" className="hover:text-primary transition-colors py-2 block">Seja Parceiro</Link></li>
            <li><Link to="/bazar" className="hover:text-primary transition-colors py-2 block">Bazar Solidário</Link></li>
            <li><Link to="/contato" className="hover:text-primary transition-colors py-2 block">Voluntariado</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">Fale Conosco</h4>
          <ul className="space-y-6 text-sm font-medium text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>{SITE.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>{SITE.whatsapp}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 text-xs text-center">
          <p>© {new Date().getFullYear()} {SITE.fullName}. Todos os direitos reservados.</p>
          <p className="hidden md:block">Organização da Sociedade Civil sem fins lucrativos.</p>
        </div>
      </div>
    </footer>
  );
}
