import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  isOwner: boolean;
  time?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  contact = {
    name: '@tomcruise',
    avatar: 'assets/images/avatar-5.svg',
    lastActive: '10 sec ago',
    isOnline: true
  };

  messages: Message[] = [
    {
      id: 1,
      text: 'Hey! How are you? It\'s been a while. How is your travel to UK?',
      isOwner: true,
      time: '10:30 AM'
    },
    {
      id: 2,
      text: 'Hey too!',
      isOwner: false,
      time: '10:32 AM'
    },
    {
      id: 3,
      text: 'Its great, UK is awesome, espesially London. New job is good so far! How about you?',
      isOwner: false,
      time: '10:33 AM'
    },
    {
      id: 4,
      text: 'I\'m fine, i\'m thinking about new project. I want to open an online store',
      isOwner: true,
      time: '10:35 AM'
    },
    {
      id: 5,
      text: 'But I don\'t know what to sell. Maybe I will sell stones and water',
      isOwner: true,
      time: '10:36 AM'
    },
    {
      id: 6,
      text: 'Yeah it\'s great idea, you know - everyone needs water, I dont know about stones xD',
      isOwner: false,
      time: '10:40 AM'
    }
  ];

  newMessage: string = '';

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const message: Message = {
      id: this.messages.length + 1,
      text: this.newMessage,
      isOwner: true,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    this.messages.push(message);
    this.newMessage = '';
  }

  makeVoiceCall(): void {
    console.log('Making voice call to', this.contact.name);
  }
} 