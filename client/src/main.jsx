import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <HelmetProvider>
    <div onContextMenu={(e) => e.preventDefault()}>
      <App />
    </div>
    </HelmetProvider>
    </Provider>
  </React.StrictMode>
)
