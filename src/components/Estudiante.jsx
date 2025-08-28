import React from "react";
import { useNavigate } from "react-router-dom";

const materias = ["Matemáticas", "Lenguaje", "Ciencias", "Historia"];

function Estudiante() {
  const navigate = useNavigate();

  const irAMateria = (materia) => {
    navigate(`/estudiante/materia/${materia.toLowerCase()}`);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#9ec9f5", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#000" }}>Bienvenido, Estudiante</h1>
      <p>Aquí puedes ver tus materias, calificaciones, etc.</p>

      <div style={{ marginTop: "30px" }}>
        {materias.map((materia, index) => (
          <button
            key={index}
            onClick={() => irAMateria(materia)}
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#0d6efd",
              color: "#fff",
              border: "none",
              borderRadius: "4px"
            }}
          >
            {materia}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Estudiante;
