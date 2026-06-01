import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    const legacyPrefixes = ["/blog_", "/eventos_", "/projetos_"];
    for (const prefix of legacyPrefixes) {
      if (location.pathname.startsWith(prefix)) {
        // Handle both trailing slash and no trailing slash legacy URLs
        // e.g., /blog_slug or /blog_/slug (though Usually it's /blog_slug in standard patterns)
        const parts = location.pathname.split("_");
        if (parts.length >= 2) {
          const baseRoute = prefix.replace("/", "").replace("_", "");
          const slug = parts[1].startsWith("/") ? parts[1].substring(1) : parts[1];
          
          if (slug) {
            throw redirect({
              to: `/${baseRoute}/$slug`,
              params: { slug },
              replace: true,
            });
          }
        }
      }
    }
  },
  component: () => null,
});