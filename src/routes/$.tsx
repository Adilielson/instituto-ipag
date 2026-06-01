import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: ({ location }) => {
    const legacyPrefixes = ['/blog_', '/eventos_', '/projetos_'];
    for (const prefix of legacyPrefixes) {
      if (location.pathname.startsWith(prefix + '/')) {
        const newPath = location.pathname.replace(prefix + '/', prefix.replace('_', '') + '/');
        throw redirect({
          to: newPath,
          replace: true,
        });
      }
    }
  },
  component: () => null, // O redirect no beforeLoad deve impedir que chegue aqui
});