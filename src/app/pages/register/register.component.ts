import { Component, inject } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthFormValue } from '../../components/auth-form/auth-form-value.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService)

  isLoading: boolean = false

  register(authFormValue: AuthFormValue) {
    this.isLoading = true
    this.authService.register(authFormValue)
      .subscribe({
        error: (err) => console.error('Erreur login:', err)
      })
      .add(() => this.isLoading = false)
  }
}
