import { createFileRoute, redirect } from '@tanstack/react-router'; 

export const Route = createFileRoute('/eventos_/$slug' as any)({ 
  beforeLoad: ({ params }) => { 
    throw redirect({ to: '/eventos/$slug', params: params as any, replace: true }); 
  } 
});