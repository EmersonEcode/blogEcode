import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostEditorComponent } from './pages/post-editor/post-editor.component';

export const ADMIN_ROUTES: Routes = [
  {
    // Todas as rotas dentro do admin usarão o AdminLayoutComponent como "casca"
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redireciona /admin para /admin/dashboard
      { path: 'dashboard', component: DashboardComponent },      // A rota /admin/dashboard
      { path: 'editor', component: PostEditorComponent },        // A rota /admin/editor (para criar um novo post)
      { path: 'editor/:slug', component: PostEditorComponent }   // A rota /admin/editor/:slug (para editar um post existente)
    ]
  }
];

