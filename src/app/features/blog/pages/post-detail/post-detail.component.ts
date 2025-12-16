import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Adicionei RouterModule para os links funcionarem
import { MarkdownModule } from 'ngx-markdown';
import { PostService } from '../../services/post.service';
import { Post } from '../../../../data/models/post.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, MarkdownModule, RouterModule], // Importante: RouterModule para o routerLink funcionar
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  // Dados do Post Atual
  post: Post | undefined;
  isLoading = true;
  
  // Dados Reais para a Sidebar
  recentPosts: Post[] = [];
  allTags: string[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router); // Para forçar recarregamento se clicar em link na mesma página
  private postService = inject(PostService);

  ngOnInit(): void {
    // 1. Ouve mudanças na URL (para carregar novo post se clicar na sidebar)
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });

    // 2. Carrega dados globais da sidebar (uma vez só)
    this.loadSidebarData();
  }

  private loadPost(slug: string) {
    this.isLoading = true;
    this.postService.getPostBySlug(slug).subscribe({
      next: (data) => {
        this.post = data;
        this.isLoading = false;
        // Scroll para o topo quando mudar de post
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Erro ao carregar post:', err);
        this.isLoading = false;
      }
    });
  }

  private loadSidebarData() {
    // Busca posts para o widget "Latest Posts"
    this.postService.getPosts().subscribe(posts => {
      // Pega os 3 primeiros posts (assumindo que a API já retorna ordenado por data)
      this.recentPosts = posts.slice(0, 3);
    });

    // Busca tags para os widgets de "Categorias" e "Tags"
    this.postService.getUniqueTags().subscribe(tags => {
      this.allTags = tags;
    });
  }
}