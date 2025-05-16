export interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullname: string;
  email: string;
} 