import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    const legacyPrefixes = ['/blog_', '/eventos_', '/projetos_'];
    for (const prefix of legacyPrefixes) {
      if (location.pathname.startsWith(prefix + '/')) {
        const baseRoute = prefix.replace('_', '');
        const slug = location.pathname.split('/').pop();
        const params = { slug };
        
        throw redirect({
          to: `${baseRoute}/$slug`,
          params,
          replace: true,
        });
      }
    }
  },
  component: () => null,
});