import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  userName: string;
  userAvatar: string;
  timeAgo: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isFollowing: boolean;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  posts: Post[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Имитация загрузки данных с сервера
    this.loadPosts();
  }

  loadPosts(): void {
    // Фейковые данные постов
    this.posts = [
      {
        id: 1,
        userName: 'Elezabeth',
        userAvatar: 'assets/images/avatar.svg',
        timeAgo: '52 minutes ago',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
        image: 'https://via.placeholder.com/300',
        likes: 85,
        comments: 12,
        shares: 36,
        isFollowing: true
      },
      {
        id: 2,
        userName: 'Tom',
        userAvatar: 'assets/images/avatar.svg',
        timeAgo: '1 hour ago',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
        likes: 42,
        comments: 6,
        shares: 14,
        isFollowing: false
      }
    ];
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
