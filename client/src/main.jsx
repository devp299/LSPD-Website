import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// // import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div onContextMenu={(e) => e.preventDefault()}>
      <App />
    </div>
  </React.StrictMode>
)
