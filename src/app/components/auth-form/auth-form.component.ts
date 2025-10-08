import { Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthFormValue } from '../../interfaces/auth-form-value.interface';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  authType = input<'register' | 'login'>('register')
  isLoading = input(false)
  wrongCredentials = input(false)
  formSubmitted = output<AuthFormValue>()
  authForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.formSubmitted.emit(this.authForm.value);
    } else {
      console.log('Form invalid');
    }
  }
}
