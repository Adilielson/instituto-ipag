import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog_/$slug" as any)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/blog/$slug",
      params: params as any,
      replace: true,
    });
  },
});