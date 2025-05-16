import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  
  constructor(private router: Router) {}
  
  register() {
    console.log('Register with', this.name, this.email, this.password);
    this.router.navigate(['/feed']);
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  registerWithGoogle() {
    console.log('Register with Google');
    this.router.navigate(['/feed']);
  }
  
  registerWithTwitter() {
    console.log('Register with Twitter');
    this.router.navigate(['/feed']);
  }
  
  navigateBack(): void {
    this.router.navigate(['/login']);
  }
  
  signIn(): void {
    if (this.email && this.password) {
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/feed']);
    }
  }
  
  goToSignUp(event: Event): void {
    event.preventDefault();
    console.log('Sign up clicked');
  }
} 