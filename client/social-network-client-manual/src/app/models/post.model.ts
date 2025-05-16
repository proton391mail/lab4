import { User } from './user.model';

export interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  author?: User;
}

export interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  author?: User;
}

export interface PostResponse {
  success: boolean;
  message?: string;
  posts?: Post[];
  post?: Post;
}

export interface CommentResponse {
  success: boolean;
  message?: string;
  comment?: Comment;
} 