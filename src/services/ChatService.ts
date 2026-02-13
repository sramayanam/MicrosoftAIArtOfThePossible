import type { ChatMessage } from '../types/chat';

/**
 * Chat service interface — abstracts server-based vs Power SDK connector chat.
 */
export interface ChatService {
  startConversation(): Promise<{ messages: ChatMessage[] }>;
  sendMessage(text: string, onChunk: (text: string) => void): Promise<string>;
  endConversation(): Promise<void>;
}
