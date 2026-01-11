import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // include styles if any
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    // Ensure both fields are filled
    if (!this.userId || !this.password) {
      this.error = 'Please enter both User ID and Password';
      return;
    }

    // Pass credentials as a single object
    this.auth.login({ userId: this.userId, password: this.password }).subscribe({
      next: (res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Login failed: Invalid response';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = 'Invalid Login';
      }
    });
  }
}
