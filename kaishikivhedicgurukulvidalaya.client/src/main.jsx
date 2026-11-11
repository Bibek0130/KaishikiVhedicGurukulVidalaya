import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './app/App'
import { LanguageProvider } from './context/LanguageContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { initErrorLogging } from './api/errorLogger'

// Start reporting browser errors to the server log before anything renders.
initErrorLogging();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Last resort: if even the layout crashes, show a message instead of a blank page. */}
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
)
