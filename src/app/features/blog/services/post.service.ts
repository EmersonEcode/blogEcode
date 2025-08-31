import { Injectable } from "@angular/core";
import { Post } from "../../../data/models/post.model";
import { delay, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {

      // Nosso banco de dados "fake" com os posts
  private mockPosts: Post[] = [
    {
      id: 1,
      slug: 'como-comecar-com-angular-standalone',
      title: 'Como Começar com Angular Standalone',
      summary: 'Um guia completo para iniciar seu primeiro projeto com a nova arquitetura do Angular.',
      author: 'Ecode Blog',
      publishedDate: new Date('2025-08-29'),
      tags: ['Angular', 'Frontend', 'TypeScript'],
      // ==========================================================
      // A GRANDE MUDANÇA ESTÁ AQUI: a propriedade 'content'
      // Usamos crases (``) para poder escrever em múltiplas linhas.
      // ==========================================================
      content: `
Este é o primeiro parágrafo do meu post sobre Angular Standalone Components.

Markdown permite escrever de forma fácil e natural, com suporte para **negrito**, *itálico* e muito mais.

### Exemplo de Código

Aqui está um exemplo de como gerar um componente standalone:

\`\`\`typescript
// No seu terminal, rode o comando:
ng g c meu-componente --standalone
\`\`\`

Isso facilita muito a vida do desenvolvedor Angular!
      `
    },
    {
      id: 2,
      slug: 'guia-de-flexbox-css',
      title: 'Guia Definitivo de Flexbox CSS',
      summary: 'Aprenda de uma vez por todas como usar Flexbox para criar layouts responsivos e modernos.',
      author: 'Ecode Blog',
      publishedDate: new Date('2025-08-25'),
      tags: ['CSS', 'Frontend', 'Design'],
      // Note que este segundo post não tem a propriedade 'content'.
      // Como a definimos como opcional no modelo (content?: string), não há problema.
      content: `
# Guia de Flexbox

Flexbox é um modelo de layout poderoso no CSS que facilita a criação de layouts flexíveis e responsivos.

## Conceitos Básicos

- **Container Flex**: O elemento pai que contém os itens flexíveis.
- **Itens Flex**: Os elementos filhos dentro do container flex.

### Propriedades Comuns

- \`display: flex;\`: Define o container como um flex container.
- \`flex-direction\`: Define a direção dos itens (linha ou coluna).
- \`justify-content\`: Alinha os itens horizontalmente.
- \`align-items\`: Alinha os itens verticalmente.

Experimente essas propriedades para ver como elas afetam o layout!
      `     
}];
  constructor() { }
  /**
   * Retorna um Observable com a lista de TODOS os posts.
   * Usado pela nossa página Home.
   */
  getPosts(): Observable<Post[]> {
    return of(this.mockPosts).pipe(delay(500)); // Simula um atraso de 500ms
  }

  /**
   * Encontra um post específico pelo seu 'slug'.
   * Usado pela nossa página de Detalhe do Post.
   * @param slug A URL amigável do post a ser encontrado.
   * @returns Um Observable com o post encontrado ou 'undefined' se não encontrar.
   */
  getPostBySlug(slug: string): Observable<Post | undefined> {
    const post = this.mockPosts.find(p => p.slug === slug);
    return of(post).pipe(delay(1000)); // Simula um atraso de 500ms
  }


  getUniqueTags(): Observable<string[]> {
      // Pega todos os arrays de tags e os transforma em um único array
  // Ex: [['a','b'], ['b','c']] se torna ['a','b','b','c']
    const allTags = this.mockPosts.flatMap(post => post.tags);
    // Usa um Set para remover tags duplicadas
    const uniqueTags = [ ...new Set(allTags) ];
    return of(uniqueTags.sort()).pipe(delay(300)); // Simula um atraso de 300ms
  }
}

