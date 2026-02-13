import { useCallback, useRef, useState } from 'react';
import MessageList from './MessageList.tsx';
import MessageInput from './MessageInput.tsx';
import SamplePrompts from './SamplePrompts.tsx';
import type { ChatMessage } from '../types/chat.ts';
import type { ChatService } from '../services/ChatService.ts';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  text: `👋 **Welcome to the Airlines Analytics Agent!**

I can help you explore and visualize airline industry data including routes, airports, carriers, passengers, and revenue.

Here are some things I can do:

- 📊 **Generate charts** — revenue, passenger volume, market share, and more
- ✈️ **Analyze routes** — compare carriers, distances, efficiency metrics
- 🏢 **Airport insights** — hub status, destinations served, annual performance
- 📈 **Trend analysis** — year-over-year comparisons and seasonal patterns

**Try a sample prompt** from the sidebar, or type your own question below!`,
  timestamp: new Date().toISOString(),
};

interface ChatProps {
  chatService: ChatService;
}

export default function Chat({ chatService }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [ready, setReady] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useRef(chatService);
  const initialized = useRef(false);
  serviceRef.current = chatService;

  /** Lazy-init: start the agent conversation on the first user message. */
  const ensureStarted = useCallback(async () => {
    if (initialized.current) return;
    initialized.current = true;
    await serviceRef.current.startConversation();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!ready || isStreaming) return;

      setError(null);
      setMessages((prev) => [
        ...prev,
        { role: 'user', text, timestamp: new Date().toISOString() },
        { role: 'assistant', text: '', timestamp: new Date().toISOString(), streaming: true },
      ]);
      setIsStreaming(true);

      try {
        await ensureStarted();
        const finalText = await serviceRef.current.sendMessage(text, (chunk) => {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last?.role === 'assistant' && last.streaming) {
              updated[updated.length - 1] = { ...last, text: chunk };
            }
            return updated;
          });
        });

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant' && last.streaming) {
            updated[updated.length - 1] = { ...last, text: finalText || last.text, streaming: false };
          }
          return updated;
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(`Failed to send message: ${(err as Error).message}`);
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last?.role === 'assistant' && last.streaming && !last.text) {
              updated.pop();
            }
            return updated;
          });
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [ready, isStreaming],
  );

  const handleNewChat = useCallback(() => {
    serviceRef.current.endConversation();
    initialized.current = false;
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    setIsStreaming(false);
    setReady(true);
  }, []);

  if (error && messages.length === 0) {
    return (
      <div className="chat-container">
        <div className="chat-loading">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-layout">
      <SamplePrompts onSelect={sendMessage} disabled={isStreaming || !ready} />
      <div className="chat-container">
        <div className="chat-toolbar">
          <div>
            <button className="btn btn-outline btn-sm" onClick={handleNewChat}>
              New Chat
            </button>
          </div>
          <div className="toolbar-right" />
        </div>
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)}>&times;</button>
          </div>
        )}
        <MessageList messages={messages} />
        <MessageInput onSend={sendMessage} disabled={isStreaming || !ready} />
      </div>
    </div>
  );
}
