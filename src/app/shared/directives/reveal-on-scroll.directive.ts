import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true // A diretiva será standalone, fácil de usar
})
export class RevealOnScrollDirective implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const options = {
      root: null, // Observa em relação ao viewport
      rootMargin: '0px',
      threshold: 0.1 // A animação dispara quando 10% do elemento estiver visível
    };

    // Cria o observador
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // entry.isIntersecting se torna 'true' quando o elemento entra na tela
        if (entry.isIntersecting) {
          // Adicionamos a classe que ativa a nossa animação CSS
          this.element.nativeElement.classList.add('is-visible');

          // Depois que a animação rodou uma vez, paramos de observar o elemento
          observer.unobserve(this.element.nativeElement);
        }
      });
    }, options);

    // Diz ao observador para começar a "vigiar" nosso elemento
    observer.observe(this.element.nativeElement);
  }
}