import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../blog/services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../../data/models/post.model';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from "../../../about/pages/about-page/about-page.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AboutPageComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private router = inject(Router)
  private postService = inject(PostService);
  allPosts: Post[] = []

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.allPosts = posts;
    })
  }

  deletePost(slug: string, title: string): void {
    // Usamos a função 'confirm' nativa do navegador para pedir confirmação
    const confirmation = confirm(`Você tem certeza que deseja deletar o post "${title}"? Esta ação não pode ser desfeita.`);

    if (confirmation) {
      this.postService.deletePost(slug).subscribe({
        next: () => {
          console.log('Post deletado com sucesso!');
          // Após deletar, recarregamos a lista de posts para a tela ser atualizada
          this.loadPosts(); 
        },
        error: (err) => {
          console.error('Erro ao deletar o post:', err);
          // No futuro, podemos mostrar uma notificação de erro para o usuário
        }
      });
    }
  }





  editPost(slug: string): void {
    this.router.navigate(['/admin/editor', slug])  }

}
