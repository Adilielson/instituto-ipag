import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projetos_/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/projetos/$slug",
      params: params as any,
      replace: true,
    });
  },
});