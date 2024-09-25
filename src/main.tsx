import { createRoot } from 'react-dom/client'
import {App} from './app/App.js'
import {QueryClientProvider} from "@tanstack/react-query"
import { queryClient } from './shared/config/query-client'
import "./index.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer
      position='top-center'
      autoClose={2000}
      closeOnClick
    />
  </QueryClientProvider>
)
