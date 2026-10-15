import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/design-tokens.css'
import './styles/layout.css'
// Mobile touch-target and form-text corrections. Imported last on purpose: it
// has to be able to override layout.css at equal specificity.
import './styles/mobile-targets.css'
import App from './App.tsx'
import { LocationProvider } from './location/LocationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>,
)