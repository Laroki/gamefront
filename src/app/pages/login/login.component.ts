import { Component, inject } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthFormValue } from '../../components/auth-form/auth-form-value.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router);

  isLoading: boolean = false
  wrongCredentials: boolean = false

  login(authFormValue: AuthFormValue) {
    this.isLoading = true
    this.wrongCredentials = false
    this.authService.login(authFormValue)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.wrongCredentials = true
      })
      .add(() => this.isLoading = false)
  }
}
