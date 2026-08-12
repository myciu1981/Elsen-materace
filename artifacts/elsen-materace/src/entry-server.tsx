import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * Renderuje aplikację do statycznego HTML na etapie budowania.
 * Dzięki temu roboty, które nie wykonują JavaScriptu (GPTBot, ClaudeBot,
 * PerplexityBot), dostają pełną treść strony, a nie pusty kontener.
 */
export function render(url: string): string {
  return renderToString(<App ssrPath={url} />);
}
