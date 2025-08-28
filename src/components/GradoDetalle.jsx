import React from "react";
import { useParams } from "react-router-dom";

function GradoDetalle() {
  const { nombre, grado } = useParams();

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>{nombre.toUpperCase()} - Grado {grado}</h1>
      <p>Aquí puedes ver la asistencia, notas, etc.</p>
    </div>
  );
}

export default GradoDetalle;
