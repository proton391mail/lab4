import { User } from './user.model';

export interface Friendship {
  id: number;
  userId: number;
  friendId: number;
  status: 'active' | 'pending' | 'blocked';
  createdAt: string;
}

export interface FriendResponse {
  success: boolean;
  message?: string;
  friends?: User[];
  friendship?: Friendship;
  friend?: User;
} 