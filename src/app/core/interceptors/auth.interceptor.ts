import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Se tivermos um token, clonamos a requisição e adicionamos o cabeçalho
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Envia a requisição modificada
    return next(clonedRequest);
  }

  // Se não tiver token, envia a requisição original mesmo
  return next(req);
};