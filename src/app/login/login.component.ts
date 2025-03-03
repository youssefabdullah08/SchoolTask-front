import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    studentEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private apiService: ApiCallsService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value as {studentEmail: string, password: string})
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            // Handle successful login
            this.router.navigate(['/home']);

          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle error
          }
        });
    }
  }
}
