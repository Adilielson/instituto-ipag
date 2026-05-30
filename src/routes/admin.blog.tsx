import { createFileRoute } from "@tanstack/react-router";
import { POSTS } from "@/data/site";

export const Route = createFileRoute("/admin/blog")({ component: AdminBlog });

function AdminBlog() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
      <h1 className="text-2xl font-extrabold">Blog</h1>
      <ul className="mt-6 divide-y divide-border">
        {POSTS.map((p) => (
          <li key={p.slug} className="py-4">
            <p className="font-semibold">{p.title}</p>
            <p className="text-xs text-muted-foreground">{p.date} · {p.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
