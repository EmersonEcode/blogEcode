import { Component, Host, HostListener, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { ProgressBarComponent } from "./shared/components/progress-bar/progress-bar.component";
import { routeAnimations } from './animations';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'blogecode';
  scrollProgress = 0;
  private contexts = inject(ChildrenOutletContexts);
  private themeService = inject(ThemeService);
  
  constructor() {
    // 3. CHAME O MÉTODO DE INICIALIZAÇÃO
    this.themeService.initializeTheme();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
    this.scrollProgress = (scrollTop / docHeight) * 100;
  } 

  getRouteAnimationData() {
    // Pega o dado 'animation' que vamos definir nas nossas rotas
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
