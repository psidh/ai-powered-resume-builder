import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Resume from "./pages/Resume.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <Routes>
     <Route path="/login" element={<Login />} />
     <Route path="/resume" element={<Resume />} />
    <Route path="/" element={<App />} />
  </Routes>
  </Router>
  </StrictMode>
)
