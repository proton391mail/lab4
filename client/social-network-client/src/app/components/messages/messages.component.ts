import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Contact {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  isOnline: boolean;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  searchQuery: string = '';
  
  contacts: Contact[] = [
    {
      id: 1,
      name: 'Elezabeth',
      username: '@elezabeth',
      avatar: 'assets/images/avatar-1.svg',
      lastMessage: 'Hey, can you help me with this project?',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: 'Tom Cruise',
      username: '@tomcruise',
      avatar: 'assets/images/avatar-2.svg',
      lastMessage: 'Yeah it\'s great idea, you know - everyone needs water, I dont know about stones xD',
      lastMessageTime: '10:40 AM',
      isOnline: true
    },
    {
      id: 3,
      name: 'Sarah Connor',
      username: '@sarahc',
      avatar: 'assets/images/avatar-3.svg',
      lastMessage: 'See you tomorrow then!',
      lastMessageTime: 'Yesterday',
      isOnline: false
    },
    {
      id: 4,
      name: 'John Doe',
      username: '@johndoe',
      avatar: 'assets/images/avatar-4.svg',
      lastMessage: 'Can we reschedule our meeting to next week?',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      isOnline: false
    },
    {
      id: 5,
      name: 'Jane Smith',
      username: '@janesmith',
      avatar: 'assets/images/avatar-5.svg',
      lastMessage: 'Just sent you the files you requested!',
      lastMessageTime: 'Monday',
      isOnline: true
    }
  ];

  get filteredContacts(): Contact[] {
    if (!this.searchQuery.trim()) {
      return this.contacts;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) || 
      contact.username.toLowerCase().includes(query) ||
      contact.lastMessage.toLowerCase().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
  }
} 