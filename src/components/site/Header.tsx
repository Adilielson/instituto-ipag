import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";
import { NAV } from "@/data/site";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[200] transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-16">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={scrolled ? logo : "https://i.ibb.co/Z6Z7kLQN/LOGO-PNG-2.png"} 
            alt="IPAG" 
            className="h-[102px] md:h-[80px] w-auto transition-transform duration-500 group-hover:scale-105" 
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[13px] font-bold uppercase tracking-widest transition-colors hover:text-primary ${
                scrolled ? "text-dark" : "text-white"
              }`}
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="gf-button gf-button-primary py-3 px-6 rounded-[12px]">
            <Link to="/parceiros">DOE AGORA</Link>
          </Button>
        </div>


        <button
          className={`rounded-md p-3 lg:hidden transition-colors ${
            scrolled ? "text-dark" : "text-white"
          }`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full justify-center gradient-flame text-primary-foreground py-6">
              <Link to="/parceiros" onClick={() => setOpen(false)}>DOE AGORA</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
