import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './services/firebase'

import './styles/global.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//renderiza o App (função) que esta sendo chamado diretamente do App.tsx

/**
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  document.getElementById('root')
);
 */