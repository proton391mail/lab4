import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showLogin = false;
  email: string = '';
  password: string = '';
  
  constructor(private router: Router) {}
  
  getStarted() {
    this.showLogin = true;
  }
  
  login() {
    console.log('Login with', this.email, this.password);
    this.router.navigate(['/feed']);
  }
  
  loginWithGoogle() {
    console.log('Login with Google');
    this.router.navigate(['/feed']);
  }
  
  loginWithTwitter() {
    console.log('Login with Twitter');
    this.router.navigate(['/feed']);
  }
  
  navigateToSignIn(): void {
    this.router.navigate(['/register']);
  }
  
  goToSignUp() {
    this.router.navigate(['/register']);
  }
} 