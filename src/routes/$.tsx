import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    const legacyPrefixes = ["/blog_", "/eventos_", "/projetos_"];
    for (const prefix of legacyPrefixes) {
      if (location.pathname.startsWith(prefix)) {
        const baseRoute = prefix.replace("/", "").replace("_", "");
        // Extract the slug: it's everything after the prefix (e.g., "slug" from "/blog_slug")
        const slug = location.pathname.substring(prefix.length);
        
        if (slug) {
          throw redirect({
            to: `/${baseRoute}/${slug}`,
            replace: true,
          });
        }
      }
    }
  },
  component: () => null,
});