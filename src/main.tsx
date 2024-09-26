import { ErrorBoundary } from '@app/providers/error-boundary.js'
import { QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { App } from './app/App.js'
import "./index.css"
import { queryClient } from './shared/config/query-client'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer
          position='top-center'
          autoClose={2000}
          closeOnClick
        />
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>
)
