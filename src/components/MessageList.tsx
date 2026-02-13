import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage } from '../types/chat.ts';

/**
 * Renders an assistant message with markdown, including inline images.
 */
function AssistantMessage({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
  );
}

interface MessageListProps {
  messages: ChatMessage[];
}

export default function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="empty-state">
          <p>No messages yet. Send a message to start the conversation.</p>
        </div>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`message message-${msg.role}`}>
          <div className="message-avatar">
            {msg.role === 'user' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v1H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v4H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1v-4h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3z" />
              </svg>
            )}
          </div>
          <div className="message-content">
            <div className="message-role">{msg.role === 'user' ? 'You' : 'Copilot'}</div>
            <div className="message-text">
              {msg.role === 'assistant' ? (
                <AssistantMessage text={msg.text || ''} />
              ) : (
                <p>{msg.text}</p>
              )}
              {msg.streaming && !msg.text && (
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
