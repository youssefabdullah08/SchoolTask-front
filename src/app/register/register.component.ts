import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required), 
    studentEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(
    private apiService: ApiCallsService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value as {
        firstName: string,
        lastName: string,
        studentEmail: string,
        password: string,
        confirmPassword: string
      }).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Handle successful registration
          // Navigate to home after successful registration
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle error
        }
      });
    }
  }
}
