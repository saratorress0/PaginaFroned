import React from "react";
import { useNavigate } from "react-router-dom";
 
const materiasProfesor = ["Matemáticas", "Física", "Química"];
 
function Profesor() {
  const navigate = useNavigate();
 
  const irAMateria = (materia) => {
    navigate(`/profesor/materia/${materia.toLowerCase()}`);
  };
 
  return (
    <div style={{ padding: "40px", backgroundColor: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#0d6efd" }}>Bienvenido, Profesor</h1>
      <p>Aquí puedes gestionar clases, notas y asistencia.</p>
 
      <div style={{ marginTop: "30px" }}>
        {materiasProfesor.map((materia, index) => (
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
 
export default Profesor;