
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

// 'describe' cria uma "suíte de testes", um grupo de testes relacionados para o nosso PostService.
describe('PostService', () => {
  let service: PostService;

  // 'beforeEach' é uma função que roda ANTES de cada teste ('it') dentro desta suíte.
  // É perfeita para preparar o ambiente.
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura um ambiente de testes do Angular
    service = TestBed.inject(PostService); // Cria uma nova instância do nosso serviço
  });

  // 'it' define um "caso de teste" individual. A descrição deve dizer o que ele testa.
  it('should be created', () => {
    // 'expect' é a nossa "asserção". Estamos dizendo: "Eu espero que o serviço exista (não seja nulo)".
    expect(service).toBeTruthy();
  });

  // --- NOSSO PRIMEIRO TESTE REAL ---
  it('deve retornar dois posts "mock" do método getPosts()', (done: DoneFn) => {
    // Como getPosts() é assíncrono (retorna um Observable), o teste precisa saber quando ele terminou.
    // A função 'done' serve para isso.

    service.getPosts().subscribe(posts => {
      // Asserção 1: Eu espero que o tamanho do array de posts seja 2.
      expect(posts.length).toBe(2);

      // Asserção 2: Eu espero que o título do primeiro post seja exatamente este.
      expect(posts[0].title).toBe('Como Começar com Angular Standalone');

      // Chamamos 'done()' para dizer ao Jasmine: "O teste assíncrono terminou, pode continuar".
      done();
    });
  });

  // --- NOSSO SEGUNDO TESTE REAL ---
  it('deve retornar o post correto pelo slug com getPostBySlug()', (done: DoneFn) => {
    const slugToTest = 'guia-de-flexbox-css';

    service.getPostBySlug(slugToTest).subscribe(post => {
      // Asserção 1: Eu espero que o post retornado não seja nulo/undefined.
      expect(post).toBeDefined();

      // Asserção 2: Eu espero que o ID do post encontrado seja 2.
      // Usamos '?' para segurança, caso o post seja undefined.
      expect(post?.id).toBe(2);

      done();
    });
  });

  it('deve retornar "undefined" para um slug que não existe', (done: DoneFn) => {
    const slugToTest = 'slug-nao-existente';

    service.getPostBySlug(slugToTest).subscribe(post => {
      // Asserção: Eu espero que o resultado para um slug inválido seja 'undefined'.
      expect(post).toBeUndefined();
      done();
    });
  });
});