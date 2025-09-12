import { Component } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthFormValue } from '../../components/auth-form/auth-form-value.interface';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router) { }

  login(authFormValue: AuthFormValue) {
    this.isLoading = true
    this.authService.login(authFormValue)
      .subscribe({
        error: (err) => console.error('Erreur login:', err)
      })
      .add(() => this.isLoading = false)
  }
}
