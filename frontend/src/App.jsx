import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import CreateResume from "./components/CreateResume";
import ViewResume from "./components/ViewResumes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateResume />} />
        <Route path="/dashboard/resumes" element={<ViewResume />} />
      </Routes>
    </Router>
  );
}

export default App;
