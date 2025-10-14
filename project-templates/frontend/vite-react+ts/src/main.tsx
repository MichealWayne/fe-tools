import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
