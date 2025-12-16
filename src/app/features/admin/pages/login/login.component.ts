import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para usar [(ngModel)]
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          // Sucesso! Vai para o dashboard
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Usuário ou senha inválidos';
          console.error(err);
        }
      });
  }
}