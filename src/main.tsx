
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './hooks/use-theme.tsx'
import { CompanyProfilesProvider } from './contexts/CompanyProfilesContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <CompanyProfilesProvider>
        <App />
      </CompanyProfilesProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
