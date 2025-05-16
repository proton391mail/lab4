import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { FollowersComponent } from './components/followers/followers.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PhonebookComponent } from './components/phonebook/phonebook.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CommentsComponent } from './components/comments/comments.component';
import { TimelineComponent } from './components/timeline/timeline.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'phonebook', component: PhonebookComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: '**', redirectTo: '' }
];
