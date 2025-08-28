import React from "react";
import { useParams } from "react-router-dom";

function MateriaDetalle() {
  const { nombre } = useParams();

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Materia: {nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h1>
      <p>Aquí podrías mostrar calificaciones, asistencia u otra información relevante.</p>
    </div>
  );
}

export default MateriaDetalle;
