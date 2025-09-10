// src/app/animations.ts
import { trigger, transition, style, query, group, animate, sequence } from '@angular/animations';

 export const routeAnimations =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Define o estado inicial para ambas as páginas (a que entra e a que sai)
      // O mais importante: a posição é 'relative', mantendo os elementos no fluxo do layout.
      query(':enter, :leave', [
        style({
          position: 'relative',
          opacity: 1,
        })
      ], { optional: true }),

      // A página que vai entrar começa invisível e fora do caminho
      query(':enter', [
        style({
          opacity: 0,
        })
      ], { optional: true }),

      // A mágica da sequência: força as animações a rodarem uma DEPOIS da outra.
      sequence([
        // 1. Primeiro, anima a página que está SAINDO até ela ficar invisível.
        query(':leave', [
          animate('200ms ease-out', style({ opacity: 0 }))
        ], { optional: true }),

        // 2. SÓ DEPOIS que a primeira terminar, anima a página que está ENTRANDO até ela ficar visível.
        query(':enter', [
          animate('300ms ease-in', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]);

