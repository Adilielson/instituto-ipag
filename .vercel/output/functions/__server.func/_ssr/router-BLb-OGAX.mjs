import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CzbV9FqZ.mjs";
import { s as Music, j as GraduationCap, l as HeartHandshake, B as Brain, x as Scissors, m as LifeBuoy, X, r as Menu, p as MapPin, M as Mail, u as Phone } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-CKUNOT4r.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const logo = "/assets/logo-horizontal-CqiJBWON.png";
const SITE = {
  fullName: "Instituto de Desenvolvimento Social Pastor Antonio Gomes",
  address: "Avenida João XXIII, Boa Vista, São Mateus – ES",
  email: "instituto.ipag@gmail.com",
  whatsapp: "+55 28 99983-3567",
  links: {
    facebook: "https://www.facebook.com/profile.php?id=100071497621251",
    instagram: "https://www.instagram.com/ipag.ofc/"
  }
};
const NAV = [
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/projetos", label: "Projetos" },
  { to: "/eventos", label: "Eventos" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" }
];
const IMPACT_STATS = [
  { value: 19, suffix: "+", label: "Anos de atuação" },
  { value: 1200, suffix: "+", label: "Famílias atendidas" },
  { value: 6, suffix: "", label: "Projetos ativos" },
  { value: 80, suffix: "+", label: "Voluntários envolvidos" },
  { value: 50, suffix: "+", label: "Eventos realizados" },
  { value: 500, suffix: "+", label: "Alunos beneficiados" }
];
const PROJECTS = [
  {
    slug: "tocando-o-coracao-de-deus",
    icon: Music,
    title: "Tocando o Coração de Deus",
    short: "Formação musical como instrumento de inclusão social e desenvolvimento humano.",
    description: "Projeto de formação musical que utiliza a música como instrumento de inclusão social, desenvolvimento humano e fortalecimento de valores. Os participantes têm acesso ao aprendizado de teoria musical, violão, teclado, violino e instrumentos de sopro, desenvolvendo disciplina, autoestima, convivência social e habilidades artísticas."
  },
  {
    slug: "cetel",
    icon: GraduationCap,
    title: "CETEL — Centro Educacional e Teológico Logos",
    short: "Formação teológica e capacitação de líderes e professores.",
    description: "Projeto voltado à formação teológica e capacitação de líderes, professores e membros da comunidade. O CETEL promove conhecimento, desenvolvimento humano e formação baseada em princípios éticos e valores que fortalecem a atuação comunitária."
  },
  {
    slug: "assistencia-social",
    icon: HeartHandshake,
    title: "Assistência Social",
    short: "Atendimento a famílias em situação de vulnerabilidade.",
    description: "Ações voltadas ao atendimento de famílias em situação de vulnerabilidade social através de campanhas solidárias, distribuição de alimentos, vestuário e apoio comunitário."
  },
  {
    slug: "saude-mental-do-idoso",
    icon: Brain,
    title: "Saúde Mental do Idoso",
    short: "Bem-estar, convivência e qualidade de vida para a população idosa.",
    description: "Iniciativas voltadas à promoção do bem-estar, convivência social e qualidade de vida da população idosa."
  },
  {
    slug: "tecnicas-artesanais",
    icon: Scissors,
    title: "Desenvolvimento de Técnicas Artesanais",
    short: "Capacitação, geração de renda e valorização de talentos.",
    description: "Projeto que incentiva a capacitação, geração de renda e valorização de talentos através de atividades manuais e artesanais."
  },
  {
    slug: "valorizacao-da-vida",
    icon: LifeBuoy,
    title: "Apoio à Recuperação e Valorização da Vida",
    short: "Acolhimento e apoio para reconstruir vidas e vínculos.",
    description: "Ações de acolhimento, orientação e apoio a pessoas que buscam reconstruir suas vidas e fortalecer seus vínculos familiares e sociais."
  }
];
const VALUES = [
  "Amor ao próximo",
  "Respeito à dignidade humana",
  "Solidariedade",
  "Ética",
  "Transparência",
  "Inclusão",
  "Compromisso social",
  "Valorização da vida"
];
const POSTS = [
  {
    slug: "tocando-coracao-mudou-vidas",
    title: "Como o projeto Tocando o Coração de Deus transformou jovens de São Mateus",
    excerpt: "A música como ferramenta de inclusão, disciplina e descoberta de talentos na comunidade.",
    date: "12 mai 2026",
    category: "Música e cultura"
  },
  {
    slug: "bazar-solidario-resultados",
    title: "Bazar Solidário IPAG: 6 meses transformando doações em esperança",
    excerpt: "Conheça o impacto direto das doações da comunidade nos projetos do instituto.",
    date: "28 abr 2026",
    category: "Solidariedade"
  },
  {
    slug: "cetel-nova-turma",
    title: "CETEL abre inscrições para nova turma de formação de líderes",
    excerpt: "Programa de capacitação teológica e ética inicia novo ciclo com vagas limitadas.",
    date: "10 abr 2026",
    category: "Educação"
  }
];
const EVENTS = [
  {
    title: "Concerto Solidário — Tocando o Coração",
    date: "20 jun 2026",
    place: "Centro de São Mateus",
    description: "Apresentação dos alunos do projeto de formação musical."
  },
  {
    title: "Campanha do Agasalho",
    date: "05 jul 2026",
    place: "Sede IPAG — Boa Vista",
    description: "Arrecadação e distribuição de roupas para famílias atendidas."
  },
  {
    title: "Encontro de Líderes CETEL",
    date: "15 ago 2026",
    place: "Auditório IPAG",
    description: "Formação intensiva com líderes da comunidade e parceiros."
  }
];
const PARTNERS = [
  "Prefeitura de São Mateus",
  "Igreja Local",
  "Comércio Boa Vista",
  "Rotary Club",
  "ONG Vida Plena",
  "Sebrae ES",
  "Sicoob",
  "Empresa Parceira"
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[16px] text-sm font-semibold cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(247,155,52,0.3)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-premium-utility",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-4 shadow-sm" : "bg-white py-6"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2 group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "IPAG", className: "h-[52px] md:h-[62px] w-auto transition-transform duration-500 group-hover:scale-105" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.to,
              className: "text-[13px] font-bold uppercase tracking-widest text-dark hover:text-primary transition-colors",
              activeProps: { className: "text-primary" },
              children: item.label
            },
            item.to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gf-button gf-button-primary py-3 px-6 rounded-[12px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/parceiros", children: "DOE AGORA" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "rounded-md p-2 lg:hidden",
              onClick: () => setOpen((o) => !o),
              "aria-label": "Abrir menu",
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4", children: [
          NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.to,
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted",
              children: item.label
            },
            item.to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-2 gradient-flame text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/parceiros", onClick: () => setOpen(false), children: "Seja Parceiro" }) })
        ] }) })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-dark text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-16 px-4 py-24 md:grid-cols-2 md:px-8 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://i.ibb.co/Z6Z7kLQN/LOGO-PNG-2.png", alt: "IPAG", className: "h-20 w-auto mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-sm leading-relaxed mb-8", children: [
          SITE.fullName,
          ". ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Transformando vidas através da educação, da cultura e do desenvolvimento social em São Mateus – ES."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.links.facebook, target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all", "aria-label": "Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-4 w-4 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.links.instagram, target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all", "aria-label": "Instagram", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-4 w-4 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8", children: "Institucional" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-sm font-bold text-white/50 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quem-somos", className: "hover:text-primary transition-colors", children: "Quem Somos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projetos", className: "hover:text-primary transition-colors", children: "Projetos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/transparencia", className: "hover:text-primary transition-colors", children: "Transparência" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eventos", className: "hover:text-primary transition-colors", children: "Eventos" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8", children: "Como apoiar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-sm font-bold text-white/50 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/parceiros", className: "hover:text-primary transition-colors", children: "Seja Parceiro" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bazar", className: "hover:text-primary transition-colors", children: "Bazar Solidário" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contato", className: "hover:text-primary transition-colors", children: "Voluntariado" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8", children: "Fale Conosco" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-6 text-sm font-medium text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: SITE.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: SITE.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: SITE.whatsapp })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/5 py-12 px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        SITE.fullName,
        ". Todos os direitos reservados."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Organização da Sociedade Civil sem fins lucrativos." })
    ] }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Página não encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "O endereço que você procura não existe ou foi movido." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md gradient-flame px-5 py-2.5 text-sm font-medium text-primary-foreground",
        children: "Voltar para a Home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Algo deu errado" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Tente novamente em instantes." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md gradient-flame px-5 py-2.5 text-sm font-medium text-primary-foreground",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-md border border-input px-5 py-2.5 text-sm font-medium", children: "Ir para Home" })
    ] })
  ] }) });
}
const Route$k = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IPAG — Instituto de Desenvolvimento Social Pastor Antonio Gomes" },
      { name: "description", content: "Transformando vidas em São Mateus – ES através da educação, da cultura e do desenvolvimento social." },
      { property: "og:title", content: "IPAG — Instituto de Desenvolvimento Social Pastor Antonio Gomes" },
      { property: "og:description", content: "Transformando vidas em São Mateus – ES através da educação, da cultura e do desenvolvimento social." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IPAG — Instituto de Desenvolvimento Social Pastor Antonio Gomes" },
      { name: "twitter:description", content: "Transformando vidas em São Mateus – ES através da educação, da cultura e do desenvolvimento social." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/d6332c8b-d89c-4476-8682-6c251da3ebf7" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/d6332c8b-d89c-4476-8682-6c251da3ebf7" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$k.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
const $$splitComponentImporter$j = () => import("./transparencia-BPCG2XbK.mjs");
const Route$j = createFileRoute("/transparencia")({
  head: () => ({
    meta: [{
      title: "Transparência — IPAG"
    }, {
      name: "description",
      content: "Documentos institucionais, estatuto, relatórios de atividades e prestação de contas."
    }, {
      property: "og:title",
      content: "Transparência IPAG"
    }, {
      property: "og:description",
      content: "Compromisso com clareza e responsabilidade."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./quem-somos-C6dCI_cO.mjs");
const Route$i = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [{
      title: "Quem Somos — IPAG"
    }, {
      name: "description",
      content: "Conheça a história do IPAG, idealizada pelo Pastor Antonio Gomes em 2006."
    }, {
      property: "og:title",
      content: "Quem Somos — IPAG"
    }, {
      property: "og:description",
      content: "Quase duas décadas de história, missão, visão e valores."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getProjetos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2762b8da27f2bd41156a91959174a23f06ac02d76e236a8a7ce4183978106d96"));
const getProjetoBySlug = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(createSsrRpc("37afd61c13ddc537b9953cec7cf45125716e17e27efbb9d531007363e891809f"));
const getPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("859a16cba0e4ad6ed215241c768a307f25f794946268666b7f3d1024bbf346d4"));
const getPostBySlug = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(createSsrRpc("52151ebfb2785144c8712316d5feb67e7e40b93d622550b027942d5f4eb136f0"));
const getEventos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("02c8e6c07f1e4a843f06b74bbbae1cd39cc72679957fdc14917b7a6e79a8a680"));
const getEventoBySlug = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(createSsrRpc("38b4af48470fcb55cad3f95e631c16d613eddb32eaf8c3142126847e6f92d65d"));
const createEvento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  titulo: stringType(),
  slug: stringType(),
  data_evento: stringType(),
  local: stringType(),
  descricao: stringType().optional(),
  status: stringType().default("publicado"),
  imagem_destaque: stringType().optional(),
  galeria: arrayType(stringType()).optional(),
  video_url: stringType().optional()
})).handler(createSsrRpc("6cf556854356a6e613669a258c856f82f672a7538922a72168c47668d3a6b89f"));
const updateEvento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  titulo: stringType(),
  slug: stringType(),
  data_evento: stringType(),
  local: stringType(),
  descricao: stringType().optional(),
  status: stringType(),
  imagem_destaque: stringType().optional(),
  galeria: arrayType(stringType()).optional(),
  video_url: stringType().optional()
})).handler(createSsrRpc("18902821ee7658dc416f6b845a2bbbfcdc69afc5690fe760c9b561a798836b1a"));
const deleteEvento = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType()
})).handler(createSsrRpc("64e617df992cba1401fc93ec369d59df73b546fd35f1d332023cbb5e6bc7a8ee"));
const $$splitComponentImporter$h = () => import("./projetos-BKTmCo2o.mjs");
const Route$h = createFileRoute("/projetos")({
  loader: async () => {
    try {
      const projetos = await getProjetos();
      return {
        projetos: projetos && projetos.length > 0 ? projetos : PROJECTS.map((p) => ({
          titulo: p.title,
          resumo: p.short,
          categoria: "FORMAÇÃO",
          slug: p.slug,
          imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
        }))
      };
    } catch {
      return {
        projetos: PROJECTS.map((p) => ({
          titulo: p.title,
          resumo: p.short,
          categoria: "FORMAÇÃO",
          slug: p.slug,
          imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
        }))
      };
    }
  },
  head: () => ({
    meta: [{
      title: "Projetos — IPAG"
    }, {
      name: "description",
      content: "Conheça as frentes de atuação do IPAG: música, formação, assistência social e mais."
    }, {
      property: "og:title",
      content: "Projetos — IPAG"
    }, {
      property: "og:description",
      content: "Frentes de ação que transformam famílias em São Mateus."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./parceiros-CvqJE0TL.mjs");
const Route$g = createFileRoute("/parceiros")({
  head: () => ({
    meta: [{
      title: "Seja Parceiro — IPAG"
    }, {
      name: "description",
      content: "Apoie projetos sociais de impacto duradouro em São Mateus – ES."
    }, {
      property: "og:title",
      content: "Seja Parceiro IPAG"
    }, {
      property: "og:description",
      content: "Patrocínio, doação, voluntariado corporativo e responsabilidade social."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./eventos-C3nc8TH8.mjs");
const Route$f = createFileRoute("/eventos")({
  loader: async () => {
    try {
      const eventos = await getEventos();
      return {
        eventos: eventos && eventos.length > 0 ? eventos : EVENTS.map((e, idx) => ({
          id: String(idx),
          titulo: e.title,
          descricao: e.description,
          data_evento: (/* @__PURE__ */ new Date()).toISOString(),
          local: e.place
        }))
      };
    } catch {
      return {
        eventos: EVENTS.map((e, idx) => ({
          id: String(idx),
          titulo: e.title,
          descricao: e.description,
          data_evento: (/* @__PURE__ */ new Date()).toISOString(),
          local: e.place
        }))
      };
    }
  },
  head: () => ({
    meta: [{
      title: "Eventos — IPAG"
    }, {
      name: "description",
      content: "Concertos, campanhas, cursos e ações comunitárias do IPAG."
    }, {
      property: "og:title",
      content: "Eventos IPAG"
    }, {
      property: "og:description",
      content: "Acompanhe as próximas ações e apresentações."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./contato-B-ql8w9G.mjs");
const Route$e = createFileRoute("/contato")({
  head: () => ({
    meta: [{
      title: "Contato — IPAG"
    }, {
      name: "description",
      content: "Fale com o Instituto Pastor Antonio Gomes — endereço, e-mail e WhatsApp."
    }, {
      property: "og:title",
      content: "Contato IPAG"
    }, {
      property: "og:description",
      content: "Estamos disponíveis para parcerias, voluntariado e informações."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./blog-DVmOmuOp.mjs");
const Route$d = createFileRoute("/blog")({
  loader: async () => {
    try {
      const posts = await getPosts();
      return {
        posts: posts && posts.length > 0 ? posts : POSTS.map((p) => ({
          titulo: p.title,
          resumo: p.excerpt,
          categoria: p.category,
          slug: p.slug,
          data_publicacao: (/* @__PURE__ */ new Date()).toISOString()
        }))
      };
    } catch {
      return {
        posts: POSTS.map((p) => ({
          titulo: p.title,
          resumo: p.excerpt,
          categoria: p.category,
          slug: p.slug,
          data_publicacao: (/* @__PURE__ */ new Date()).toISOString()
        }))
      };
    }
  },
  head: () => ({
    meta: [{
      title: "Blog — IPAG"
    }, {
      name: "description",
      content: "Conteúdo sobre desenvolvimento social, educação, cultura e histórias de transformação."
    }, {
      property: "og:title",
      content: "Blog IPAG"
    }, {
      property: "og:description",
      content: "Histórias, projetos e reflexões da nossa equipe."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./bazar-DzQmMunL.mjs");
const Route$c = createFileRoute("/bazar")({
  head: () => ({
    meta: [{
      title: "Bazar Solidário — IPAG"
    }, {
      name: "description",
      content: "Doe roupas, calçados, brinquedos e livros. Transforme o que você não usa em esperança."
    }, {
      property: "og:title",
      content: "Bazar Solidário IPAG"
    }, {
      property: "og:description",
      content: "Solidariedade que financia projetos sociais em São Mateus."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin-7290zDgI.mjs");
const Route$b = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Dashboard — IPAG"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-CHM5FDeW.mjs");
const Route$a = createFileRoute("/")({
  loader: async () => {
    try {
      const [projetos, posts, eventos] = await Promise.all([getProjetos().catch(() => []), getPosts().catch(() => []), getEventos().catch(() => [])]);
      const finalProjetos = projetos && projetos.length > 0 ? projetos : PROJECTS.map((p) => ({
        titulo: p.title,
        resumo: p.short,
        categoria: "FORMAÇÃO",
        slug: p.slug,
        imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
      }));
      const finalPosts = posts && posts.length > 0 ? posts : POSTS.map((p) => ({
        titulo: p.title,
        resumo: p.excerpt,
        categoria: p.category,
        slug: p.slug,
        data_publicacao: (/* @__PURE__ */ new Date()).toISOString()
      }));
      const finalEventos = eventos && eventos.length > 0 ? eventos : EVENTS.map((e, idx) => ({
        id: String(idx),
        titulo: e.title,
        descricao: e.description,
        data_evento: (/* @__PURE__ */ new Date()).toISOString(),
        local: e.place
      }));
      return {
        projetos: finalProjetos.slice(0, 10),
        posts: finalPosts.slice(0, 3),
        eventos: finalEventos.slice(0, 3)
      };
    } catch (e) {
      console.error("Loader error:", e);
      return {
        projetos: PROJECTS.map((p) => ({
          titulo: p.title,
          resumo: p.short,
          categoria: "FORMAÇÃO",
          slug: p.slug,
          imagem_destaque: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
        })).slice(0, 10),
        posts: POSTS.map((p) => ({
          titulo: p.title,
          resumo: p.excerpt,
          categoria: p.category,
          slug: p.slug,
          data_publicacao: (/* @__PURE__ */ new Date()).toISOString()
        })).slice(0, 3),
        eventos: EVENTS.map((e2, idx) => ({
          id: String(idx),
          titulo: e2.title,
          descricao: e2.description,
          data_evento: (/* @__PURE__ */ new Date()).toISOString(),
          local: e2.place
        })).slice(0, 3)
      };
    }
  },
  head: () => ({
    meta: [{
      title: "IPAG — Transformando vidas em São Mateus"
    }, {
      name: "description",
      content: "Quase duas décadas promovendo educação, cultura, assistência social e valorização da vida em São Mateus – ES."
    }, {
      property: "og:title",
      content: "IPAG — Instituto Pastor Antonio Gomes"
    }, {
      property: "og:description",
      content: "Educação, cultura e desenvolvimento social que transformam comunidades."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.index-bm8bp6xy.mjs");
const Route$9 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./projetos._slug-BgYLZfru.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./projetos._slug-0pzkdThm.mjs");
const Route$8 = createFileRoute("/projetos/$slug")({
  loader: async ({
    params
  }) => {
    const project = await getProjetoBySlug({
      data: {
        slug: params.slug
      }
    });
    if (!project) throw notFound();
    return {
      project
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.project?.titulo ?? "Projeto"} — IPAG`
    }, {
      name: "description",
      content: loaderData?.project?.resumo ?? ""
    }, {
      property: "og:title",
      content: loaderData?.project?.titulo ?? ""
    }, {
      property: "og:description",
      content: loaderData?.project?.resumo ?? ""
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./eventos._slug-CJCsDsCh.mjs");
const Route$7 = createFileRoute("/eventos/$slug")({
  loader: async ({
    params
  }) => {
    const evento = await getEventoBySlug({
      data: {
        slug: params.slug
      }
    });
    if (!evento) throw new Error("Evento não encontrado");
    return {
      evento
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.evento?.titulo} — IPAG`
    }, {
      name: "description",
      content: loaderData?.evento?.descricao?.slice(0, 160)
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./blog._slug-B_rlNPs8.mjs");
const $$splitNotFoundComponentImporter = () => import("./blog._slug-5n_NURd_.mjs");
const Route$6 = createFileRoute("/blog/$slug")({
  loader: async ({
    params
  }) => {
    const post = await getPostBySlug({
      data: {
        slug: params.slug
      }
    });
    const allPosts = await getPosts();
    const relatedPosts = (allPosts || []).filter((p) => p.slug !== params.slug && p.categoria === post?.categoria).slice(0, 3);
    if (!post) throw notFound();
    return {
      post,
      relatedPosts
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.post?.titulo ?? "Post"} — IPAG`
    }, {
      name: "description",
      content: loaderData?.post?.resumo ?? ""
    }, {
      property: "og:title",
      content: loaderData?.post?.titulo ?? ""
    }, {
      property: "og:description",
      content: loaderData?.post?.resumo ?? ""
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.usuarios-DT6bbZD1.mjs");
const Route$5 = createFileRoute("/admin/usuarios")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.transparencia-DFwiUCha.mjs");
const Route$4 = createFileRoute("/admin/transparencia")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.projetos-CUKcQkef.mjs");
const Route$3 = createFileRoute("/admin/projetos")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.parceiros-BLBl8mCS.mjs");
const Route$2 = createFileRoute("/admin/parceiros")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.eventos-lfeL32Ef.mjs");
const Route$1 = createFileRoute("/admin/eventos")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.blog-tQt4h9b6.mjs");
const Route = createFileRoute("/admin/blog")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TransparenciaRoute = Route$j.update({
  id: "/transparencia",
  path: "/transparencia",
  getParentRoute: () => Route$k
});
const QuemSomosRoute = Route$i.update({
  id: "/quem-somos",
  path: "/quem-somos",
  getParentRoute: () => Route$k
});
const ProjetosRoute = Route$h.update({
  id: "/projetos",
  path: "/projetos",
  getParentRoute: () => Route$k
});
const ParceirosRoute = Route$g.update({
  id: "/parceiros",
  path: "/parceiros",
  getParentRoute: () => Route$k
});
const EventosRoute = Route$f.update({
  id: "/eventos",
  path: "/eventos",
  getParentRoute: () => Route$k
});
const ContatoRoute = Route$e.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$k
});
const BlogRoute = Route$d.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$k
});
const BazarRoute = Route$c.update({
  id: "/bazar",
  path: "/bazar",
  getParentRoute: () => Route$k
});
const AdminRoute = Route$b.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const AdminIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ProjetosSlugRoute = Route$8.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ProjetosRoute
});
const EventosSlugRoute = Route$7.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => EventosRoute
});
const BlogSlugRoute = Route$6.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AdminUsuariosRoute = Route$5.update({
  id: "/usuarios",
  path: "/usuarios",
  getParentRoute: () => AdminRoute
});
const AdminTransparenciaRoute = Route$4.update({
  id: "/transparencia",
  path: "/transparencia",
  getParentRoute: () => AdminRoute
});
const AdminProjetosRoute = Route$3.update({
  id: "/projetos",
  path: "/projetos",
  getParentRoute: () => AdminRoute
});
const AdminParceirosRoute = Route$2.update({
  id: "/parceiros",
  path: "/parceiros",
  getParentRoute: () => AdminRoute
});
const AdminEventosRoute = Route$1.update({
  id: "/eventos",
  path: "/eventos",
  getParentRoute: () => AdminRoute
});
const AdminBlogRoute = Route.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminBlogRoute,
  AdminEventosRoute,
  AdminParceirosRoute,
  AdminProjetosRoute,
  AdminTransparenciaRoute,
  AdminUsuariosRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const BlogRouteChildren = {
  BlogSlugRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const EventosRouteChildren = {
  EventosSlugRoute
};
const EventosRouteWithChildren = EventosRoute._addFileChildren(EventosRouteChildren);
const ProjetosRouteChildren = {
  ProjetosSlugRoute
};
const ProjetosRouteWithChildren = ProjetosRoute._addFileChildren(
  ProjetosRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  BazarRoute,
  BlogRoute: BlogRouteWithChildren,
  ContatoRoute,
  EventosRoute: EventosRouteWithChildren,
  ParceirosRoute,
  ProjetosRoute: ProjetosRouteWithChildren,
  QuemSomosRoute,
  TransparenciaRoute
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  IMPACT_STATS as I,
  PARTNERS as P,
  Route$h as R,
  SITE as S,
  VALUES as V,
  Route$f as a,
  Route$d as b,
  Route$a as c,
  Route$8 as d,
  Route$7 as e,
  Route$6 as f,
  cn as g,
  createEvento as h,
  deleteEvento as i,
  getEventos as j,
  router as r,
  updateEvento as u
};
