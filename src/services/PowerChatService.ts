import type { ChatMessage } from '../types/chat';
import type { ChatService } from './ChatService';
import { MicrosoftCopilotStudioService } from '../generated/services/MicrosoftCopilotStudioService';

const COPILOT_SCHEMA_NAME = import.meta.env.VITE_COPILOT_SCHEMA_NAME || 'crb45_agent_3wXQBa';

/**
 * Chat service for Power Apps code apps.
 * Calls Copilot Studio via the connector using ExecuteCopilotAsyncV2.
 *
 * @see https://learn.microsoft.com/en-us/connectors/microsoftcopilotstudio/
 */
export class PowerChatService implements ChatService {
  private conversationId: string | null = null;

  /** Extract responses, conversationId from the SDK result. */
  private parseResponse(result: unknown): {
    responses: string[];
    lastResponse: string;
    conversationId: string;
  } {
    const r = result as Record<string, unknown>;
    const data = (r.data ?? r) as Record<string, unknown>;

    const responses = (data.responses as string[]) ?? [];
    const lastResponse = (data.lastResponse as string)
      ?? (responses.length > 0 ? responses[responses.length - 1] : '');
    const conversationId = (data.conversationId as string)
      ?? (data.conversationID as string)
      ?? (data.ConversationId as string)
      ?? '';

    return { responses, lastResponse, conversationId };
  }

  /** Send a message via ExecuteCopilotAsyncV2. */
  private async callCopilot(message: string) {
    const convId = this.conversationId ?? undefined;

    const result = await MicrosoftCopilotStudioService.ExecuteCopilotAsyncV2(
      COPILOT_SCHEMA_NAME,
      { message, notificationUrl: 'https://notificationurlplaceholder' },
      convId,
    );

    const parsed = this.parseResponse(result);
    return {
      responses: parsed.responses,
      lastResponse: parsed.lastResponse,
      conversationId: parsed.conversationId || convId || '',
    };
  }

  async startConversation(): Promise<{ messages: ChatMessage[] }> {
    const response = await this.callCopilot('hello');
    this.conversationId = response.conversationId || null;

    const text = response.responses.length > 1
      ? response.responses.join('\n\n')
      : response.lastResponse;

    return {
      messages: text
        ? [{ role: 'assistant', text, timestamp: new Date().toISOString() }]
        : [],
    };
  }

  async sendMessage(text: string, onChunk: (text: string) => void): Promise<string> {
    const response = await this.callCopilot(text);
    if (response.conversationId) this.conversationId = response.conversationId;

    const fullText = response.responses.length > 1
      ? response.responses.join('\n\n')
      : response.lastResponse ?? '';
    onChunk(fullText);
    return fullText;
  }

  async endConversation(): Promise<void> {
    this.conversationId = null;
  }
}
