import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  signIn() {
    // Проверка тестовых учётных записей
    if ((this.email === 'admin' && this.password === 'admin123') || 
        (this.email === 'user1' && this.password === 'user123')) {
      
      // Сохраняем информацию о пользователе в localStorage для имитации сессии
      localStorage.setItem('currentUser', JSON.stringify({
        username: this.email,
        token: 'fake-jwt-token'
      }));
      
      this.router.navigate(['/timeline']);
    } else {
      alert('Неверные учётные данные. Используйте admin/admin123 или user1/user123');
    }
  }

  goToSignUp() {
    // В данном примере просто переходим на страницу входа снова
    // В реальном приложении здесь был бы переход на страницу регистрации
    alert('Регистрация пока не реализована');
  }
}
