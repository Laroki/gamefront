import { Component, inject } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { AuthFormValue } from '../../components/auth-form/auth-form-value.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService)
  
  isLoading: boolean = false
  wrongCredentials: boolean = false

  login(authFormValue: AuthFormValue) {
    this.isLoading = true
    this.wrongCredentials = false
    this.authService.login(authFormValue)
      .subscribe({
        error: (err) => this.wrongCredentials = true
      })
      .add(() => this.isLoading = false)
  }
}
