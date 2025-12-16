import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`; // URL base para autenticação
  private tokenKey = 'auth_token'; // Nome da chave no localStorage

  // --- 1. LOGIN ---
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Se o login der certo, salvamos o token imediatamente
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  // --- 2. GERENCIAMENTO DO TOKEN ---
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // --- 3. ESTADO DO USUÁRIO ---
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Por enquanto, apenas checamos se o token existe.
    // No futuro, podemos checar se ele expirou.
    return !!token; 
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/']); // Manda o usuário para a home
  }
}
