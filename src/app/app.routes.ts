import { Routes } from '@angular/router';
import { BLOG_ROUTES } from './features/blog/blog.routes';
import { AboutPageComponent } from './features/about/pages/about-page/about-page.component';

export const routes: Routes = [

    {path: '', redirectTo: 'blog', pathMatch: 'full'},

    {
        path: 'blog',
        children: BLOG_ROUTES
    },

    {path: 'sobre', component: AboutPageComponent
    },

    {path: '**', loadComponent: () => import('./core/pages/not-found/not-found.component').then(m => m.NotFoundComponent)}
];
