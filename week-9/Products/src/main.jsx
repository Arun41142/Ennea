import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "antd/dist/reset.css"; // Import reset CSS for Ant Design
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
