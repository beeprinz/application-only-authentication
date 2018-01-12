// Import the default export from the react/react-dom package in node_modules
import React from 'react';
import ReactDOM from 'react-dom';

// Import the default export from App.js
import App from './js/App';

// Import the register service worker
import registerServiceWorker from './registerServiceWorker';

// CSS is imported directly into your application
import './css/App.css';

// Add the imported <App /> component to the root element in public.html
ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

// Register the service worker
registerServiceWorker();
