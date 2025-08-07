import './app/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import { HomePage } from './pages/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </StrictMode>
);
