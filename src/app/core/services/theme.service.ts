import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(rendererFactory: RendererFactory2) {
    // Usamos o Renderer2 para manipular o DOM de forma segura no Angular
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Método para inicializar o tema quando a aplicação carrega
  initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Se não houver tema salvo, podemos até checar a preferência do sistema do usuário
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  // Método para alternar entre os temas
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  // Método privado que faz o trabalho sujo
  private setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    // Salva a preferência no localStorage do navegador
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}