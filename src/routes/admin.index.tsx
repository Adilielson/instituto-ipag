import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderKanban, Calendar, Newspaper, Users, ArrowUpRight, TrendingUp, Sparkles, PlusCircle } from "lucide-react";
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
    { label: "Projetos", value: data.projects, icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Eventos", value: data.events, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Posts", value: data.posts, icon: Newspaper, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Categorias", value: data.categories, icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const quickActions = [
    { label: "Novo Post", to: "/admin/blog", icon: Newspaper, color: "bg-orange-500" },
    { label: "Novo Evento", to: "/admin/eventos", icon: Calendar, color: "bg-purple-500" },
    { label: "Novo Projeto", to: "/admin/projetos", icon: FolderKanban, color: "bg-blue-500" },
    { label: "Ver Site", to: "/", icon: ArrowUpRight, color: "bg-gray-700" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/5 p-6 sm:p-8 shadow-premium-utility transition-shadow duration-500">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Visão Geral</p>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#2A2A2B] mb-2 sm:mb-3">
            Olá, <span className="text-primary">{ADMIN_MASTER.name.split(' ')[0]}</span>!
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm font-medium leading-relaxed text-[#8E8E8F]">
            Seu painel administrativo está pronto. Monitore o impacto social e gerencie o conteúdo com facilidade.
          </p>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Stats Grid - 2 columns on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-black/5 p-4 sm:p-6 shadow-card-utility hover:shadow-premium-utility transition-all duration-300 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="flex items-center justify-center sm:items-start sm:justify-between mb-2 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${s.bg}`}>
                <s.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${s.color}`} />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black tracking-tight text-[#2A2A2B]">{s.value}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8E8E8F]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid - 2x2 on mobile */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {quickActions.map((action) => (
            <Link key={action.label} to={action.to} className="flex flex-col items-center justify-center gap-3 min-h-[100px] rounded-2xl bg-white border border-black/5 shadow-sm active:scale-95 transition-transform p-4">
                <div className={`p-3 rounded-xl ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2A2A2B]">{action.label}</span>
            </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-black/5 p-6 sm:p-8 shadow-premium-utility">
          <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-black/5 pb-4">
            <h3 className="text-sm sm:text-lg font-black uppercase tracking-tight">Atividade Recente</h3>
            <button className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">Ver Tudo</button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {recentPosts.length > 0 ? (
              recentPosts.map((post: any, i: number) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 group cursor-pointer">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-[#F7F8FA] flex items-center justify-center border border-black/5 group-hover:border-primary/30 transition-colors shrink-0">
                    <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-[#8E8E8F] group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#2A2A2B] truncate group-hover:text-primary transition-colors">
                      {post.titulo}
                    </p>
                    <p className="text-[8px] sm:text-[10px] font-bold text-[#8E8E8F] uppercase tracking-wider">
                      {new Date(post.data_publicacao).toLocaleDateString('pt-BR')} • Post
                    </p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              ))
            ) : (
              <p className="text-xs sm:text-sm text-gray/50 italic">Nenhuma atividade recente encontrada.</p>
            )}
          </div>
        </div>

        <div className="hidden sm:flex rounded-3xl gradient-flame p-8 text-white shadow-warm-utility relative overflow-hidden group flex-col">
            <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight">Pronto para causar impacto?</h3>
            <p className="text-sm font-medium opacity-90 mb-8 leading-relaxed">
              Tudo o que você cria ajuda o IPAG a transformar mais vidas através da música.
            </p>
            <Link to="/admin/blog" className="mt-auto bg-white text-primary rounded-full px-6 py-4 text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              Criar Novo Post
            </Link>
            <Sparkles className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V4M12 20V21M4 12H3M21 12H20M5.63604 5.63604L4.92893 4.92893M19.0711 19.0711L18.364 18.364M5.63604 18.364L4.92893 19.0711M19.0711 4.92893L18.364 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);