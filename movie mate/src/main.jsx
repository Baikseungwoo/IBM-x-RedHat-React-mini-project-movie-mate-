import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import'./index.css'
import AuthContextPro from './hooks/AuthContextPro';
import { initLocalStorage } from "./utils/initLocalStorage";

initLocalStorage();
createRoot(document.getElementById('root')).render(
    <AuthContextPro>
    <App />
    </AuthContextPro>
)
