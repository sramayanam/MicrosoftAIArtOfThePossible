import { useMemo } from 'react';
import Chat from './components/Chat.tsx';
import Header from './components/Header.tsx';
import { PowerChatService } from './services/index.ts';

/**
 * Power Apps Code App — chat interface for Copilot Studio.
 * Auth is handled by the Power Platform host.
 * Uses the connector SDK to call the agent directly.
 */
export default function App() {
  const chatService = useMemo(() => new PowerChatService(), []);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Chat chatService={chatService} />
      </main>
    </div>
  );
}
