import { Component, inject } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthFormValue } from '../../components/auth-form/auth-form-value.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  isLoading: boolean = false

  register(authFormValue: AuthFormValue) {
    this.isLoading = true
    this.authService.register(authFormValue)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Erreur login:', err)
      })
      .add(() => this.isLoading = false)
  }
}
