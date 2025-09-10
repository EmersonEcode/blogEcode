import { Routes } from '@angular/router';
import { BLOG_ROUTES } from './features/blog/blog.routes';
import { AboutPageComponent } from './features/about/pages/about-page/about-page.component';
import { ADMIN_ROUTES } from './features/admin/admin-routing.routes';

export const routes: Routes = [

    {path: '', redirectTo: 'blog', pathMatch: 'full'},

    {
        path: 'blog',
        children: BLOG_ROUTES,
        data: { animation: 'Blog' } 

    },

    {
        path: 'sobre', component: AboutPageComponent,
        data: { animation: 'About' }
    },

    {
        path: 'admin',
        children: ADMIN_ROUTES
    },

    {
        path: '**',
        loadComponent: () => import('./core/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
        data: { animation: 'NotFound' }
    },

    
];
