import { createFileRoute, redirect } from '@tanstack/react-router'; 

export const Route = createFileRoute('/blog_/$slug')({ 
  beforeLoad: ({ params }) => { 
    throw redirect({ to: '/blog/$slug', params, replace: true }); 
  } 
});