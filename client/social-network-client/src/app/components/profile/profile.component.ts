import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile = {
    name: 'Tom Cruise',
    username: '@tomcruise',
    avatar: 'assets/social-media-images/profile-avatar.png',
    isFollowing: false,
    isOnline: true,
    stats: {
      followers: '6.3k',
      posts: '572',
      following: '2.5k'
    },
    projects: [
      { id: 1, image: 'https://source.unsplash.com/random/300x200?movie' },
      { id: 2, image: 'https://source.unsplash.com/random/300x200?actor' },
      { id: 3, image: 'https://source.unsplash.com/random/300x200?hollywood' }
    ]
  };
  
  constructor(private router: Router) {}
  
  toggleFollow() {
    this.profile.isFollowing = !this.profile.isFollowing;
  }
  
  goBack() {
    this.router.navigate(['/feed']);
  }
  
  goToChat() {
    this.router.navigate(['/chat']);
  }
} 