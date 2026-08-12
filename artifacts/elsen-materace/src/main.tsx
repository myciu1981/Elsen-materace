import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';

import './index.css';

const container = document.getElementById('root')!;

// Strona jest prerenderowana na etapie budowania. Jeśli kontener ma już treść,
// doczepiamy się do istniejącego DOM zamiast renderować go od nowa —
// inaczej React wyrzuciłby gotowy HTML i strona mrugnęłaby przy starcie.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
