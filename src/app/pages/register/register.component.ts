import { Component } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthFormValue } from '../../components/auth-form/auth-form-value.interface';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router) { }

  register(authFormValue: AuthFormValue) {
    this.isLoading = true
    this.authService.register(authFormValue)
      .subscribe({
        error: (err) => console.error('Erreur login:', err)
      })
      .add(() => this.isLoading = false)
  }
}
