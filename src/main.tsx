import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import {QueryClientProvider} from "@tanstack/react-query"
import { queryClient } from './shared/config/query-client.ts'
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
