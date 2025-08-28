import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const grados = ["9-1", "9-2", "10-1", "10-2", "11-1", "11-2"];

function MateriaGrados() {
  const { nombre } = useParams();
  const navigate = useNavigate();

  const irAGrado = (grado) => {
    navigate(`/profesor/materia/${nombre}/grado/${grado}`);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#0d6efd" }}>
        {nombre.charAt(0).toUpperCase() + nombre.slice(1)} - Selecciona un grado
      </h1>
      <div style={{ marginTop: "20px" }}>
        {grados.map((grado, index) => (
          <button
            key={index}
            onClick={() => irAGrado(grado)}
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#003366",
              color: "#fff",
              border: "none",
              borderRadius: "4px"
            }}
          >
            {grado}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MateriaGrados;
