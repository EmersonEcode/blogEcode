import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../blog/services/post.service';
import { Post } from '../../../../data/models/post.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.scss'
})
export class PostEditorComponent implements OnInit {

  private route = inject(ActivatedRoute)

  private router = inject(Router)
  private postService = inject(PostService)

  private fb = inject(FormBuilder)

  postForm!: FormGroup
  private currentSlug: string | null = null
  post: Post | undefined;

  isEditMode = false;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required],
      bannerImageUrl: [''],
      tags: [''], // Vamos tratar as tags como uma string separada por vírgulas
      isFeatured: [false]
    });

      this.currentSlug = this.route.snapshot.paramMap.get('slug');

      if (this.currentSlug) {
      this.isEditMode = true;
      // Se estamos editando, buscamos o post e preenchemos o formulário
      this.postService.getPostBySlug(this.currentSlug).subscribe(postData => {
        if (postData) {
          this.postForm.patchValue({
            ...postData,
            tags: postData.tags.join(', ') // Converte o array de tags em uma string
          });
        }
      });
    }

  }

  onSubmit(): void {
    if (this.postForm.invalid) {
    // Marca todos os campos como "tocados" para exibir mensagens de erro, se houver
    this.postForm.markAllAsTouched(); 
    return;
  }

  // Prepara os dados do formulário para serem enviados
  const formData = {
    ...this.postForm.value,
    tags: this.postForm.value.tags.split(',').map((tag: string) => tag.trim())
  };

  if (this.isEditMode && this.currentSlug) {
    // --- LÓGICA DE ATUALIZAÇÃO ---
    this.postService.updatePost(this.currentSlug, formData).subscribe({
      next: () => {
        // Sucesso! Navega de volta para o dashboard.
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => console.error('Erro ao atualizar o post:', err)
    });
  } else {
    // --- LÓGICA de CRIAÇÃO ---
    this.postService.createPost(formData).subscribe({
      next: () => {
        // Sucesso! Navega de volta para o dashboard.
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => console.error('Erro ao criar o post:', err)
    });
  }
}


}
