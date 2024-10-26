import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { Main } from './Main.js'

Main.Init();

createRoot(document.getElementById('root')).render(
  <App />
)