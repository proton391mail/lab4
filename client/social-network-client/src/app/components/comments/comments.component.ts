import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  time: string;
  text: string;
  likes: number;
  isLiked: boolean;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  newComment: string = '';
  
  post = {
    id: 1,
    user: {
      name: 'Elezabeth',
      username: '@elezabeth',
      avatar: 'assets/images/avatar-4.svg',
      isOnline: true
    },
    time: '52 minute ago',
    text: 'Lets go for the hiking? I think we need some fresh air after all the weekend work. What do you think?',
    image: 'assets/images/post-image.svg',
    likes: 423,
    comments: 38,
    shares: 12
  };
  
  comments: Comment[] = [
    {
      id: 1,
      user: {
        name: 'Sarah Connor',
        username: '@sarahc',
        avatar: 'assets/images/avatar-1.svg',
        isOnline: true
      },
      time: '32 minute ago',
      text: 'I think that\'s a great idea! I could use some fresh air. When are you thinking?',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: 'Tom Cruise',
        username: '@tomcruise',
        avatar: 'assets/images/avatar-2.svg',
        isOnline: false
      },
      time: '28 minute ago',
      text: 'Count me in! Haven\'t been hiking in ages. The weather looks good for this weekend.',
      likes: 5,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: 'assets/images/avatar-3.svg',
        isOnline: true
      },
      time: '15 minute ago',
      text: 'I know a great trail about an hour from the city. Not too difficult but has amazing views!',
      likes: 3,
      isLiked: false
    }
  ];

  addComment(): void {
    if (!this.newComment.trim()) return;
    
    const comment: Comment = {
      id: this.comments.length + 1,
      user: {
        name: 'You',
        username: '@you',
        avatar: 'assets/images/profile-avatar.svg',
        isOnline: true
      },
      time: 'Just now',
      text: this.newComment,
      likes: 0,
      isLiked: false
    };
    
    this.comments.unshift(comment);
    this.newComment = '';
  }

  likeComment(comment: Comment): void {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
} 