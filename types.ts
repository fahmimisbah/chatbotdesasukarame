import React from 'react';

export enum Sender {
  User = 'user',
  Bot = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface VillageInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}