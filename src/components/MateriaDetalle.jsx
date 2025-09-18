import React from "react";
import { useParams, useLocation } from "react-router-dom";
import NotasTabla from "./NotasTabla";
 
function MateriaDetalle() {
  const { nombre, grado } = useParams();
  const location = useLocation();
 
  const esProfesor = location.pathname.includes("/profesor");
 
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>
        Materia: {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
        {grado && ` - Grado ${grado}`}
      </h1>
      
      <NotasTabla editable={esProfesor} materia={nombre} grado={grado || "9-1"} />

    </div>
  );
}
 
export default MateriaDetalle;

