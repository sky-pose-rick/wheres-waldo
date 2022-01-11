import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import gameLogic from './gameLogic';
import getFirebaseConfig from './firebaseConfig';
import './index.css';
import App from './App';

document.title = 'Where\'s Waldo';

const firebaseApp = initializeApp(getFirebaseConfig());
gameLogic.initializeGameDB(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
