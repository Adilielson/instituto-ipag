import { Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Menu, X, Search, LayoutDashboard, ShoppingBag, Newspaper, Phone, Users, History, Megaphone, FileText, Info } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";
import { NAV } from "@/data/site";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((to: string) => {
    setSearchOpen(false);
    window.location.href = to;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md shadow-card" : "bg-background/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="IPAG — Instituto Pastor Antonio Gomes" className="h-12 w-auto" />
          </Link>
          
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-40 md:w-64 items-center gap-2 rounded-full border border-border bg-muted/50 px-4 text-sm text-muted-foreground transition-all hover:bg-muted hover:ring-2 hover:ring-primary/20 lg:w-80"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Pesquisar...</span>
            <span className="ml-auto hidden rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 md:block">
              ⌘K
            </span>
          </button>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="gradient-flame text-primary-foreground shadow-warm hover:opacity-95">
            <Link to="/parceiros">Seja Parceiro</Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 lg:hidden"
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
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 gradient-flame text-primary-foreground">
              <Link to="/parceiros" onClick={() => setOpen(false)}>Seja Parceiro</Link>
            </Button>
          </div>
        </div>
      )}

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="O que você está procurando?" />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          
          <CommandGroup heading="Acesso Rápido">
            <CommandItem onSelect={() => handleSelect("/")}>
              <Info className="mr-2 h-4 w-4" />
              <span>Página Inicial</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/admin")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Painel Administrativo</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/bazar")}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Bazar Solidário</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/blog")}>
              <Newspaper className="mr-2 h-4 w-4" />
              <span>Blog / Notícias</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/contato")}>
              <Phone className="mr-2 h-4 w-4" />
              <span>Contato</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Institucional">
            <CommandItem onSelect={() => handleSelect("/quem-somos")}>
              <History className="mr-2 h-4 w-4" />
              <span>Quem Somos / Nossa História</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/projetos")}>
              <Users className="mr-2 h-4 w-4" />
              <span>Nossos Projetos</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/eventos")}>
              <Megaphone className="mr-2 h-4 w-4" />
              <span>Eventos</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/transparencia")}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Portal da Transparência</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
