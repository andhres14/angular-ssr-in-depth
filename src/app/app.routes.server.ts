import { RenderMode,ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'courses/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(){
      return [
        { id: '01' },
        { id: '02' },
        { id: '03' }
      ]
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
