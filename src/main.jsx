import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './store/store.js'
import './index.css'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <Toaster position="top-right" />
      <App />
    </Provider>,
)
