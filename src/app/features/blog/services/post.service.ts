import { inject, Injectable } from "@angular/core";
import { Post } from "../../../data/models/post.model";
import { delay, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class PostService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  constructor() { }
  /**
   * Retorna um Observable com a lista de TODOS os posts.
   * Usado pela nossa página Home.
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`)
  }

  /**
   * Encontra um post específico pelo seu 'slug'.
   * Usado pela nossa página de Detalhe do Post.
   * @param slug A URL amigável do post a ser encontrado.
   * @returns Um Observable com o post encontrado ou 'undefined' se não encontrar.
   *
   */

  getPostBySlug(slug: string): Observable<Post | undefined> {
    return this.http.get<Post | undefined>(`${this.apiUrl}/posts/${slug}`)
      
  }


  getUniqueTags(): Observable<string[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      map(posts => {
        const allTags = posts.flatMap(post => post.tags);
        // Usa um Set para remover tags duplicadas
        const uniqueTags = [ ...new Set(allTags) ];
        return uniqueTags.sort();
      })
    )
  }

  getFeturedPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiUrl}/posts/featured/`);
  }

  createPost(post : Partial<Post>): Observable<Post>{
    return this.http.post<Post>(`${this.apiUrl}/posts`, post)
  }

  

  updatePost(slug: string, post: Partial<Post>) : Observable<Post>{
    return this.http.put<Post>(`${this.apiUrl}/posts/${slug}`, post);
  }

  deletePost(slug : string): Observable<Post | undefined>{
    return this.http.delete<Post>(`${this.apiUrl}/posts/${slug}`)
  }
  




}

