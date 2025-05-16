import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  id: number;
  content: string;
  image: string | null;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  user: User;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  newPostContent: string = '';
  
  posts: Post[] = [
    {
      id: 1,
      content: "Just enjoying a beautiful sunset at the beach. The colors are amazing!",
      image: "sunset.jpg",
      time: "45 min ago",
      likes: 124,
      comments: 23,
      shares: 5,
      liked: false,
      user: {
        id: 1,
        name: "Kate Winslet",
        username: "@KateWinslet",
        avatar: "kate-avatar.png"
      }
    },
    {
      id: 2,
      content: "New work project starting today. Excited about the possibilities!",
      image: null,
      time: "2h ago",
      likes: 87,
      comments: 14,
      shares: 3,
      liked: true,
      user: {
        id: 2,
        name: "Tom Cruise",
        username: "@tomcruise",
        avatar: "tom-avatar.png"
      }
    },
    {
      id: 3,
      content: "Check out my new photo shoot for Vogue. It was an amazing experience working with this team!",
      image: "photo-shoot.jpg",
      time: "Yesterday",
      likes: 352,
      comments: 47,
      shares: 28,
      liked: false,
      user: {
        id: 3,
        name: "Melina Charlton",
        username: "@melinacharlton",
        avatar: "melina-avatar.png"
      }
    }
  ];
  
  constructor(private router: Router) {}
  
  toggleLike(post: Post): void {
    post.liked = !post.liked;
    if (post.liked) {
      post.likes++;
    } else {
      post.likes--;
    }
  }
  
  navigateToProfile(username: string) {
    this.router.navigate(['/profile']);
  }
  
  navigateToComments(postId: number) {
    this.router.navigate(['/comments']);
  }
  
  sharePost(postId: number) {
    console.log('Sharing post', postId);
  }
  
  createPost() {
    if (!this.newPostContent.trim()) return;
    
    console.log('Creating post:', this.newPostContent);
    this.newPostContent = '';
  }
  
  toggleNavigation() {
    console.log('Toggle navigation');
  }
} 