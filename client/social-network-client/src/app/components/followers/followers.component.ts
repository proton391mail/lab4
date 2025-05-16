import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Follower {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent {
  followers: Follower[] = [
    {
      id: 1,
      name: 'Melina Charlton',
      username: '@melinacharlton',
      avatar: 'melina-avatar.png',
      isFollowing: true
    },
    {
      id: 2,
      name: 'Saoirse Hopper',
      username: '@saoirsehop',
      avatar: 'saoirse-avatar.png',
      isFollowing: true
    },
    {
      id: 3,
      name: 'Kate Winslet',
      username: '@KateWinslet',
      avatar: 'kate-avatar.png',
      isFollowing: false
    },
    {
      id: 4,
      name: 'Elezabeth',
      username: '@elezabeth',
      avatar: 'elizabeth-avatar.png',
      isFollowing: false
    },
    {
      id: 5,
      name: 'Tom Cruise',
      username: '@tomcruise',
      avatar: 'tom-avatar.png',
      isFollowing: false
    },
    {
      id: 6,
      name: 'Robert Downey Jr.',
      username: '@rdj',
      avatar: 'robert-avatar.png',
      isFollowing: true
    },
    {
      id: 7,
      name: 'Shah Rukh Khan',
      username: '@srk',
      avatar: 'shah-avatar.png',
      isFollowing: false
    }
  ];
  
  constructor(private router: Router) {}
  
  toggleFollow(follower: Follower) {
    follower.isFollowing = !follower.isFollowing;
  }
  
  goBack() {
    this.router.navigate(['/feed']);
  }
  
  viewProfile(follower: Follower) {
    this.router.navigate(['/profile']);
  }
} 