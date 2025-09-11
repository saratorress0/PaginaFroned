import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './styles.css';
import Botones from "./components/Botones";
import AdminPanel from "./components/AdminPanel";
import Estudiante from "./components/Estudiante";
import Profesor from "./components/Profesor";
import MateriaDetalle from "./components/MateriaDetalle";
import MateriaGrados from "./components/MateriaGrados";



function App() {
  return (
    <Router>
      <div>
        <h1>SRS</h1>
        <Routes>
          <Route path="/" element={<Botones />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/estudiante" element={<Estudiante />} />
          <Route path="/profesor" element={<Profesor />} />
          <Route path="/estudiante/materia/:nombre" element={<MateriaDetalle />} />
          <Route path="/profesor/materia/:nombre" element={<MateriaGrados />} />
          <Route path="/profesor/materia/:nombre/grado/:grado" element={<MateriaDetalle />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
