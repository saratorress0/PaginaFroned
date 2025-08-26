import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './styles.css';
import Botones from "./components/Botones";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <div>
        <h1>SRS</h1>
        <Routes>
          <Route path="/" element={<Botones />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
