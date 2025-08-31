import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

export const BLOG_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: ':slug', component: PostDetailComponent}
];