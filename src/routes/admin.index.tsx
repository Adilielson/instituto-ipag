import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, Calendar, Newspaper, Users, ArrowUpRight, TrendingUp } from "lucide-react";
import { ADMIN_MASTER } from "@/lib/admin-mock";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [
      { count: projectsCount },
      { count: eventsCount },
      { count: postsCount },
      { count: categoriesCount }
    ] = await Promise.all([
      supabase.from("projetos").select("*", { count: 'exact', head: true }),
      supabase.from("eventos").select("*", { count: 'exact', head: true }),
      supabase.from("posts").select("*", { count: 'exact', head: true }),
      supabase.from("blog_categories").select("*", { count: 'exact', head: true })
    ]);

    const { data: recentPosts } = await supabase
      .from("posts")
      .select("titulo, data_publicacao")
      .order("data_publicacao", { ascending: false })
      .limit(3);

    return {
      stats: {
        projects: projectsCount || 0,
        events: eventsCount || 0,
        posts: postsCount || 0,
        categories: categoriesCount || 0,
      },
      recentPosts: (recentPosts || []) as { titulo: string; data_publicacao: string }[]
    };
  },
  component: AdminHome,
});

function AdminHome() {
  const { stats: data, recentPosts } = Route.useLoaderData() as any;

  const stats = [
    { label: "Projetos Ativos", value: data.projects, icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Eventos Agendados", value: data.events, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Posts Publicados", value: data.posts, icon: Newspaper, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Categorias de Blog", value: data.categories, icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 p-8 shadow-premium-utility hover:shadow-[0_20px_50px_-12px_rgba(247,155,52,0.15)] transition-shadow duration-500">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Visão Geral do Sistema</p>
          <h1 className="text-4xl font-black tracking-tight text-[#2A2A2B] mb-3">
            Bem-vindo, <span className="text-primary">{ADMIN_MASTER.name.split(' ')[0]}</span>!
          </h1>
          <p className="max-w-2xl text-[#8E8E8F] font-medium leading-relaxed">
            Seu painel administrativo está pronto para gestão. Aqui você pode monitorar o impacto social, 
            gerenciar eventos e atualizar o blog institucional com facilidade.
          </p>
        </div>
        {/* Abstract background shape */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-10 right-10 h-32 w-32 rounded-full bg-accent/5 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 shadow-card-utility hover:shadow-premium-utility transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" /> +12%
              </div>
            </div>
            <div>
              <p className="text-4xl font-black tracking-tight text-[#2A2A2B] mb-1">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8E8E8F]">{s.label}</p>
            </div>
            <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-black/5 p-8 shadow-premium-utility">
          <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
            <h3 className="text-lg font-black uppercase tracking-tight">Atividade Recente</h3>
            <button className="text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">Ver Tudo</button>
          </div>
          <div className="space-y-6">
            {recentPosts.length > 0 ? (
              recentPosts.map((post, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-12 w-12 rounded-2xl bg-[#F7F8FA] flex items-center justify-center border border-black/5 group-hover:border-primary/30 transition-colors">
                    <Newspaper className="h-5 w-5 text-[#8E8E8F] group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2A2A2B] truncate group-hover:text-primary transition-colors">
                      {post.titulo}
                    </p>
                    <p className="text-[10px] font-bold text-[#8E8E8F] uppercase tracking-wider">
                      {new Date(post.data_publicacao).toLocaleDateString('pt-BR')} • Por Admin
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray/50 italic">Nenhuma atividade recente encontrada.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl gradient-flame p-8 text-white shadow-warm-utility relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight">Pronto para causar impacto hoje?</h3>
            <p className="text-sm font-medium opacity-90 mb-8 leading-relaxed">
              Tudo o que você cria e gerencia aqui ajuda o IPAG a transformar mais vidas através da música e educação.
            </p>
            <button className="mt-auto bg-white text-primary rounded-full px-6 py-4 text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
              Criar Novo Post
            </button>
          </div>
          <Sparkles className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V4M12 20V21M4 12H3M21 12H20M5.63604 5.63604L4.92893 4.92893M19.0711 19.0711L18.364 18.364M5.63604 18.364L4.92893 19.0711M19.0711 4.92893L18.364 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);