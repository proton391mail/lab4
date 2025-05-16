import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommentResponse, Post, PostResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  // Получение всех постов
  getAllPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Ошибка при получении постов:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при получении постов'));
      })
    );
  }

  // Создание нового поста
  createPost(userId: number, content: string): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.apiUrl, { userId, content }).pipe(
      catchError(error => {
        console.error('Ошибка при создании поста:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при создании поста'));
      })
    );
  }

  // Получение постов конкретного пользователя
  getUserPosts(userId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(error => {
        console.error('Ошибка при получении постов пользователя:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при получении постов пользователя'));
      })
    );
  }

  // Добавление комментария к посту
  addComment(postId: number, userId: number, content: string): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(`${this.apiUrl}/${postId}/comments`, { userId, content }).pipe(
      catchError(error => {
        console.error('Ошибка при добавлении комментария:', error);
        return throwError(() => new Error(error.error?.message || 'Ошибка при добавлении комментария'));
      })
    );
  }
} 