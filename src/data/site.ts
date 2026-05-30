import { Music, GraduationCap, HeartHandshake, Brain, Scissors, LifeBuoy } from "lucide-react";

export const SITE = {
  name: "IPAG",
  fullName: "Instituto de Desenvolvimento Social Pastor Antonio Gomes",
  city: "São Mateus – ES",
  address: "Avenida João XXIII, Boa Vista, São Mateus – ES",
  email: "instituto.ipag@gmail.com",
  phone: "(28) 99983-3567",
  whatsapp: "+55 28 99983-3567",
  links: {
    facebook: "https://www.facebook.com/profile.php?id=100071497621251",
    instagram: "https://www.instagram.com/ipag.ofc/",
  }
};

export const NAV = [
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/projetos", label: "Projetos" },
  { to: "/bazar", label: "Bazar Solidário" },
  { to: "/eventos", label: "Eventos" },
  { to: "/blog", label: "Blog" },
  { to: "/transparencia", label: "Transparência" },
  { to: "/contato", label: "Contato" },
] as const;

export const IMPACT_STATS = [
  { value: 19, suffix: "+", label: "Anos de atuação" },
  { value: 1200, suffix: "+", label: "Famílias atendidas" },
  { value: 6, suffix: "", label: "Projetos ativos" },
  { value: 80, suffix: "+", label: "Voluntários envolvidos" },
  { value: 50, suffix: "+", label: "Eventos realizados" },
  { value: 500, suffix: "+", label: "Alunos beneficiados" },
];

export const PROJECTS = [
  {
    slug: "tocando-o-coracao-de-deus",
    icon: Music,
    title: "Tocando o Coração de Deus",
    short: "Formação musical como instrumento de inclusão social e desenvolvimento humano.",
    description:
      "Projeto de formação musical que utiliza a música como instrumento de inclusão social, desenvolvimento humano e fortalecimento de valores. Os participantes têm acesso ao aprendizado de teoria musical, violão, teclado, violino e instrumentos de sopro, desenvolvendo disciplina, autoestima, convivência social e habilidades artísticas.",
  },
  {
    slug: "cetel",
    icon: GraduationCap,
    title: "CETEL — Centro Educacional e Teológico Logos",
    short: "Formação teológica e capacitação de líderes e professores.",
    description:
      "Projeto voltado à formação teológica e capacitação de líderes, professores e membros da comunidade. O CETEL promove conhecimento, desenvolvimento humano e formação baseada em princípios éticos e valores que fortalecem a atuação comunitária.",
  },
  {
    slug: "assistencia-social",
    icon: HeartHandshake,
    title: "Assistência Social",
    short: "Atendimento a famílias em situação de vulnerabilidade.",
    description:
      "Ações voltadas ao atendimento de famílias em situação de vulnerabilidade social através de campanhas solidárias, distribuição de alimentos, vestuário e apoio comunitário.",
  },
  {
    slug: "saude-mental-do-idoso",
    icon: Brain,
    title: "Saúde Mental do Idoso",
    short: "Bem-estar, convivência e qualidade de vida para a população idosa.",
    description:
      "Iniciativas voltadas à promoção do bem-estar, convivência social e qualidade de vida da população idosa.",
  },
  {
    slug: "tecnicas-artesanais",
    icon: Scissors,
    title: "Desenvolvimento de Técnicas Artesanais",
    short: "Capacitação, geração de renda e valorização de talentos.",
    description:
      "Projeto que incentiva a capacitação, geração de renda e valorização de talentos através de atividades manuais e artesanais.",
  },
  {
    slug: "valorizacao-da-vida",
    icon: LifeBuoy,
    title: "Apoio à Recuperação e Valorização da Vida",
    short: "Acolhimento e apoio para reconstruir vidas e vínculos.",
    description:
      "Ações de acolhimento, orientação e apoio a pessoas que buscam reconstruir suas vidas e fortalecer seus vínculos familiares e sociais.",
  },
];

export const VALUES = [
  "Amor ao próximo",
  "Respeito à dignidade humana",
  "Solidariedade",
  "Ética",
  "Transparência",
  "Inclusão",
  "Compromisso social",
  "Valorização da vida",
];

export const POSTS = [
  {
    slug: "tocando-coracao-mudou-vidas",
    title: "Como o projeto Tocando o Coração de Deus transformou jovens de São Mateus",
    excerpt: "A música como ferramenta de inclusão, disciplina e descoberta de talentos na comunidade.",
    date: "12 mai 2026",
    category: "Música e cultura",
  },
  {
    slug: "bazar-solidario-resultados",
    title: "Bazar Solidário IPAG: 6 meses transformando doações em esperança",
    excerpt: "Conheça o impacto direto das doações da comunidade nos projetos do instituto.",
    date: "28 abr 2026",
    category: "Solidariedade",
  },
  {
    slug: "cetel-nova-turma",
    title: "CETEL abre inscrições para nova turma de formação de líderes",
    excerpt: "Programa de capacitação teológica e ética inicia novo ciclo com vagas limitadas.",
    date: "10 abr 2026",
    category: "Educação",
  },
];

export const EVENTS = [
  {
    title: "Concerto Solidário — Tocando o Coração",
    date: "20 jun 2026",
    place: "Centro de São Mateus",
    description: "Apresentação dos alunos do projeto de formação musical.",
  },
  {
    title: "Campanha do Agasalho",
    date: "05 jul 2026",
    place: "Sede IPAG — Boa Vista",
    description: "Arrecadação e distribuição de roupas para famílias atendidas.",
  },
  {
    title: "Encontro de Líderes CETEL",
    date: "15 ago 2026",
    place: "Auditório IPAG",
    description: "Formação intensiva com líderes da comunidade e parceiros.",
  },
];

export const PARTNERS = [
  "Prefeitura de São Mateus",
  "Igreja Local",
  "Comércio Boa Vista",
  "Rotary Club",
  "ONG Vida Plena",
  "Sebrae ES",
  "Sicoob",
  "Empresa Parceira",
];
