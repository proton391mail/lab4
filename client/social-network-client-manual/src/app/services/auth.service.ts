import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  // Загрузка пользователя из localStorage
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Регистрация нового пользователя
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Ошибка при регистрации:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при регистрации'));
      })
    );
  }

  // Вход в систему
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Ошибка при входе:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при входе'));
      })
    );
  }

  // Выход из системы
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Получение текущего пользователя
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Проверка, авторизован ли пользователь
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Проверка, является ли пользователь администратором
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === 'admin';
  }

  // Проверка текущего пользователя (в реальном приложении здесь была бы валидация токена)
  checkCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/me`).pipe(
      catchError(error => {
        console.error('Ошибка при проверке пользователя:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при проверке пользователя'));
      })
    );
  }
} 