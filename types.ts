export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  excerpt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}