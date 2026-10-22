import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { GlobalStyle } from './GlobalStyle';

// Монтує застосунок у єдиний React-root: StrictMode допомагає виявляти
// небезпечні побічні ефекти, BrowserRouter надає маршрути, а GlobalStyle — базову тему.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
