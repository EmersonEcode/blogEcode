import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Post } from '../../../../data/models/post.model';
import { PostService } from '../../services/post.service';
import { of, switchMap, tap } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import { ShareButtonsComponent } from "../../../../shared/components/share-buttons/share-buttons.component";
 import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  // Apenas CommonModule e os componentes que estamos usando
  imports: [CommonModule, MarkdownModule, SkeletonLoaderComponent, ShareButtonsComponent, MatIconModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // MUDANÇA 1: Trocamos post$ por uma propriedade simples 'post'.
  post: Post | undefined;
  isLoading = true; // Adicionamos um controle de loading

  shareUrl: string = '';
  shareText: string = '';

  ngOnInit(): void {
    // MUDANÇA 2: Removemos o 'this.post$ =' do início.
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        if (slug) {
          return this.postService.getPostBySlug(slug);
        }
        return of(undefined);
      }),
      tap(postData => {
        // A lógica de SEO continua aqui, funcionando perfeitamente
        if (postData) {
          this.titleService.setTitle(`${postData.title} | Ecode`);
          this.metaService.removeTag("name='description'");
          this.metaService.addTag({ name: 'description', content: postData.summary });
        } else {
          this.titleService.setTitle('Post Não Encontrado | Ecode');
        }
      })
    ).subscribe(postData => {
      // MUDANÇA 3: Dentro do subscribe, atribuímos os dados
      this.post = postData;
      this.isLoading = false; // Paramos o loading

      // A lógica de compartilhamento agora funciona corretamente
      if (this.post) {
        this.shareUrl = window.location.href;
        this.shareText = this.post.title;
      }
    });
  }
}